import React, { useEffect, useState } from 'react';
import TagInput from 'react-taggables-input';
import 'react-taggables-input/dist/tags.css';

const AddTagForm = (props) => {
  const { onChangeTag, tags } = props;
  // var [tags, setTags] = useState([tags]);

  // useEffect(() => {
  //   // setTags([]);
  // }, []);

  const onChange = (tags) => {
    // setTags(tags);
    onChangeTag(tags)
  }

  const validateTag = (tag) => {
    return true;
  }

  return (
    <TagInput value={tags} onChange={onChange} onEnter={validateTag} />
  );
}
export default AddTagForm;