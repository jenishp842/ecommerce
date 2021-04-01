import React, { Component } from 'react';
import { connect } from 'react-redux';
import { WithLayoutContainer, Table, SuccessPopup } from '../../component/index.jsx';
import * as actions from '../../actions';
import DeleteTeamPopup from './deleteTeamPopup.jsx';
import EditTeamPopup from './editTeamPopup.jsx';
import AddTeamPopup from './addTeamPopup.jsx';
import ViewTeamPopup from './viewTeamPopup.jsx';
import { formatTime, formatDate } from '../../helper/utility';
import { teamListingTitle } from '../../constants/Mapper';

const actionsData = {
  edit: true,
  delete: true,
};

class TeamManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editFlag: false,
      deleteFlag: false,
      addFlag: false,
      editData: {},
      deleteData: {},
      viewFlag: false,
      viewData: {},
      SuccessPopupFlag: false,
    };
  }


  componentWillReceiveProps(nextProps) {
    const { team } = this.props;
    const { successPopup, successLoader } = team;

    if (this.props !== nextProps) {
      if (successPopup !== '' && successLoader === false) {
        this.successPopup();
      }
    }
  }

  componentDidMount() {
    const { getTeamListInfo, getUserListing } = this.props;
    getTeamListInfo();
    getUserListing();
  }

  editButtonOnClick = (data) => {
    document.body.classList.add('modal-open');
    this.setState({
      editFlag: true,
      editData: data,
    });
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
    });
  }

  deleteButtonOnClick = (data) => {
    document.body.classList.add('modal-open');
    this.setState({
      deleteFlag: true,
      deleteData: data,
    });
  }

  addNewTeam = (data) => {
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

  viewPopup = (data) => {
    document.body.classList.add('modal-open');
    this.setState({
      viewFlag: true,
      viewData: data,
    });
  }

  closeViewPopup = () => {
    document.body.classList.remove('modal-open');
    this.setState({
      viewFlag: false,
      viewData: {},
    });
  }

  handleSubmit = (data) => {
    this.props.addTeamListInfo(data);
  }

  submitEditData = (data) => {
    this.props.editTeamListInfo(data);
  }


  confirmDelete = () => {
    const { deleteData } = this.state;
    const body = {
      teamId: deleteData._id,
    };
    this.props.deleteTeam(body);
  }

  successPopup = () => {
    this.setState({
      editFlag: false,
      deleteFlag: false,
      addFlag: false,


      editData: {},
      deleteData: {},

      viewFlag: false,
      successFlag: true,
      SuccessPopupFlag: true,
    });
  }

  successPopupClosePopup = () => {
    this.props.teamInitialization();
    this.setState({
      editFlag: false,
      deleteFlag: false,
      addFlag: false,


      editData: {},


      viewFlag: false,
      viewData: {},
      SuccessPopupFlag: false,
    });
  }



  render() {
    const {
      deleteFlag, editFlag, addFlag, editData, viewFlag, SuccessPopupFlag, viewData, deleteData,
    } = this.state;
    const { teamList, userList, team, subUserAccess, otherResponsibilities } = this.props;
    const { successPopup } = team;


    const dataTable = {
      titles: teamListingTitle,
      data: [],
    };
    if (teamList.length > 0) {
      dataTable.data = teamList.map((team, key) => {
        const { createdAt, members, teamManager } = team;
        return {
          ...team,
          ...{
            sr_no: key + 1,
            totalUser: members ? members.length : 0,
            date: formatDate(createdAt),
            time: formatTime(createdAt),
            teamManager: teamManager && teamManager.firstName ? (teamManager.firstName) : '-',

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
                      <h2 className="f-b m-0">Team Management</h2>
                      {(subUserAccess === null || otherResponsibilities === null || subUserAccess.create || otherResponsibilities && otherResponsibilities.create) &&
                        <a onClick={() => this.addNewTeam()} className="btn btn-primary py-1">Create New Team</a>}
                    </div>
                    <div className="table-responsive fixHeight">
                      <Table
                        dataTable={dataTable}
                        actions={actionsData}
                        defaultSort="sr_no"
                        editButtonOnClick={this.editButtonOnClick}
                        deleteButtonOnClick={this.deleteButtonOnClick}
                        viewPopup={this.viewPopup}
                        loader={this.props.loader}
                        updatePermission={subUserAccess === null || otherResponsibilities === null || subUserAccess.update || otherResponsibilities && otherResponsibilities.update}
                        deletePermission={subUserAccess === null || otherResponsibilities === null || subUserAccess.delete || otherResponsibilities && otherResponsibilities.delete}
                      />
                    </div>
                  </div>
                </div>
                {(subUserAccess === null || otherResponsibilities === null || subUserAccess.delete || otherResponsibilities && otherResponsibilities.delete) && deleteFlag &&
                  <DeleteTeamPopup closePopup={this.deleteClosePopup} team={team} confirmDelete={this.confirmDelete} deleteData={deleteData} />}
                {(subUserAccess === null || otherResponsibilities === null || subUserAccess.update || otherResponsibilities && otherResponsibilities.update) && editFlag &&
                  <EditTeamPopup closePopup={this.editClosePopup} editData={editData} userList={userList} submitEditData={this.submitEditData} team={team} />}
                {addFlag === true ? <AddTeamPopup closePopup={this.addClosePopup} userList={userList} submitData={this.handleSubmit} team={team} /> : null}
                {(subUserAccess === null || otherResponsibilities === null || subUserAccess.view || otherResponsibilities && otherResponsibilities.view) && viewFlag && <ViewTeamPopup closePopup={this.closeViewPopup} viewData={viewData} userList={userList} submitEditData={this.submitEditData} team={team} />}
              </div>
            </div>
          </div>
          {SuccessPopupFlag === true && successPopup
            ? <SuccessPopup msg={successPopup.msg} closePopup={this.successPopupClosePopup} />
            : null}
        </WithLayoutContainer>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  teamList: state.Team.teamList,
  userList: state.Team.userList,
  team: state.Team,
  subUserAccess: state.Profile.role,
  otherResponsibilities: state.Profile.Rolerole
});

const mapDispatchToProps = (dispatch) => ({
  getTeamListInfo: () => dispatch(actions.getTeamListInfo()),
  getUserListing: () => dispatch(actions.getUserListing()),
  teamInitialization: () => dispatch(actions.teamInitialization()),
  deleteTeam: (data) => dispatch(actions.deleteTeam(data)),
  editTeamListInfo: (data) => dispatch(actions.editTeamListInfo(data)),
  addTeamListInfo: (data) => dispatch(actions.addTeamListInfo(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamManagement, '');
