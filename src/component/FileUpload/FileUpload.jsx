import React, { useState, useContext } from 'react';
import './FileUpload.css';
import Modal from '@mui/material/Modal';
import { InsertImageContext } from '../provider/InsertImageProvider';
import { AtomicBlockUtils, EditorState } from 'draft-js';
import { EditorStateContext } from '../provider/EditorStateProvider';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const FileUpload = () => {
    const [open, setOpen] = useState(false);

    // モーダル表示.
    const handleOpen = () => {
        setOpen(true);
    };

    // モーダル非表示.
    const handleClose = () => {
        initModal();
        setOpen(false);
    };

    // 挿入ボタン活性かどうか.
    const [disabled, setDisabled] = useState(true);

    // 選択されたイメージ名.
    const [imageName, setImageName] = useState('');

    // 選択したイメージのURL.
    const [imageSrc, setImageSrc] = useState('');

    // EditorStateオブジェクト.
    const { editorState, setEditorState } = useContext(EditorStateContext);

    // 挿入されたイメージを格納する配列.
    const { insertImage, setInsertImage } = useContext(InsertImageContext);

    // 画像選択時に発火.
    const onChange = (e) => {
        console.log('true');
        // 選択されたファイル.
        const file = e.target.files.item(0);
        const reader = new FileReader();
        reader.onload = function (e) {
            setImageSrc(e.target.result);
        };
        reader.readAsDataURL(file);

        let copyList = [...insertImage];
        copyList.push(file);
        setInsertImage(copyList);
        setImageName(file.name);
        e.target.value = '';

        // 挿入ボタンを活性にする.
        setDisabled(false);
    };

    // 取り消しクリック時にstateを初期化する.
    const handleCancelSelect = () => {
        initModal();
    };

    // 挿入クリック時に画像ブロックを挿入する.
    const handleInsertImage = () => {
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            'IMAGE',
            'IMMUTABLE',
            {
                src: imageSrc,
            }
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, {
            currentContent: contentStateWithEntity,
        });
        const newEditorContext = AtomicBlockUtils.insertAtomicBlock(
            newEditorState,
            entityKey,
            ''
        );
        setEditorState(newEditorContext);
        initModal();
    };

    // stateの初期化.
    const initModal = () => {
        setDisabled(true);
        setImageSrc('');
        setImageName('');
    };

    return (
        <div className='fileInsertModalContainer'>
            <AddPhotoAlternateIcon onClick={handleOpen} />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
                className='fileInsertModal'
            >
                <div className='modalContent'>
                    <p id='uploadFileName'>{imageName}</p>
                    <div className='uploader'>
                        <input
                            type='file'
                            accept='.png, .jpg, .jpeg'
                            className='fileInput'
                            onChange={(e) => onChange(e, onChange)}
                        ></input>
                    </div>
                    <img src={imageSrc} alt='' className='imagePreview' />
                    <div className='buttonGroup'>
                        <button
                            className='insertImageButton'
                            onClick={handleInsertImage}
                            disabled={disabled}
                        >
                            挿入
                        </button>
                        <button
                            className='cancelSelectButton'
                            onClick={handleCancelSelect}
                        >
                            取消
                        </button>
                        <button
                            className='cancelInsertButton'
                            onClick={handleClose}
                        >
                            キャンセル
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default FileUpload;
