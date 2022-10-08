import { EditorState } from 'draft-js';
import { createContext, useState } from 'react';

export const EditorStateContext = createContext('');

export const EditorStateProvider = (props) => {
    const { children } = props;

    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

    return (
        <EditorStateContext.Provider value={{ editorState, setEditorState }}>
            {children}
        </EditorStateContext.Provider>
    );
};
