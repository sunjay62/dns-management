'use client';
// Import necessary styles and components
import React, { useState } from 'react';
import styles from './apikey.module.css';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// Define the Page component
const Page = () => {
  // State to manage the editor content
  const [editorState, setEditorState] = useState();

  // Toolbar configuration
  const toolbarConfig = {
    options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
    inline: {
      options: ['bold', 'italic', 'underline', 'strikethrough'],
    },
    fontSize: {
      className: undefined,
    },
    fontFamily: {
      className: undefined,
    },
  };

  // Return the JSX for the component
  return (
    <div className={`p-6 flex flex-col justify-between `}>
      <div className={`${styles.containerApikey} `}>
        <div className={`${styles.containerEditor} `}>
          <Editor editorState={editorState} toolbar={toolbarConfig} onEditorStateChange={setEditorState} />
        </div>
      </div>
    </div>
  );
};

// Export the component as the default export
export default Page;
