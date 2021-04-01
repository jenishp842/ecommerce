import React, { Component } from "react";
import { connect } from "react-redux";
import {
  WithLayoutContainer,
  TextArea,
} from "../../component/index.jsx";
import * as actions from "../../actions";
import _ from "lodash";
import { imageMapperTemplate } from '../../constants/Mapper.js';

class TemplateView extends Component {
  state = {
    editFlag: false,
    deleteFlag: false,
    addFlag: false,
    editData: {},
    deleteData: {},
    addPopupSuccess: false,
    viewFlag: false,
    viewData: {},
    showSuccess: false,
    // addPopupLoader: false
  };
  editButtonOnClick = (data) => {
    // this.props.roleInitialization();
    document.body.classList.add("modal-open");
    this.setState({
      editFlag: true,
      editData: data,
    });
  };

  editClosePopup = () => {
    document.body.classList.remove("modal-open");
    this.setState({
      editFlag: false,
    });
  };
  deleteClosePopup = () => {
    document.body.classList.remove("modal-open");
    this.setState({
      deleteFlag: false,
      deleteData: {},
    });
  };

  deleteButtonOnClick = (data) => {
    // this.props.roleInitialization();
    document.body.classList.add("modal-open");
    this.setState({
      deleteFlag: true,
      deleteData: data,
    });
  };

  confirmDelete = () => {
    const { deleteData } = this.state;
    const templateId = deleteData._id;
    this.props.deleteTemplate({ templateId });
  };

  addRoles = () => {
    document.body.classList.add("modal-open");
    this.setState({
      addFlag: true,
    });
  };
  addClosePopup = () => {
    document.body.classList.remove("modal-open");
    this.setState({
      addFlag: false,
    });
  };

  handleSubmit = (data) => {
    this.props.addRoleInList(data);
  };

  submitEditData = (data) => {
    this.props.editRoleInList(data);
  };
  closeSuccessPopup = () => {
    this.setState({ showSuccess: false });
  };
  successPopup = () => {
    this.setState({
      addFlag: false,
      editFlag: false,
      deleteFlag: false,
      addFlag: false,
      editData: {},
      deleteData: {},
      viewFlag: false,
      SuccessPopupFlag: true,
    });
  };

  successPopupClosePopup = () => {
    this.props.roleInitialization();
    this.setState({
      addFlag: false,
      editFlag: false,
      deleteFlag: false,
      addFlag: false,
      viewFlag: false,
      editData: {},
      deleteData: {},
      message: "",
      SuccessPopupFlag: false,
    });
  };

  closeViewPopup = () => {
    document.body.classList.remove("modal-open");
    this.setState({
      viewFlag: false,
      viewData: {},
    });
  };
  componentDidMount() {
    const tempId = JSON.parse(localStorage.getItem('templateId'))
    this.props.getTemplateDetail({ templateId: tempId, whiteList: '' })
  }

  editButtonOnClick = (data) => {
    this.props.history.push('editTemp', { data });
  }

