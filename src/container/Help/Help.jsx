import React, { Component } from "react";
import { connect } from "react-redux";
import { WithLayoutContainer } from "../../component/index.jsx";
import * as actions from "../../actions";
import Select from "react-select";
import SuccessModal from "../../component/SuccessModal.jsx";
import Zendesk from "react-zendesk";
const ZENDESK_KEY = "65b14d0c-22c8-4442-91db-9ce4323055aa";

const setting = {
  color: {
    theme: "#F27136"
  },
  launcher: {
    chatLabel: {
      "en-US": "Need Help"
    },
  },
  chat: {
    mobile: {
      disable: true,
    },
  },
};

class Help extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issueType: [],
      issue: "",
      email: "",
      subject: "",
      description: "",
      issueId: "",
      errormessage: "",
      error: false,
      errorField: "",
      submit: false,
      showSuccess: false,
      message: ''
    };
  }
  componentDidMount() {
    this.props.ticketList();
  }
  componentDidUpdate(prevprops) {
    if (prevprops.ticketListData != this.props.ticketListData) {
      this.props.ticketListData.map((e) => {
        if (e.type == "tagger") {
          {
            let ObjectList = [];
            let ArrayList = [];
            e.custom_field_options.map((j) => {
              // console.log(e);
              const teeObject = {
                ...ArrayList,
                value: j.value,
                label: j.name,
              };
              // console.log(teeObject);
              ObjectList.push(teeObject);
            });
            this.setState({ issueType: ObjectList });
          }
        }
      });
    }
    if (prevprops.ticketSubmitData != this.props.ticketSubmitData) {
      this.setState({
        showSuccess: true,
        message: `Sorry for the Inconvenience Our support executive will get back to to you on ${this.props.ticketSubmitData.data.audit.via.source.to.address}`,
      })
    }
  }
  changeHandler = (e, key) => {
    const validEmailRegex = RegExp(
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    );
    if (this.state.submit) {
      if (key == "issueType" && e.value == "") {
        this.setState({
          errormessage: "Please select issue",
          error: true,
          errorField: "issueType",
        });
      } else if (key == "email" && e.target.value == "") {
        this.setState({
          errormessage: "Please enter email address",
          error: true,
          errorField: "email",
        });
      } else if (key == "email" && !validEmailRegex.test(e.target.value)) {
        this.setState({
          errormessage: "Please enter valid email address",
          error: true,
          errorField: "email",
        });
      } else if (key == "subject" && e.target.value == "") {
        this.setState({
          errormessage: "Please enter subject",
          error: true,
          errorField: "subject",
        });
      } else if (key == "description" && e.target.value == "") {
        this.setState({
          errormessage: "Please enter description",
          error: true,
          errorField: "description",
        });
      } else {
        this.setState({
          errormessage: "",
          error: false,
          errorField: "",
        });
      }
    }
    if (key == "issueType") {
      this.setState({ issue: e.value });
    } else {
      this.setState({ [key]: e.target.value });
    }
  };
  handleSubmit = () => {
    const { email, subject, description, issue } = this.state;
    this.setState({ submit: true });
    if (this.state.issue == "") {
      this.setState({
        errormessage: "Please select issue",
        error: true,
        errorField: "issueType",
      });
    } else if (this.state.email == "") {
      this.setState({
        errormessage: "Please enter email",
        error: true,
        errorField: "email",
      });
    } else if (this.state.subject == "") {
      this.setState({
        errormessage: "Please enter subject",
        error: true,
        errorField: "subject",
      });
    } else if (this.state.description == "") {
      this.setState({
        errormessage: "Please enter description",
        error: true,
        errorField: "description",
      });
    } else {
      this.setState({
        errormessage: "",
        error: false,
        errorField: "",
      });
      this.props.ticketSubmit({ email, subject, description, issue });
    }
  };
  closeSuccessPopup = () => {
    this.setState({ showSuccess: false });
    this.props.history.push("/dashboard");
  };
  render() {
    const { error, errormessage, errorField, showSuccess, message } = this.state;
    console.log(this.props.ticketSubmitData);

    return (
      <>
        {/* <Helmet>
          <script
            id="ze-snippet"
            src="https://static.zdassets.com/ekr/snippet.js?key=65b14d0c-22c8-4442-91db-9ce4323055aa"
          >
            {" "}
          </script>
        </Helmet> */}
        <Zendesk zendeskKey={ZENDESK_KEY} {...setting} onLoaded={() => console.log('is loaded')} />
        <div id="content" class="container my-5">
          <div id="help" class="row">
            <div class="offset-lg-2 col-lg-8 col-md-12 d-flex align-items-center justify-content-center flex-column f-m">
              <h1 class="text-center txt-blk mb-5 f-b">Help</h1>
            </div>
            <div class="offset-lg-2 col-lg-8 box-shd br-20">
              <form class="p-5 metadata">
                <div class="form-group row align-items-center">
                  <label for="meta1" class="col-sm-3 col-form-label f-18 f-m">
                    Issue Type
                  </label>
                  <div class="col-sm-9">
                    <div class="input-group">
                      <Select
                        className="help"
                        options={this.state.issueType}
                        placeholder="Select Issue Type"
                        onChange={(e) => this.changeHandler(e, "issueType")}
                      />
                    </div>
                    {error && errorField == "issueType" ? (
                      <div style={{ color: "red" }}>{errormessage}</div>
                    ) : null}
                  </div>
                </div>
                <div class="form-group row align-items-center">
                  <label for="meta1" class="col-sm-3 col-form-label f-18 f-m">
                    Email Address
                  </label>
                  <div class="col-sm-9">
                    <input
                      type="text"
                      class="form-control f-16"
                      id="meta1"
                      placeholder="Enter Email Address"
                      onChange={(e) => this.changeHandler(e, "email")}
                    />
                    {error && errorField == "email" ? (
                      <div style={{ color: "red" }}>{errormessage}</div>
                    ) : null}
                  </div>
                </div>
                <div class="form-group row align-items-center">
                  <label for="meta1" class="col-sm-3 col-form-label f-18 f-m">
                    Subject
                  </label>
                  <div class="col-sm-9">
                    <input
                      type="text"
                      class="form-control f-16"
                      id="meta1"
                      placeholder="Enter Subject"
                      onChange={(e) => this.changeHandler(e, "subject")}
                    />
                    {error && errorField == "subject" ? (
                      <div style={{ color: "red" }}>{errormessage}</div>
                    ) : null}
                  </div>
                </div>
                <div class="form-group row align-items-center">
                  <label for="meta1" class="col-sm-3 col-form-label f-18 f-m">
                    Description
                  </label>
                  <div class="col-sm-9">
                    <textarea
                      class="form-control"
                      rows="5"
                      placeholder="Type here..."
                      onChange={(e) => this.changeHandler(e, "description")}
                    ></textarea>
                    {error && errorField == "description" ? (
                      <div style={{ color: "red" }}>{errormessage}</div>
                    ) : null}
                  </div>
                </div>
                {/* <div class="form-group row align-items-center">
                <label for="meta1" class="col-sm-3 col-form-label f-18 f-m">
                  Question About
                </label>
                <div class="col-sm-9">
                  <div class="input-group">
                    <select class="custom-select f-16 f-m ">
                      <option selected="">Select Question About</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select>
                  </div>
                </div>
              </div> */}

                <div class="col-lg-12 d-flex mt-5">
                  <a
                    href="dashboard.html"
                    class="btn btn-default m-1 w-100 f-b"
                  >
                    Cancel
                  </a>
                  <a
                    onClick={this.handleSubmit}
                    class="btn btn-org m-1 w-100 f-b"
                    data-toggle="modal"
                    data-target="#successPublished"
                  >
                    Submit
                  </a>
                </div>
              </form>
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
    myPlan: state.Subscription.myPlan,
    ticketListData: state.Help.ticketListData,
    ticketSubmitData: state.Help.ticketSubmitData,
  };
};
const mapDispatchToProps = (dispatch) => ({
  profile: (payload) => dispatch(actions.profileGetInfo(payload)),
  ticketList: () => dispatch(actions.ticketList()),
  ticketSubmit: (payload) => dispatch(actions.ticketSubmit(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Help);
