import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormLabel, FormSelect } from 'react-bootstrap';
import { Sample1 } from './Templates';

export const CkEditor = () => {
  const [editor, setEditor] = useState(null);

  useEffect(() => {
    if (editor) {
      // You can perform any side effects related to the editor here
      console.log('Editor is ready to use!', editor);
    }
  }, [editor]);

  const handleEditorChange = (event, editor) => {
    console.log(event);
  };

  const handleBlur = (event, editor) => {
    console.log('Blur.', editor);
  };

  const handleFocus = (event, editor) => {
    console.log('Focus.', editor);
  };
  const [editorContent, setEditorContent] = useState(Sample1);

  return (
    <div>
      <FormLabel className="text-capitalize fw-bold">
        Assessment Instruction
      </FormLabel>
      <FormSelect
        value={editorContent}
        onChange={(e) => setEditorContent(e.target.value)}
      >
        <option value={Sample1}>sample1</option>
        <option value={'<p>wewe</p>'}>sample2</option>
      </FormSelect>
      <div>
        <CKEditor
          editor={ClassicEditor}
          data={editorContent}
          onReady={(editor) => {
            setEditor(editor);
          }}
          onChange={handleEditorChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
      </div>
    </div>
  );
};
