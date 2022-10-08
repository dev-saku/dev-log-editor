import React from 'react';
import ReactDOM from 'react-dom/client';
import MyEditor from './MyEditor';
import { FileUploadPathProvider } from './component/provider/FileUploadPathProvider';
import { InsertImageProvider } from './component/provider/InsertImageProvider';
import { EditorStateProvider } from './component/provider/EditorStateProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <EditorStateProvider>
        <InsertImageProvider>
            <FileUploadPathProvider>
                <MyEditor />
            </FileUploadPathProvider>
        </InsertImageProvider>
    </EditorStateProvider>
);
