import React, { Component } from "react";
import { connect } from "react-redux";
import { WithLayoutContainer, Table, SuccessPopup } from "../../component/index.jsx";
import * as actions from "../../actions";
import DeleteTemplatePopup from './DeleteTemplatePopup.jsx';
import { TemplateListingTitle } from '../../constants/Mapper.js';
import { formatTime, formatDate, } from "../../helper/utility.js"
import SuccessModal from "../../component/SuccessModal.jsx";
import TeamplateView from "./TemplateView.jsx";
import { toast } from "react-toastify";

const actionsData = {
  edit: true,
  delete: true,
};


class TemplateList extends Component {
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
    successFlag: true,
    SuccessPopupFlag: true,
    // addPopupLoader: false,
    // editData={}
  }


  editButtonOnClick = (data) => {
    this.props.history.push('editTemp', { data });
  }

  editClosePopup = () => {
    document.body.classList.remove('modal-open');
    this.setState({
      editFlag: false,
    });
  }

  deleteClosePopup = () => {
    document.body.classList.remove('modal-open');
    this.setState({
      deleteFlag: false,
      deleteData: {},
    });
  }

  deleteButtonOnClick = (data) => {
    // this.props.roleInitialization();
    document.body.classList.add('modal-open');
    this.setState({
      deleteFlag: true,
      deleteData: data,
    });
  }

  confirmDelete = () => {
    const { deleteData } = this.state
    const templateId = deleteData._id
    this.props.deleteTemplate({ templateId });
  }

  addTemplates = () => {
    this.props.history.push('createTemp');
  }

  addClosePopup = () => {
    document.body.classList.remove('modal-open');
    this.setState({
      addFlag: false,
    });
  }

  handleSubmit = (data) => {
    this.props.addRoleInList(data);
  }

  submitEditData = (data) => {
    this.props.editRoleInList(data);
  }
  closeSuccessPopup = () => {
    this.setState({ showSuccess: false })
  }
  errorclose = () => {
    if (this.state.showSuccess == false) {
      this.props.errorClear()
    }
  }
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
  }

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
      message: '',
      SuccessPopupFlag: false
    })
  }

  componentDidMount() {
    this.props.errorClear();
    this.props.getTemplateListInfo({ search: '' });
  }

  componentDidUpdate(prevProps) {
    const { templateObj } = this.props;
    const { successPopup, successLoader } = templateObj;

    if (prevProps.deleteSuccess != this.props.deleteSuccess) {
      this.deleteClosePopup()
      this.setState({ showSuccess: true, message: this.props.deleteSuccess.msg })
      this.props.getTemplateListInfo({ search: '' });
    }

    if (this.props.error) {
      this.deleteClosePopup()
      // this.setState({ showSuccess: true, message: 'your are not authorize' })
      toast.error('you are not authorized');
      this.props.errorClear();
    }
    // if (prevProps.templateList != this.props.templateList) {
    //   console.log(prevProps.templateList, this.props.templateList)
    //   // this.props.getTemplateListInfo();
    // }

    if (prevProps.templateDetail != this.props.templateDetail) {
      this.props.history.push({
        pathname: '/template-view',
        state: { detail: this.props.templateDetail }
      })
    }
    if (prevProps != this.props)
      if (successPopup !== '' && successLoader === false) {
        this.successPopup();
      }
  }

  successPopup = () => {
    this.setState({
      successFlag: true,
      SuccessPopupFlag: true,

    });
  }

  successPopupClosePopup = () => {
    this.props.templateInitialization();

    this.setState({
      SuccessPopupFlag: false,
    });
  }

  closeViewPopup = () => {
    document.body.classList.remove('modal-open');
    this.setState({
      viewFlag: false,
      viewData: {},
    });
  }

  viewPopup = (data) => {
    if (this.props.roleName !== 'Super Provider'){
    if (this.props.template.view || this.props.roletemplate.view) {
      document.body.classList.add("modal-open");
      const templateId = data._id
      this.props.getTemplateDetail({ templateId, whiteList: '' });
      localStorage.setItem('templateId', JSON.stringify(templateId));
    }
  }else{
    document.body.classList.add("modal-open");
    const templateId = data._id
    this.props.getTemplateDetail({ templateId, whiteList: '' });
    localStorage.setItem('templateId', JSON.stringify(templateId));
  }
  }

  render() {
    const { deleteFlag, editFlag, addFlag, viewFlag, viewData, message, editData, showSuccess, deleteData, SuccessPopupFlag } = this.state;
    const { templateList, role, templateObj, roletemplate } = this.props;
    const { successPopup } = templateObj;

    // const { successPopup } = role;
    const dataTable = {
      titles: TemplateListingTitle,
      data: [],
    };

    if (templateList.length > 0) {
      dataTable.data = templateList.map((role, key) => {
        const { createdAt, } = role;
        return {
          ...role,
          ...{
            sr_no: key + 1,
            date: formatDate(createdAt),
            time: formatTime(createdAt),
          }
        };
      })
    }

    return (
      <WithLayoutContainer>
        <div id="teamMgnt" className="wrapper wrapper-content">
          <div className="row">
            <div className="col-xl-12">
              <div className="containerBox">
                <div className="table-title d-flex justify-content-between align-items-center mb-4">
                  <h2 className="f-b m-0">Template Management</h2>
                  {this.props.template == null || this.props.template.create ? <a
                    onClick={() => this.addTemplates()}
                    className="btn btn-primary py-1"
                  >
                    Create New Template
                  </a> : roletemplate != undefined ? this.props.template.create || roletemplate.create ? (
                      <a
                        onClick={() => this.addTemplates()}
                        className="btn btn-primary py-1"
                      >
                        Create New Template
                      </a>
                    ) : null : null}
                </div>
                <div className="table-responsive fixHeight">
                  <Table
                    dataTable={dataTable}
                    actions={actionsData}
                    defaultSort={'sr_no'}
                    editButtonOnClick={this.editButtonOnClick}
                    deleteButtonOnClick={this.deleteButtonOnClick}
                    loader={this.props.loader}
                    viewPopup={this.viewPopup}
                    updatePermission={this.props.template == null || this.props.roletemplate == null || (this.props.template.update || this.props.roletemplate.update)}
                    deletePermission={this.props.template == null || this.props.roletemplate == null || (this.props.template.delete || this.props.roletemplate.delete)}

                  />
                </div>
              </div>
            </div>
            {deleteFlag &&
              <DeleteTemplatePopup
                closePopup={this.deleteClosePopup}
                confirmDelete={this.confirmDelete}
                role={role}
                deleteData={deleteData} />}
            {viewFlag &&
              <TeamplateView
                closePopup={this.closeViewPopup}
                viewData={viewData} />}
          </div>
        </div>
        {showSuccess == true ? (
          <SuccessModal
            closePopup={this.closeSuccessPopup}
            history={this.props.history}
            message={message}
          />
        ) : null}

        {SuccessPopupFlag === true && successPopup
          ? <SuccessPopup msg={successPopup.msg} closePopup={this.successPopupClosePopup} history={this.props.history} />
          : null}
      </WithLayoutContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    templateList: state.Template.templateList,
    loader: state.Role.loader,
    deleteSuccess: state.Template.deleteSuccess,
    templateDetail: state.Template.templateDetail,
    templateObj: state.Template,
    template: state.Profile.template,
    error: state.Auth.error,
    roletemplate: state.Profile.Roletemplate,
    roleName: state.Profile.roleName,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getTemplateListInfo: (payload) => dispatch(actions.getTemplateListInfo(payload)),
  deleteTemplate: (data) => dispatch(actions.deleteTemplate(data)),
  getTemplateDetail: (data) => dispatch(actions.getTemplateDetail(data)),
  templateInitialization: () => dispatch(actions.templateInitialization()),
  errorClear: () => dispatch(actions.errorClear()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TemplateList);
