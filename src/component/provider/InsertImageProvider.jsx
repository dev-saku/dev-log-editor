import { createContext, useState } from 'react';

export const InsertImageContext = createContext('');

export const InsertImageProvider = (props) => {
    const { children } = props;

    const [insertImage, setInsertImage] = useState(['test']);

    return (
        <InsertImageContext.Provider value={{ insertImage, setInsertImage }}>
            {children}
        </InsertImageContext.Provider>
    );
};
