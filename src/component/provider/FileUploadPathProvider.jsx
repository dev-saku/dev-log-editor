import { createContext, useState } from 'react';

export const FileUploadPathContext = createContext('');

export const FileUploadPathProvider = (props) => {
    const { children } = props;

    const [fileUploadPath, setFileUploadPath] = useState('');

    return (
        <FileUploadPathContext.Provider
            value={{ fileUploadPath, setFileUploadPath }}
        >
            {children}
        </FileUploadPathContext.Provider>
    );
};
