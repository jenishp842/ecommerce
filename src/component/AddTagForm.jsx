import React, { useRef } from 'react';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';

const AddTagForm = React.forwardRef((props, ref) => {
  const { onChangeTag, tags, advanceSearchValue } = props;
  const inputProps = {
    className: 'react-tagsinput-input',
    placeholder: 'Enter Tags',
  };
  const handleChange = (tags) => {
    onChangeTag(tags);
  };
  return (
    <>
      <TagsInput ref={ref} value={tags} onChange={handleChange} inputProps={inputProps} />
    </>
  );
});

export default AddTagForm;