  render() {
    let attr = [];
    let thumbnail = [];
    let text = [];
    let main = [];
    Object.keys(this.props.templateDetail).map((e) => {
      if (e == "attribute") {
        this.props.templateDetail["attribute"].map((i) => {
          main.push(i);
        });
      }
      if (e == "image") {
        this.props.templateDetail["image"].map((i) => {
          main.push(i);
        });
      }
      if (e == "text") {
        this.props.templateDetail["text"].map((i) => {
          main.push(i);
        });
      }
    });
    let sortedMain = _.sortBy(main, ["order"]);
    sortedMain.map((e) => {
      Object.keys(e).map((i) => {
        if (i == "attribute_name") {
          attr.push(e);
        }
      });
    });
    if (this.props.template) {
      if (this.props.template.view == false && this.props.roletemplate.view == false) {
        this.props.history.push('/template')
      }
    }
    return (
      <WithLayoutContainer>
        <div id="createTemp" class="wrapper wrapper-content createTemp viewTemp">
          <div class="row" >
            <div class="col-xl-12">
              <div class="containerBox p-0">
                <div class="row" id='viewTemp'>
                  <div class="col-xl-12 col-lg-12 col-sm-12 border-right py-4 pl-5">
                    <div class="table-title d-flex justify-content-between mb-2">
                      <h2 class="f-b my-0">View Template</h2>
                      {this.props.template == null || this.props.template.update ? <a className={'btn-edit-temp btn-org btn mr-4'} onClick={() => this.editButtonOnClick(this.props.templateDetail)}>Edit Template</a> : null}
                    </div>
                    <div
                      class="fixHeight"
                      style={{
                        minHeight: "calc(100vh - 280px)",
                        position: "relative",
                      }}
                    >
                      <ul class="slides">
                        <li class="slide slide1">
                          <div class="org-border br-6 p-3 bg-white">
                            <div class="row mb-3 ">
                              <div class="col-lg-6 d-flex flex-wrap">
                                <label class="f-16 f-b">Template Name</label>
                                <input
                                  type="text"
                                  class="form-control h-40 f-16 f-m w-70 mb-3"
                                  value={
                                    this.props.templateDetail
                                      .template_name
                                  }
                                  placeholder="Enter Template Name"
                                  disabled
                                />
                              </div>
                              <div class="col"></div>
                            </div>
                            <div class="row mb-3 ">
                              <div class="col-lg-6 d-flex flex-wrap">
                                <label class="f-16 f-b">Template Type</label>
                                <div class="input-group w-70">
                                  <select class="acceptance custom-select f-16 f-m h-40 border-0 box-shd" disabled>
                                    <option
                                      value={
                                        this.props.templateDetail
                                          .template_type
                                      }
                                    >
                                      {
                                        this.props.templateDetail
                                          .template_type
                                      }
                                    </option>
                                  </select>
                                </div>
                              </div>
                              <div class="col next-margin d-flex">
                                <form class="form-group d-inline-block">
                                  <div class="custom-file edit-thum">
                                    <img class="img-fluid image-circle tempLogo mr-3 temp-Image" src={imageMapperTemplate[this.props.templateDetail.template_type]} />
                                  </div>
                                </form>
                              </div>
                            </div>
                            <div class="custom-control custom-checkbox check-dipend">
                              <input
                                type="checkbox"
                                class="custom-control-input"
                                id="customChec1k1"
                                name="example1"
                                checked={
                                  this.props.templateDetail
                                    .isAcceptanceDocument
                                }
                                disabled
                              />
                              <label
                                class="custom-control-label f-16 f-m pl-2"
                                for="customChec1k1"
                              >
                                Required acceptance
                              </label>
                            </div>
                          </div>
                        </li>
                        {sortedMain.map((e) => {
                          return Object.keys(e).map((i) => {
                            if (i == "attribute_name") {
                              return (
                                <li class="slide slide2">
                                  <div class="org-border br-6 p-3 bg-white">
                                    <div class="row mb-3 ">
                                      <div class="col-lg-6 d-flex flex-wrap mb-3">
                                        <label class="f-16 f-b">
                                          Attribute Name
                                        </label>
                                        <input
                                          type="text"
                                          class="form-control h-40 f-16 f-m w-70"
                                          value={e.attribute_name}
                                          placeholder="Enter Attribute Name"
                                          disabled
                                        />
                                      </div>
                                      <div class="col-lg-6 d-flex flex-wrap mb-3">
                                        <label class="f-16 f-b">
                                          Data Type
                                        </label>
                                        <div class="input-group w-70">
                                          <select class="custom-select f-16 f-m h-40 border-0 box-shd" disabled>
                                            <option value={e.dataType}>
                                              {e.dataType}
                                            </option>
                                          </select>
                                        </div>
                                      </div>
                                      {e.dataType === 'Text' ?
                                        <div className="col-lg-6 d-flex flex-wrap mb-3">
                                          <label className="f-16 f-b">Description</label>
                                          <div className="input-group w-70">
                                            <TextArea
                                              placeholder="Type here..."
                                              rows={3}
                                              value={e.value || ''}
                                            />
                                          </div>
                                        </div> : ''}
                                    </div>
                                    <div class="custom-control custom-checkbox">
                                      <input
                                        type="checkbox"
                                        class="custom-control-input"
                                        id="customChec1k11"
                                        name="example1"
                                        checked={(e.dataType === 'Image' || e.dataType === 'Qr') ? e.default : e.include_in_thumbnail}
                                        disabled
                                      />
                                      <label
                                        class="custom-control-label f-16 f-m pl-2"
                                        for="customChec1k11"
                                      >
                                        {(e.dataType === 'Image' || e.dataType === 'Qr') ? "Set as Default" : 'Include in thumbnail'}
                                      </label>
                                    </div>
                                  </div>
                                </li>

                              );
                            }
                            if (i == "title") {
                              return (
                                <li class="slide slide4">
                                  <div class="org-border br-6 p-3 bg-white">
                                    <div class="row mb-3 ">
                                      <div class="col-lg-6 d-flex flex-wrap mb-3 align-content-lg-start">
                                        <label class="f-16 f-b">Title</label>
                                        <input
                                          type="text"
                                          class="form-control h-40 f-16 f-m w-70"
                                          value={e.title}
                                          placeholder="Enter Attribute Name"
                                          disabled
                                        />
                                      </div>
                                      <div class="col-lg-6 d-flex flex-wrap mb-3">
                                        <label class="f-16 f-b">
                                          Description
                                        </label>
                                        <div class="input-group w-70">
                                          <textarea
                                            rows="3"
                                            class="form-control"
                                            placeholder="Type here..."
                                            disabled
                                          >
                                            {e.description}
                                          </textarea>
                                        </div>
                                      </div>
                                    </div>
                                    {/* <div class="custom-control custom-checkbox">
                                      <input
                                        type="checkbox"
                                        class="custom-control-input"
                                        id="customChec1k11"
                                        name="example1"
                                        checked={e.include_in_thumbnail}
                                        disabled
                                      />
                                      <label
                                        class="custom-control-label f-16 f-m pl-2"
                                        for="customChec1k11"
                                      >
                                        Include in Thumbnail
                                      </label>
                                    </div> */}
                                  </div>
                                </li>
                              );
                            }
                            if (i == "image_title") {
                              return (
                                <li class="slide slide3">
                                  <div class="org-border br-6 p-3 bg-white">
                                    <div class="row mb-3 ">
                                      <div class="col-lg-6 d-flex flex-wrap mb-3">
                                        <label class="f-16 f-b">
                                          Thumbnail Title
                                        </label>
                                        <input
                                          type="text"
                                          class="form-control h-40 f-16 f-m w-70"
                                          value={e.image_title}
                                          placeholder="Enter Thumbnail Title"
                                          disabled
                                        />
                                      </div>
                                      <div class="col-lg-6 d-flex flex-wrap mb-3">
                                        <label class="f-16 f-b">
                                          Data Type
                                        </label>
                                        <div class="input-group w-70">
                                          <select class="custom-select f-16 f-m h-40 border-0 box-shd" disabled>
                                            <option value={e.dataType} selected>
                                              {e.dataType}
                                            </option>
                                          </select>
                                        </div>
                                      </div>
                                    </div>
                                    {/* <div class="custom-control custom-checkbox">
                                      <input
                                        type="checkbox"
                                        class="custom-control-input w-70"
                                        id="customChec1k11"
                                        name="example1"
                                        checked={e.include_in_thumbnail}
                                        disabled
                                      />
                                      <label
                                        class="custom-control-label f-16 f-m pl-2"
                                        for="customChec1k11"
                                      >
                                        Include in Thumbnail
                                      </label>
                                    </div> */}
                                  </div>
                                </li>
                              );
                            }
                          });
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </WithLayoutContainer >
    );
  }
}

const mapStateToProps = state => {
  return {
    templateDetail: state.Template.templateDetail,
    template: state.Profile.template,
    roletemplate: state.Profile.Roletemplate,
  };
};


const mapDispatchToProps = (dispatch) => ({
  getTemplateListInfo: (payload) => dispatch(actions.getTemplateListInfo(payload)),
  deleteTemplate: (data) => dispatch(actions.deleteTemplate(data)),
  getTemplateDetail: (data) => dispatch(actions.getTemplateDetail(data)),
  templateInitialization: () => dispatch(actions.templateInitialization()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TemplateView);
