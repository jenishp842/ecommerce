import React, { Component } from 'react';
import { connect } from 'react-redux';
import { WithLayoutContainer, Table } from '../../component/index.jsx';
import DeleteUserPopup from './deleteUserPopup.jsx';
import EditUserPopup from './editUserPopup.jsx';
import AddUsersPopup from './addUserPopup.jsx';
import ViewUserPopup from './viewUserPopup.jsx';
import * as actions from '../../actions';
import { userListingTitle } from '../../constants/Mapper.js';
import { formatTime, formatDate } from '../../helper/utility.js';
import SuccessModal from '../../component/SuccessModal.jsx';

const actionsData = {
  edit: true,
  delete: true,
};

class UserManagement extends Component {
  state = {
    editFlag: false,
    viewFlag: false,
    deleteFlag: false,
    addFlag: false,
    editData: {},
    showSuccess: false,
    message: '',
    deleteData: {},
    addPopupSuccess: false,
  }

  handleSubmit = async (data) => {
    this.props.addUserInList(data);
  }

  handleSubmitEdit = (data) => {
    this.props.editUserInList(data);
  }

  editButtonOnClick = (data) => {
    document.body.classList.add('modal-open');
    this.setState({
      editFlag: true,
      editData: data,
    });
  }

  viewButtonOnClick = (data) => {
    document.body.classList.add('modal-open');
    const res = this.props.userList.filter((e) => data._id == e._id);
    this.setState({
      viewFlag: true,
      viewData: res[0],
    });
  }

  editClosePopup = () => {
    document.body.classList.remove('modal-open');
    this.setState({
      editFlag: false,
    });
  }

  viewClosePopup = () => {
    document.body.classList.remove('modal-open');
    this.setState({
      viewFlag: false,
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
    document.body.classList.add('modal-open');
    this.setState({
      deleteFlag: true,
      deleteData: data,
    });
  }

  confirmDelete = () => {
    const { deleteData } = this.state;
    const userId = deleteData._id;
    this.props.deleteUser({ userId });
  }

  closeSuccessPopup = () => {
    this.setState({ showSuccess: false });
  }

  addUser = () => {
    document.body.classList.add('modal-open');
    this.setState({
      addFlag: true,
    });
  }

  addClosePopup = () => {
    document.body.classList.remove('modal-open');
    this.setState({
      addFlag: false,
    });
  }

  componentDidMount() {
    this.props.getUserListInfo();
    this.props.getRoleListInfo();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userSuccess != this.props.userSuccess) {
      this.addClosePopup();
      this.setState({ showSuccess: true, message: this.props.userSuccess.msg });
      this.props.getUserListInfo();
    }
    if (prevProps.deleteSuccess != this.props.deleteSuccess) {
      this.deleteClosePopup();
      this.setState({ showSuccess: true, message: this.props.deleteSuccess.msg });
      this.props.getUserListInfo();
    }
    if (prevProps.EditSuccess != this.props.EditSuccess) {
      this.editClosePopup();
      this.setState({ showSuccess: true, message: this.props.EditSuccess.msg });
      this.props.getUserListInfo();
    }
  }

  render() {
    const {
      deleteFlag, editFlag, addFlag, editData, showSuccess, message, deleteData, viewFlag, viewData,
    } = this.state;
    const {
      userList, EditSuccess, subUserAccess, otherResponsibilities,
    } = this.props;

    const dataTable = {
      titles: userListingTitle,
      data: [],
    };
    if (userList.length > 0) {
      dataTable.data = userList.map((user, key) => {
        const { createdAt, createdProvider, userRole } = user;
        const { firstName, lastName } = createdProvider || {};
        return {
          ...user,
          ...{
            sr_no: key + 1,
            date: formatDate(createdAt),
            time: formatTime(createdAt),
            role: userRole.roleName,
            createdBY: `${firstName} ${lastName}`,
          },
        };
      });
    }
    return (
      <>
        <WithLayoutContainer subUserAccess={subUserAccess} otherResponsibilities={otherResponsibilities}>
          <div id="teamMgnt" className="wrapper wrapper-content">
            <div className="row">
              <div className="col-xl-12">
                <div className="containerBox">
                  <div className=" ">
                    <div className="table-title d-flex justify-content-between align-items-center mb-4">
                      <h2 className="f-b m-0">Associated Users</h2>
                      {(subUserAccess === null || otherResponsibilities === null || subUserAccess.create || otherResponsibilities && otherResponsibilities.create)
                        && <a onClick={() => this.addUser()} className="btn btn-primary py-1">Create New User</a>}
                    </div>
                    <div className="table-responsive fixHeight">
                      <Table
                        dataTable={dataTable}
                        actions={actionsData}
                        defaultSort="sr_no"
                        editButtonOnClick={this.editButtonOnClick}
                        deleteButtonOnClick={this.deleteButtonOnClick}
                        loader={this.props.loader}
                        viewPopup={this.viewButtonOnClick}
                        // updatePermission={true}
                        // deletePermission={true}
                        updatePermission={subUserAccess === null || subUserAccess.update || otherResponsibilities === null || otherResponsibilities && otherResponsibilities.update}
                        deletePermission={subUserAccess === null || subUserAccess.delete || otherResponsibilities === null || otherResponsibilities && otherResponsibilities.delete}
                      />
                    </div>
                  </div>
                </div>
                {(subUserAccess === null || otherResponsibilities === null || subUserAccess.delete || otherResponsibilities && otherResponsibilities.delete) && deleteFlag
                  && <DeleteUserPopup closePopup={this.deleteClosePopup} confirmDelete={this.confirmDelete} deleteData={deleteData} />}

                {(subUserAccess === null || otherResponsibilities === null || subUserAccess.update || otherResponsibilities && otherResponsibilities.update) && editFlag
                  && <EditUserPopup closePopup={this.editClosePopup} editData={editData} roleList={this.props.roleList} editData={editData} submitUserEditData={this.handleSubmitEdit} />}

                {(subUserAccess === null || otherResponsibilities === null || subUserAccess.view || otherResponsibilities && otherResponsibilities.view) && viewFlag
                  && <ViewUserPopup closePopup={this.viewClosePopup} viewData={viewData} roleList={this.props.roleList} editData={editData} submitUserEditData={this.handleSubmitEdit} />}

                {addFlag === true ? <AddUsersPopup roleList={this.props.roleList} closePopup={this.addClosePopup} submitUserData={this.handleSubmit} addPopup={this.props.addPopup} addPopupLoader={this.props.addPopupLoader} /> : null}
              </div>
            </div>
          </div>
          {showSuccess == true ? (
            <SuccessModal
              closePopup={this.closeSuccessPopup}
              history={this.props.history}
              message={message}
            />
          ) : null}
        </WithLayoutContainer>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  addPopupLoader: state.User.addPopupLoader,
  userList: state.User.userList,
  loader: state.User.loader,
  roleList: state.Role.roleList,
  userSuccess: state.User.userSuccess,
  deleteSuccess: state.User.deleteSuccess,
  EditSuccess: state.User.EditSuccess,
  subUserAccess: state.Profile.role,
  otherResponsibilities: state.Profile.Rolerole,
});

const mapDispatchToProps = (dispatch) => ({
  getUserListInfo: () => dispatch(actions.getUserListInfo()),
  getRoleListInfo: () => dispatch(actions.getRoleListInfo()),
  deleteUser: (data) => dispatch(actions.deleteUser(data)),
  addUserInList: (data) => dispatch(actions.addUserInList(data)),
  editUserInList: (data) => dispatch(actions.editUserInList(data)),

});

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);
