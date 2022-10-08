import React, { Component, useRef, useState, useContext } from 'react';
import { Editor, EditorState, RichUtils, AtomicBlockUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import './MyEditor.css';
import { editorStyleMap } from './EditorStyleMap';
import { extendedBlockRenderMap } from './EditorBlockRenderMap';
import FileUpload from './component/FileUpload/FileUpload';
import { FileUploadPathContext } from './component/provider/FileUploadPathProvider';
import { InsertImageContext } from './component/provider/InsertImageProvider';
import { EditorStateContext } from './component/provider/EditorStateProvider';
import DataUpload from './component/DataUpload/DataUpload';

import TitleIcon from '@mui/icons-material/Title';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import ListAltIcon from '@mui/icons-material/ListAlt';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const MyEditor = () => {
    const editor = useRef(null);

    // EditorStateオブジェクト.
    const { editorState, setEditorState } = useContext(EditorStateContext);

    // アップロード先.
    const { fileUploadPath, setFileUploadPath } = useContext(
        FileUploadPathContext
    );

    // 挿入する画像.
    const { insertImage, setInsertImage } = useContext(InsertImageContext);

    // 記事タイトル.
    const [titleTextState, setTitleTextState] = useState('');

    function onChange(editorState) {
        setEditorState(editorState);
    }

    // コマンド.
    function handleKeyCommand(command, editorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);

        if (newState) {
            onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    }

    // bold.
    function handleBoldClick() {
        const newInlineStyle = RichUtils.toggleInlineStyle(editorState, 'BOLD');
        onChange(newInlineStyle);
    }

    // ブロックスタイルの変更.
    function handleBlockStyleOptionClick(value) {
        const newBlockType = RichUtils.toggleBlockType(editorState, value);
        onChange(newBlockType);
    }

    function mediaBlockRenderer(block) {
        if (block.getType() === 'atomic') {
            return {
                component: Media,
                editable: false,
            };
        }

        return null;
    }

    const Media = ({ contentState }) => {
        const entity = contentState.getEntity(
            contentState.getLastCreatedEntityKey()
        );
        const type = entity.getType();
        const { src } = entity.getData();

        let media;
        if (type === 'IMAGE') {
            media = <Image src={src} />;
        }
        return media;
    };

    const Image = ({ src }) => {
        return <img src={src} />;
    };

    return (
        <div className='editorBox'>
            <div className='editorOptionBox'>
                <div className='blockStyleOptionsContainer'>
                    <div className='options'>
                        <button
                            onClick={() => handleBlockStyleOptionClick('title')}
                        >
                            <TitleIcon />
                        </button>
                        <button
                            onClick={() =>
                                handleBlockStyleOptionClick('subTitle')
                            }
                        >
                            <SubtitlesIcon />
                        </button>
                        <button
                            onClick={() =>
                                handleBlockStyleOptionClick('headline')
                            }
                        >
                            <ViewHeadlineIcon />
                        </button>
                        <button
                            onClick={() => handleBlockStyleOptionClick('quote')}
                        >
                            <FormatQuoteIcon />
                        </button>
                        <button
                            onClick={() =>
                                handleBlockStyleOptionClick(
                                    'unordered-list-item'
                                )
                            }
                        >
                            <ListAltIcon />
                        </button>
                        <button
                            onClick={() =>
                                handleBlockStyleOptionClick('codeBlock')
                            }
                        >
                            <IntegrationInstructionsIcon />
                        </button>
                        <button onClick={handleBoldClick}>
                            <FormatBoldIcon />
                        </button>
                        <button>
                            <FileUpload />
                        </button>
                        <button>
                            <DataUpload />
                        </button>
                    </div>
                </div>
            </div>

            <div className='editorContainer'>
                <Editor
                    ref={editor}
                    editorState={editorState}
                    onChange={onChange}
                    handleKeyCommand={handleKeyCommand}
                    styleMap={editorStyleMap}
                    blockRenderMap={extendedBlockRenderMap}
                    blockRendererFn={mediaBlockRenderer}
                    className='editor'
                />
            </div>
        </div>
    );
};

export default MyEditor;
