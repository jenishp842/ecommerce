import React, { Component } from "react";
import {
  ProfileDropdown,
  Notification,
  Modal,
  Button,
} from "../../component/index.jsx";
import { connect } from "react-redux";
import * as actions from "../../actions";
import SuccessModal from "../../component/SuccessModal.jsx";
import { TimePicker } from "react-pickers-bs4";
import { toast } from "react-toastify";
import { withLastLocation } from "react-router-last-location";
import { withRouter } from "react-router";
import searcho from "../../assets/img/searcho.png";
import header_logo from "../../assets/img/logo.png";
import logom from "../../assets/img/logom.png";
import doc from "../../assets/img/doc.png";
import search from "../../assets/img/search.png";
import {
  HeaderWithoutSearch
} from "../../component/index.jsx";
class SelectTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      showNotification: false,
      logout: false,
      tabActive: "Personal",
      updateBtn: false,
      firstName: "",
      lastName: "",
      designation: "",
      companyName: "",
      address: "",
      showSuccess: false,
      message: "",
      coverImage: "",
      imageURL: "",
      mobileNumberUpdate: false,
      MobileOtpPopup: false,
      activeCardindex: null,
      templateId: "",
      searchKey: "",
    };
  }
  componentDidMount() {
    this.props.selectTemplate({ search: "" });
    localStorage.removeItem("draftId");
    this.props.clearDraft();
    localStorage.setItem("isEditDraft", JSON.stringify(true));
    console.log(this.props)
  }

  logoutHandler = () => {
    document.body.classList.add("modal-open");
    this.setState({
      logout: true,
    });
  };
  componentDidUpdate(prevProps) {
    if (prevProps.profileUpdateSuccess != this.props.profileUpdateSuccess) {
      this.setState({
        showSuccess: true,
        message: this.props.profileUpdateSuccess.msg,
        updateBtn: false,
      });
      this.props.profile();
    }
    if (prevProps.templateDetail != this.props.templateDetail) {
      let prevRoute = JSON.parse(localStorage.getItem("prevroute"));
      if (prevRoute == "editDraft") {
        this.props.history.push("/edit-draft");
      } else if (prevRoute == "create-tik") {
        this.props.history.push("/create-tik");
      } else {
        localStorage.setItem("isEditTik", JSON.stringify(true));
        this.props.history.push("/edit-tik");
      }
    }
  }
  closeSuccessPopup = () => {
    this.setState({ showSuccess: false });
  };
  logout = () => {
    document.body.classList.remove("modal-open");
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("isFree");
    this.props.history.push("/signin");
  };
  closeLogoutPopup = () => {
    document.body.classList.remove("modal-open");
    this.setState({
      logout: false,
    });
  };

  showNotification = () => {
    this.setState({
      showNotification: !this.state.showNotification,
    });
  };

  activeTab = (activeName) => {
    this.setState({
      tabActive: activeName,
    });
  };
  updateToggle = () => {
    this.setState({
      updateBtn: true,
    });
  };
  handleChange = (e, key) => {
    this.props.profileEdit({ e, key });
  };

  handleSubmit = () => {
    const { firstName, lastName, designation, address } = this.props;
    this.props.profileUpdate({
      firstName,
      lastName,
      designation,
      address,
      photoData: this.state.coverImage ? this.state.coverImage : null,
    });
    // this.props.profilePic({photoData: this.state.coverImage ? this.state.coverImage : null})
  };
  imageChangeHandler = (e) => {
    this.setState({
      imageURL: URL.createObjectURL(e.target.files[0]),
      coverImage: e.target.files[0],
    });
  };
  closePopup = () => {
    document.body.classList.remove("modal-open");
    this.setState({
      mobileNumberUpdate: false,
    });
  };
  mobileUpdateHandler = () => {
    this.setState({
      mobileNumberUpdate: true,
    });
  };
  mobileOtpModalClose = () => {
    this.setState({
      MobileOtpPopup: false,
    });
  };
  activeCard = (index, id) => {
    this.setState({
      activeCardindex: index,
      templateId: id,
    });
    localStorage.setItem("selectId", JSON.stringify(id));
  };
  getTemplateDetail = () => {
    const { templateId } = this.state;

    let local_template_id = JSON.parse(localStorage.getItem("templateId"));
    if (templateId != "" || local_template_id != null) {
      if (templateId == "") {
        localStorage.setItem("templateId", JSON.stringify(local_template_id));
        this.props.getTemplateDetail({
          templateId: local_template_id,
          whiteList: true,
        });
      } else {
        localStorage.setItem("templateId", JSON.stringify(templateId));
        this.props.getTemplateDetail({ templateId, whiteList: true });
      }
    }
  };
  searchHandler = (e) => {
    this.props.selectTemplate({ search: e.target.value });
    this.setState({ searchKey: e.target.value });
    this.setState({
      activeCardindex: null,
      templateId: "",
    });
    localStorage.removeItem("selectId");
    localStorage.removeItem("templateId");
  };
  searchSubmit = () => {
    this.props.selectTemplate({ search: this.state.searchKey });
    localStorage.removeItem("selectId");
    localStorage.removeItem("templateId");
  };
  render() {
    const {
      showNotification,
      logout,
      showSuccess,
      message,
      activeCardindex,
    } = this.state;
    const { roledocument, document, tikLimit } = this.props;
    if(tikLimit){
      this.props.history.push("/docHistory");
    }
    if (document && roledocument) {
      if (document.create == false && roledocument.create == false) {
        this.props.history.push("/docHistory");
        toast.error("you are not authorized");
      }
    }
    this.props.templateList.map((e) => {
      console.log(e.thumbnail);
    });
    console.log(this.props.document);
    const selectId = JSON.parse(localStorage.getItem("selectId"));
    
    return (
      <>
        <HeaderWithoutSearch/>
        <div id="content" class="container my-5 selectTemp">
          <div class="row">
            <div class="offset-lg-2 col-lg-8 col-md-12 d-flex align-items-center justify-content-center flex-column f-m">
              <h1 class="text-center txt-blk mb-4 f-b">Select Template</h1>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                role="search"
                class="search navbar-form-custom form-inline"
                action="#"
              >
                <div class="form-group dropdown">
                  <img
                    className="searchImg"
                    src={search}
                    style={{ zIndex: "9999" }}
                  />
                  {/* <!-- <a href="#!" class="filter dropdown-toggle" role="button" id="searchDrop" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"><i class="fas fa-chevron-down"></i></a> --> */}
                  <input
                    type="text"
                    placeholder="Search Template..."
                    class="form-control pl-5"
                    name="top-search"
                    id="top-search"
                    onChange={this.searchHandler}
                  />
                </div>
                <a
                  onclick={this.searchSubmit}
                  type="submit"
                  class="btn btn-primary f-18 ml-2 f-m px-4"
                >
                  Search
                </a>
              </form>
            </div>
            <div class="col-lg-12 box-shd br-20 mt-5 ">
              <div
                class="col my-5 selectTemplate fixHeight"
                style={{ minHeight: "415px" }}
              >
                {this.props.templateList.length != 0 ? (
                  <div class="template-deck">
                    {this.props.templateList.map((e, i) => {
                      return (
                        <div
                          onClick={() => this.activeCard(i, e._id)}
                          onDoubleClick={() => this.getTemplateDetail()}
                          class={
                            activeCardindex == i || e._id == selectId
                              ? "card border-0 template-card selected text-center"
                              : "card border-0 template-card text-center"
                          }
                        >
                          <img
                            class="card-img-top"
                            src={e.thumbnail}
                            alt="Card image cap"
                          />
                          <div
                            class="card-footer border-0 pl-0 pr-0"
                            style={{ width: "120px" }}
                          >
                            <strong class="txt-blk f-18 ">
                              {e.template_name}
                            </strong>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center d-flex justify-content-center">
                    No Data Found
                  </div>
                )}
              </div>
            </div>
            <div class="offset-lg-1 col-lg-10 mt-5">
              <div class="offset-lg-2 col-lg-8 d-flex">
                <a
                  onClick={() => this.props.history.push("/add-metadata")}
                  class="btn btn-default m-1 w-100 f-b"
                >
                  Previous
                </a>
                <a
                  onClick={this.getTemplateDetail}
                  class="btn btn-org m-1 w-100 f-b text-light"
                >
                  Next
                </a>
              </div>
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
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    templateList: state.Template.templateList,
    loader: state.Role.loader,
    deleteSuccess: state.Template.deleteSuccess,
    templateDetail: state.Template.templateDetail,
    templateObj: state.Template,
    document: state.Profile.document,
    roledocument: state.Profile.Roledocument,
    tikLimit: state.Tik.tikLimit,
  };
};

const mapDispatchToProps = (dispatch) => ({
  selectTemplate: (payload) => dispatch(actions.selectTemplate(payload)),
  getTemplateDetail: (data) => dispatch(actions.getTemplateDetail(data)),
  clearDraft: () => dispatch(actions.clearDraft()),
});

export default withRouter(
  withLastLocation(connect(mapStateToProps, mapDispatchToProps)(SelectTemplate))
);
