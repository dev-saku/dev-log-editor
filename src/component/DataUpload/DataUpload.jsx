import './DataUpload.css';
import React, { useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import { useForm } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { options } from '../options';

const DataUpload = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [thumbnailName, setThumbnailName] = useState('');
    const [thumbnailFile, setThumbnailFile] = useState('');
    const [categories, setCategories] = useState([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => console.log(data);

    // 画像選択時に発火.
    const onChange = (e) => {
        console.log('true');

        console.log('true');
        // 選択されたファイル.
        const file = e.target.files.item(0);
        setThumbnailFile(file);
        setThumbnailName(file.name);

        /*
        const reader = new FileReader();
        reader.onload = function (e) {
            setImageSrc(e.target.result);
        };
        reader.readAsDataURL(file);
        */

        e.target.value = '';
    };

    const onCategorySelect = (e, category) => {
        if (!category) {
            return;
        }

        let copyList = [...categories].filter(value => value != category);
        copyList.push(category);
        setCategories(copyList);
    };

    const deleteCategory = (e, category) => {
        let copyList = [...categories];
        setCategories(copyList.filter(value => value !== category));
    }

    return (
        <div className='uploadModalContainer'>
            <CloudUploadIcon onClick={handleOpen} />
            <Modal open={open} onClose={handleClose}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='article-form'
                >
                    <input
                        type='text'
                        placeholder='タイトル'
                        {...register('title', { required: true })}
                        className='article-form__input'
                    />
                    {errors.title?.type === 'required' && (
                        <Alert severity='warning'>タイトルは必須です!</Alert>
                    )}
                    <input
                        type='file'
                        placeholder='thumbnail'
                        {...register('thumbnail', { required: true })}
                        className='article-form__input'
                    />
                    {errors.thumbnail?.type === 'required' && (
                        <Alert severity='warning'>サムネイルは必須です!</Alert>
                    )}
                    <input
                        type='text'
                        placeholder='画像保存先'
                        {...register('s3', { required: true })}
                        className='article-form__input'
                    />
                    {errors.s3?.type === 'required' && (
                        <Alert severity='warning'>画像保存先は必須です!</Alert>
                    )}
                    <div className='category-box'>
                        <Autocomplete
                            disablePortal
                            options={options}
                            sx={{ width: 250 }}
                            renderInput={(params) => (
                                <TextField {...params} label='カテゴリ' />
                            )}
                            className='category-box__input'
                            onChange={(event, value) =>
                                onCategorySelect(event, value)
                            }
                        />
                        <div className='category-box__container'>
                            {categories.map((category) => {
                                return (
                                    <div className='category-value'>

                                    
                                        <p className='category-value__text'>
                                            {category}
                                        </p>
                                        <button 
                                            className='category-value__button'
                                            onClick={(e) => deleteCategory(e, category)}
                                        >
                                            <DeleteForeverIcon />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <input type='submit' className='article-form__button' />
                </form>

                {/**
                <div className='uploadContainer'>
                    <div className='uploadWrapper'>
                        <div className='titleContainer inputBox'>
                            <label htmlFor='title'>タイトル</label>
                            <div className='inputContainer'>
                                <input type='text' id='title' />
                            </div>
                        </div>
                        <div className='subTitleContainer inputBox'>
                            <label htmlFor='subTitle'>サブタイトル</label>
                            <div className='inputContainer'>
                                <input type='text' id='subTitle' />
                            </div>
                        </div>
                        <div className='thumbnail inputBox'>
                            <label htmlFor=''>サムネイル</label>
                            <div className='thumbnailUploader inputContainer'>
                                <input
                                    type='file'
                                    accept='.png, .jpg, .jpeg'
                                    className='fileInput'
                                    onChange={(e) => onChange(e, onChange)}
                                />
                                <div className='thumbnailName'>
                                    <AddPhotoAlternateIcon />
                                    {thumbnailName}
                                </div>
                            </div>
                        </div>
                        <div className='categoryContainer inputBox'>
                            <label htmlFor='s3'>画像保存先（S3）</label>
                            <div className='inputContainer'>
                                <input type='text' id='s3' />
                            </div>
                        </div>
                        <div className='categoryContainer inputBox'>
                            <label htmlFor='category'>カテゴリ</label>
                            <div className='inputCategoryContainer inputContainer'>
                                <input type='text' id='category' />
                                <button className='categoryBtn'>追加</button>
                                <div className='categoryBox'></div>
                            </div>
                        </div>
                    </div>
                    <div className='submitBtnContainer'>
                        <button className='submitBtn'>投稿する</button>
                    </div>
                </div>
             */}
            </Modal>
        </div>
    );
};

export default DataUpload;
