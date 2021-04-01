/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  WithLayoutContainer,
  TikHistoryTable,
  SuccessPopup,
} from '../../component/index.jsx';
import * as actions from '../../actions';
import { formatTime, formatDate } from '../../helper/utility.js';
import { documentMapper, documentFilter } from '../../constants/Mapper.js';
import DeleteDraftTIikPopup from './deleteDraftTikPopup.jsx';
import AddTag from './AddTag.jsx';
import { Helmet } from 'react-helmet';

let dataTable = {
  titles: documentMapper,
  data: [],
};
class TikListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: ['all', 'Accepted', 'Update_Required', 'Rejected', 'Pending', 'Shared with me', 'Drafts', 'archive-list'],
      selectedFilter: 'all',
      metaFlag: false,
      deleteDraftFlag: false,
      deleteDraftData: {},
      getFinalMetaValue: [],
      deleteSuccessFlag: false,
      addFlag: false,
      viewDraft: false,
      addTag: false,
    };
    this.myRef = React.createRef();
  }

  componentDidMount() {
    this.props.history.replace();
    const { selectedFilter } = this.state;
    this.props.getDocumentListInfo(selectedFilter);
    this.props.getMetaListInfo();
    localStorage.removeItem('addMetaData');
    localStorage.removeItem('isEditTik');
    localStorage.removeItem('prevroute');
    localStorage.removeItem('selectId');
    this.props.createTikEdit({ metaData: [] });
    this.props.clearDraft();
    const filterTag = this.props.location.state != undefined ? this.props.location.state.detail : 'all';
    this.handleFilter(filterTag);
  }

  handleFilter = (filter) => {
    this.setState({
      selectedFilter: filter,
    });
      this.props.getDocumentListInfo(filter);
  }

  getIndexofMetaFiled = () => {
    const { metaList } = this.props;
    const finalMetaList = [];
    dataTable.titles.map((data) => {
      metaList.filter((item) => {
        if (data.id == item.name && data.isDropdownShow) {
          finalMetaList.push(data);
        }
      });
    });
    return finalMetaList;
  }

  getIndexofMetaFiledAdd = () => {
    const finalMetaList = [];
    dataTable.titles.map((data) => {
      if (!data.isDropdownShow) {
        finalMetaList.push(data);
      }
    });
    return finalMetaList;
  }

  componentDidUpdate(prevProps) {
    const { tik } = this.props;
    const { successPopup, successLoader, deleteFlag } = tik;
    const { selectedFilter, deleteSuccessFlag, viewDraft } = this.state;

    if (this.props !== prevProps) {
      if (successPopup !== '' && successLoader === false) {
        this.successPopup();
        if (deleteFlag === true && deleteSuccessFlag === true) {
          this.props.getDocumentListInfo(selectedFilter);
        }
      }
    }
    if (prevProps.draftDetailData != this.props.draftDetailData) {
      if (viewDraft) {
        this.props.history.push('/view-draft');
      } else {
        this.props.history.push('/edit-draft');
      }
    }
    if (prevProps.tikDetailSuccess != this.props.tikDetailSuccess) {
      this.props.history.push('/edit-tik');
    }
    if (prevProps.viewTikData != this.props.viewTikData) {
      this.props.history.push("/view-tik")
    }
    if(this.props.archiveSuccess != prevProps.archiveSuccess){
      this.successPopup();
      this.props.getDocumentListInfo(selectedFilter);
    }

    if (prevProps.specialFeatures != this.props.specialFeatures) {
      this.props.specialFeatures &&
        this.props.specialFeatures.map((e) => {
          if (e.featureName == "add_tags") {
            this.setState({ addTag: true });
          }
        });
    }
  }

  successPopup = () => {
    this.setState({
      deleteSuccessFlag: false,
      deleteDraftFlag: false,
      deleteDraftData: {},
      SuccessPopupFlag: true,
      addFlag: false,
    });
  }

  successPopupClosePopup = () => {
    this.props.tikInitialization();
    this.setState({
      deleteDraftFlag: false,
      deleteDraftData: {},
      SuccessPopupFlag: false,
      deleteSuccessFlag: false,

    });
  }

  deleteClosePopup = () => {
    document.body.classList.remove('modal-open');
    this.setState({
      deleteDraftFlag: false,
      deleteDraftData: {},
    });
  }

  deleteDraftOnClick = (data) => {
    document.body.classList.add('modal-open');
    this.setState({
      deleteDraftFlag: true,
      deleteDraftData: data,
      deleteSuccessFlag: true,
    });
  }

  confirmDelete = () => {
    const { deleteDraftData } = this.state;

    const body = {
      draftId: deleteDraftData._id,
    };
    this.props.deleteDraftTikListing(body);
  }

  editDraft = (e) => {
    this.props.draftDtail({ Id: e._id });
    localStorage.setItem('draftId', JSON.stringify(e._id));
  }

  editTik = (e) => {
    this.props.tikDetail({ Id: e._id });
    localStorage.setItem('docId', JSON.stringify(e._id));
  }

  viewDraft = (e, filter) => {
    console.log(e,filter)
    if (filter == 'Drafts') {
      this.setState({ viewDraft: true });
      this.props.draftDtail({ Id: e._id });
      localStorage.setItem('draftId', JSON.stringify(e._id));
    }
    if (filter == 'all' || filter == 'Rejected' || filter == 'Update_Required' || filter == 'Pending' || filter == 'archive-list' || filter == 'Accepted' || filter == 'Shared with me') {
      this.props.viewTik({ Id: e._id })
      localStorage.setItem('docId', JSON.stringify(e._id));
    }
  }

  addMetaFiled = (titleObject, value) => {
    if (value === 'plus') {
      let valueArray = [];
      valueArray = this.getIndexofMetaFiledAdd();

      const index = dataTable.titles.findIndex((x) => x.id === valueArray[0].id);
      if (dataTable.titles[index]) {
        dataTable.titles[index].isDropdownShow = !dataTable.titles[index].isDropdownShow;
      }
    } else {
      const index = dataTable.titles.findIndex((x) => x.id === titleObject.id);
      if (dataTable.titles[index]) {
        dataTable.titles[index].isDropdownShow = !dataTable.titles[index].isDropdownShow;
      }
    }
    this.setState({
      flag: true,
    });
  }

  addButtonOnClick = (data) => {
    this.setState({
      addFlag: true,
      addTagData: data,
    });
  }

  addTagClosePopup = () => {
    this.setState({
      addFlag: false,
    });
  }
  archiveDocument = (e) => {
    this.props.archive({ Id:e._id,isArchive:true});
  }
  unarchiveDocument = (e) => {
    this.props.archive({ Id:e._id,isArchive:false});
  }
  render() {
    const {
      filter, selectedFilter, metaFlag, deleteDraftData, deleteDraftFlag, SuccessPopupFlag, getFinalMetaValue, addFlag, addTagData, archiveSuccess, addTag
    } = this.state;
    const {
      documentList, metaList, loader, tik, document, roledocument
    } = this.props;
    const { successPopup } = tik;
    console.log(roledocument)
    dataTable = {
      titles: documentMapper,
      data: [],
    };

    if (documentList && documentList.length > 0) {
      dataTable.data = documentList.map((doc, key) => {
        const { createdAt } = doc;
        return {
          ...doc,
          ...{
            date: formatDate(createdAt),
            time: formatTime(createdAt),
          },
        };
      });
    }

    if (archiveSuccess && archiveSuccess.length > 0) {
      dataTable.data = archiveSuccess.data.map((doc, key) => {
        const { createdAt } = doc;
        return {
          ...doc,
          ...{
            date: formatDate(createdAt),
            time: formatTime(createdAt),
          },
        };
      });
    }

    if (metaList.length > 0 && dataTable.titles.filter((data) => (data.id === metaList[0].name)).length === 0 && metaFlag === false) {
      metaList.length > 0 && metaList.map((item, key) => {
        if (key === 0 && dataTable.titles.filter((data) => (data.id === metaList[0].name)).length === 0) {
          dataTable.titles.splice(1, 0, {
            id: item.name, isSort: true, text: item.name, isDropdownShow: true,
          });
        } else {
          dataTable.titles.splice(key + 1, 0, {
            id: item.name, isSort: true, text: item.name, isDropdownShow: false,
          });
        }
      });
    }

    const metaField = this.getIndexofMetaFiled();

    return (
      <>  
      <WithLayoutContainer>
        <div id="dochistory" className="wrapper wrapper-content">
          <div className="row">
            <div className="col-xl-12">
              <div id="changingContent" className="containerBox">
                <div className>
                  <div className="table-title">
                    <h2 className="f-b mb-4 mt-0">Tik History</h2>
                  </div>
                  {/* tabs */}
                  {/* Nav pills */}
                  <ul className="nav nav-pills">
                    {filter.map((filterName, index) => (
                      <li className="nav-item" key={index}>
                        <a className={`nav-link ${selectedFilter === filterName ? 'active' : ''}`} onClick={() =>  this.handleFilter(filterName)}>{documentFilter[filterName]}</a>
                      </li>
                    ))}
                  </ul>
                  {/* end Nav pills */}
                  {/* Tab panes */}
                  <div className="tab-content mt-2">
                    {/* tab-content-all */}
                    <div className="tab-pane active" id="all">
                      <div className="table-responsive fixHeight" style={{ maxHeight: 'calc(100vh - 360px)' }}>
                        <TikHistoryTable
                          dataTable={dataTable}
                          // actions={actionsData}
                          deleteDraftOnClick={this.deleteDraftOnClick}
                          defaultSort="documentStatus"
                          loader={loader}
                          metaList={metaList}
                          addButtonOnClick={this.addButtonOnClick}
                          // addMetaFiledInTable={this.addMetaFiledInTable}
                          selectedFilter={selectedFilter}
                          getFinalMetaValue={getFinalMetaValue}
                          editButtonOnClick={this.editDraft}
                          updateButtonOnClick={this.editTik}
                          addMetaFiled={this.addMetaFiled}
                          metaFieldData={metaField}
                          viewDraft={this.viewDraft}
                          action={true}
                          editPermission={document == null || roledocument == null || (document.update || roledocument.update)}
                          archive={this.archiveDocument}
                          unarchive={this.unarchiveDocument}
                          isAddTag= {addTag}
                        />
                      </div>
                    </div>
                    <div className="tab-pane fade" id="archive">...</div>
                  </div>
                  {deleteDraftFlag
                    && (
                      <DeleteDraftTIikPopup
                        closePopup={this.deleteClosePopup}
                        confirmDelete={this.confirmDelete}
                        tik={tik}
                        deleteData={deleteDraftData}
                      />
                    )}

                  {(SuccessPopupFlag && successPopup)
                    && (
                      <SuccessPopup
                        msg={successPopup.msg}
                        closePopup={this.successPopupClosePopup}
                      />
                    )}
                  {addFlag
                    && <AddTag closePopup={this.addTagClosePopup} addTagData={addTagData} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </WithLayoutContainer>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    documentList: state.Tik.documentList,
    metaList: state.Tik.metaList,
    loader: state.Tik.loader,
    tik: state.Tik,
    draftDetailData: state.Tik.draftDetailSuccess,
    tikDetailSuccess: state.Tik.tikDetailSuccess,
    viewTikData: state.Tik.viewTik,
    roledocument: state.Profile.Roledocument,
    document: state.Profile.document,
    // successLoader: state.Tik.tikDetailSuccess,
    // successPopup: state.Tik.tikDetailSuccess,
    archiveSuccess: state.Tik.archiveSuccess,
    specialFeatures: state.Subscription.specialFeatures,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getDocumentListInfo: (filter) => dispatch(actions.getDocumentListInfo(filter)),
  getMetaListInfo: () => dispatch(actions.getMetaListInfo()),
  deleteDraftTikListing: (data) => dispatch(actions.deleteDraftTikListing(data)),
  createTikEdit: (data) => dispatch(actions.createTikEdit(data)),
  draftDtail: (data) => dispatch(actions.draftDtail(data)),
  tikInitialization: () => dispatch(actions.tikInitialization()),
  clearDraft: () => dispatch(actions.clearDraft()),
  tikDetail: (data) => dispatch(actions.tikDetail(data)),
  viewTik: (payload) => dispatch(actions.viewTik(payload)),
  archive: (payload) => dispatch(actions.archive(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TikListing);
