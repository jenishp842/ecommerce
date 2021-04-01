import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Modal, Button, AddTagForm
} from '../../component/index.jsx';
import * as actions from '../../actions';
import { staticLabel } from '../../constants/Constants.js';
import { toast } from "react-toastify";

class AddTag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
    };
  }

  componentDidMount() {
    const { addTagData } = this.props;

    const body = {
      documentId: addTagData.blockchainDocId,
    };
    this.props.addExistingTagsInTik(body);
  }

  onChangeTag = (tags) => {
    this.setState({
      tags,
    });
  }

  componentDidUpdate(prevProps) {
    const {
      deleteFlagSuccess, addTagData } = this.props;
    if (deleteFlagSuccess !== prevProps.deleteFlagSuccess) {
      const body = {
        documentId: addTagData.blockchainDocId,
      };
      this.props.addExistingTagsInTik(body);
    }
  }

  addTagForm = () => {
    const { tags } = this.state;
    const { addTagData, emailID, existingTags } = this.props;

    if (tags.length > 0) {
      const body = {
        documentId: addTagData.blockchainDocId,
        email: emailID,
        tags: [...tags],
      };

      const finalObj = {};
      finalObj.body = body;
      finalObj.existingTags = existingTags;

      this.props.addTagsInTik(finalObj);
    } else {
      toast.error('Tags is required!');
    }
  }

  removeTag = (item) => {
    const { addTagData, emailID } = this.props;

    const removeTagBody = {
      documentId: addTagData.blockchainDocId,
      email: emailID,
      tags: [item],
    };
    this.props.deleteTagsInTik(removeTagBody);
  }

  render() {
    const {
      closePopup, successLoader, existingTagsLoader, existingTags,
    } = this.props;
    const { tags } = this.state;
    const { addTag: addTagLabel } = staticLabel;
    const {
      title, addTag, existingTags: existingTagsData, button,
    } = addTagLabel;

    return (
      <>
        <Modal closePopup={closePopup}>
          <div className="modal-body pt-0 plr-100 pb-5">
            <h4 className="modal-title text-center f-24 mb-4 f-b" id="forgotTitle">{title}</h4>
            <form>
              <div className="form-group row">
                <label htmlFor="staticEmail" className="col-sm-4 col-form-label f-m f-18">{addTag}</label>
                <div className="col-sm-8">
                  <AddTagForm onChangeTag={this.onChangeTag} tags={tags} addTagLabel={addTag} />
                </div>
              </div>
              {existingTagsLoader && <div className="loader-add-tag"><i className="fa fa-refresh fa-spin" /></div>
                || (
                  <div className="form-group row">
                    {existingTags && existingTags.length > 0 && <label htmlFor="inputPassword" className="col-sm-4 col-form-label f-m f-18">{existingTagsData}</label>}
                    <div className="col-sm-8 existingTagWrapper">
                      {existingTags && existingTags.length > 0 && existingTags.map((item) => (
                        <div className="tag-input"> <span className="existingTag">{item} <span><a className="ml-1 remove-tag" onClick={() => this.removeTag(item)}><i className="fa fa-times-circle" /></a></span></span> </div>
                      ))}
                    </div>
                  </div>
                )}
            </form>
            <Button
              type="button"
              buttonText={successLoader ? <i className="fa fa-refresh fa-spin" /> : button}
              className="btn btn-primary w-100 my-1 f-18 f-b"
              onClick={() => this.addTagForm()}
            />
          </div>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    successLoader: state.Tik.successLoader,
    successPopup: state.Tik.successPopup,
    emailID: state.Profile.email,
    existingTags: state.Tik.existingTags,
    existingTagsLoader: state.Tik.existingTagsLoader,
    deleteFlagSuccess: state.Tik.deleteFlagSuccess,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addTagsInTik: (data) => dispatch(actions.addTagsInTik(data)),
  addExistingTagsInTik: (payload, existingTags) => dispatch(actions.addExistingTagsInTik(payload, existingTags)),
  deleteTagsInTik: (data) => dispatch(actions.deleteTagsInTik(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTag);
