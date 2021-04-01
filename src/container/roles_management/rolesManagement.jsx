import React, { Component } from "react";
import { connect } from "react-redux";
import { WithLayoutContainer, Table, SuccessPopup } from "../../component/index.jsx";
import * as actions from "../../actions";
import DeleteRolesPopup from './deleteRolesPopup.jsx';
import EditRolesPopup from './editRolesPopup.jsx';
import AddRolesPopup from './addRolesPopup.jsx';
import { roleListingTitle } from '../../constants/Mapper.js';
import { formatTime, formatDate, } from "../../helper/utility.js"
import ViewRolePopup from './viewRolePopup.jsx';

const actionsData = {
  "edit": true,
  "delete": true
}


class RolesManagement extends Component {
  state = {
    editFlag: false,
    deleteFlag: false,
    addFlag: false,
    editData: {},
    deleteData: {},
    addPopupSuccess: false,
    viewFlag: false,
    viewData: {}
    // addPopupLoader: false
  }
  editButtonOnClick = (data) => {
    // this.props.roleInitialization();
    document.body.classList.add("modal-open");
    this.setState({
      editFlag: true,
      editData: data
    })
  }

  editClosePopup = () => {
    document.body.classList.remove("modal-open");
    this.setState({
      editFlag: false
    })
  }
  deleteClosePopup = () => {
    document.body.classList.remove("modal-open");
    this.setState({
      deleteFlag: false,
      deleteData: {}
    })
  }

  deleteButtonOnClick = (data) => {
    // this.props.roleInitialization();
    document.body.classList.add("modal-open");
    this.setState({
      deleteFlag: true,
      deleteData: data
    })
  }

  confirmDelete = () => {
    const { deleteData } = this.state
    let body = {
      roleId: deleteData._id
    }
    this.props.deleteRole(body)
  }

  addRoles = () => {
    document.body.classList.add("modal-open");
    this.setState({
      addFlag: true
    })
  }
  addClosePopup = () => {
    document.body.classList.remove("modal-open");
    this.setState({
      addFlag: false
    })
  }

  handleSubmit = (data) => {
    this.props.addRoleInList(data);
  }

  submitEditData = (data) => {
    this.props.editRoleInList(data);
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
      SuccessPopupFlag: true
    })
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
      SuccessPopupFlag: false
    })
  }

  componentDidMount() {
    this.props.getRoleListInfo();
  }

  componentWillReceiveProps(nextProps) {
    const { role } = this.props;
    const { successPopup, successLoader } = role;

    if (this.props !== nextProps) {
      if (successPopup !== "" && successLoader === false) {
        this.successPopup()
      }
    }
  }

  closeViewPopup = () => {
    document.body.classList.remove("modal-open");
    this.setState({
      viewFlag: false,
      viewData: {}
    })
  }

  viewPopup = (data) => {
    document.body.classList.add("modal-open");
    this.setState({
      viewFlag: true,
      viewData: data
    })
    // this.props.viewTeamDetailsInfo();
  }

  render() {
    const { deleteFlag, editFlag, addFlag, viewFlag, viewData, editData, SuccessPopupFlag, deleteData } = this.state;
    const { roleList, role, subUserAccess, otherResponsibilities } = this.props;


    const { successPopup } = role;
    let dataTable = {
      titles: roleListingTitle,
      data: []
    };

    if (roleList.length > 0) {
      dataTable.data = roleList.map((role, key) => {
        const { createdAt, createdBy: { firstName, lastName } } = role;
        return {
          ...role,
          ...{
            sr_no: key + 1,
            date: formatDate(createdAt),
            time: formatTime(createdAt),
            createdBY: `${firstName} ${lastName}`
          }
        };
      })
    }
    return (
      <WithLayoutContainer subUserAccess={subUserAccess} otherResponsibilities={otherResponsibilities}>
        <div id="teamMgnt" className="wrapper wrapper-content">
          <div className="row">
            <div className="col-xl-12">
              <div className="containerBox">
                <div className="table-title d-flex justify-content-between align-items-center mb-4">
                  <h2 className="f-b m-0">Roles Management</h2>
                  {(subUserAccess === null || otherResponsibilities === null || subUserAccess.create || otherResponsibilities && otherResponsibilities.create) &&
                    <a onClick={() => this.addRoles()}
                      className="btn btn-primary py-1">
                      Create New Role
                      </a>}
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
                    updatePermission={subUserAccess === null || subUserAccess.update || otherResponsibilities === null || otherResponsibilities && otherResponsibilities.update}
                    deletePermission={subUserAccess === null || subUserAccess.delete || otherResponsibilities === null || otherResponsibilities && otherResponsibilities.delete}
                  />
                </div>
              </div>
            </div>
            {(subUserAccess === null || otherResponsibilities === null || subUserAccess.delete || otherResponsibilities && otherResponsibilities.delete) && deleteFlag &&
              <DeleteRolesPopup
                closePopup={this.deleteClosePopup}
                confirmDelete={this.confirmDelete}
                role={role}
                deleteData={deleteData} />}
            {(subUserAccess === null || otherResponsibilities === null || subUserAccess.update || otherResponsibilities && otherResponsibilities.delete) && editFlag &&
              <EditRolesPopup
                closePopup={this.editClosePopup}
                roleObj={role}
                editData={editData}
                submitEditData={this.submitEditData} />}
            {addFlag &&
              <AddRolesPopup
                closePopup={this.addClosePopup}
                submitData={this.handleSubmit}
                role={role} />}
            {(subUserAccess === null || otherResponsibilities === null || subUserAccess.view || otherResponsibilities && otherResponsibilities.delete) && viewFlag &&
              <ViewRolePopup
                closePopup={this.closeViewPopup}
                viewData={viewData} />}
          </div>
        </div>
        {(SuccessPopupFlag && successPopup) &&
          <SuccessPopup
            msg={successPopup.msg}
            closePopup={this.successPopupClosePopup} />
        }
      </WithLayoutContainer>
    )
  }
}


const mapStateToProps = state => {
  console.log(state, "state__1111")
  return {
    addPopupLoader: state.Role.addPopupLoader,
    roleList: state.Role.roleList,
    loader: state.Role.loader,
    role: state.Role,
    subUserAccess: state.Profile.role,
    otherResponsibilities: state.Profile.Rolerole
  };
};


const mapDispatchToProps = (dispatch) => ({
  getRoleListInfo: () => dispatch(actions.getRoleListInfo()),
  deleteRole: (data) => dispatch(actions.deleteRole(data)),
  addRoleInList: (data) => dispatch(actions.addRoleInList(data)),
  roleInitialization: () => dispatch(actions.roleInitialization()),
  editRoleInList: (data) => dispatch(actions.editRoleInList(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RolesManagement);
