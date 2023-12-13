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
      <div className="row justify-content-between align-items-center my-2">
        <FormLabel className=" col-6 text-capitalize fw-bold">
          Assessment Instruction
        </FormLabel>
        <div className="d-flex col-6 align-items-center justify-content-end">
          <FormLabel className="text-capitalize fw-bold me-3">
          Instruction Sample 
          </FormLabel>
          <FormSelect
            className="w-25"
            value={editorContent}
            onChange={(e) => setEditorContent(e.target.value)}
          >
            <option value={Sample1}>sample1</option>
            <option value={'<p>wewe</p>'}>sample2</option>
          </FormSelect>
        </div>
      </div>
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
