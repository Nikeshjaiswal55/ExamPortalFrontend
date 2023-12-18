import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormLabel, FormSelect } from 'react-bootstrap';
import { Sample1, Sample2 } from './Templates';

export const CkEditor = ({ setInstruction }) => {
  const [editor, setEditor] = useState(null);
  const [editorContent, setEditorContent] = useState(Sample1);

  useEffect(() => {
    if (editor) {
      // You can perform any side effects related to the editor here
      console.log('Editor is ready to use!', editor);
    }
  }, [editor]);

  const handleEditorChange = (event, editor) => {
    console.log(editor.getData());
    setInstruction(editor.getData());
  };

  const handleBlur = (event, editor) => {
    console.log('Blur.', editor);
  };

  const handleFocus = (event, editor) => {
    console.log('Focus.', editor);
  };

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
            onChange={(e) => {
              setEditorContent(e.target.value);
              // handleChange(e.target.value);
            }}
          >
            <option value={Sample1}>sample1</option>
            <option value={Sample2}>sample2</option>
          </FormSelect>
        </div>
      </div>
      <div>
        <CKEditor
          name="assessmentInstruction"
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
