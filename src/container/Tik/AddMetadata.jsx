import React, { Component } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { connect } from "react-redux";
import * as actions from "../../actions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { withLastLocation } from "react-router-last-location";
import { withRouter } from "react-router";
import {
  HeaderWithoutSearch
} from "../../component/index.jsx";
class AddMetadata extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addMeta: [],
      submit: false,
      screenwidth: 1440,
      data: "",
    };
    this.updateWidth = this.updateWidth.bind(this);
  }

  componentDidMount() {
    let prevRoute = JSON.parse(localStorage.getItem("prevroute"));
    this.props.getMetaData();
    window.addEventListener("resize", this.updateWidth);
    this.props.profile();

    // localStorage.removeItem('selectId');
    // localStorage.removeItem('templateId');
    if (prevRoute == "create-tik") {
      // localStorage.removeItem('addMetaData');
      // this.props.createTikEdit({ metaData: [] })
      // this.setState({data: ''})
    }
    console.log(this.props.lastLocation);
  }
  componentDidUpdate(prevprops) {
    let prevRoute = JSON.parse(localStorage.getItem("prevroute"));

    if (prevprops.metaData != this.props.metaData) {
      localStorage.removeItem("addMetaData");
    }
    if (prevprops.metaDataList != this.props.metaDataList) {
      if (prevRoute == "create-tik") {
        // localStorage.removeItem('addMetaData');
        // this.props.createTikEdit({ metaData: [] })
      }
      this.setState({ data: "" });
    }
  }
  updateWidth = () => {
    this.setState({
      screenwidth: window.innerWidth,
    });
  };
  renderTooltip = (props, des) => (
    <Tooltip id="button-tooltip" {...props}>
      {des}
    </Tooltip>
  );
  handleChange = (e, value, index) => {
    console.log(this.state.addMeta.length);
    // if (this.state.addMeta.length == 1) {
    //   this.setState(
    //     {
    //       addMeta: [
    //         {
    //           ...this.state.addMeta[0],
    //           name: value,
    //           value: e.target.value,
    //         },
    //       ],
    //     },
    //     () => {
    //       console.log("if data added", this.state.addMeta);
    //     }
    //   );
    // } else {
    let previousdata = this.props.metaData;
    let data = previousdata[index];
    const object = {
      ...data,
      name: value,
      value:
        e.target != undefined
          ? e.target.value
          : ("0" + new Date(e).getDate()).slice(-2) +
            "-" +
            ("0" + (new Date(e).getMonth() + 1)).slice(-2) +
            "-" +
            e.getFullYear(),
    };
    previousdata[index] = object;
    this.setState(
      {
        addMeta: previousdata,
      },
      () => console.log("again added", this.state.metaData)
    );
    this.props.createTikEdit({ metaData: previousdata });

    // }
  };
  nextToSelect = () => {
    this.setState({ submit: true });
    let metaCheck = [];
    const metaDataCheck = this.props.metaData.filter((e) => Object.keys(e).length !== 0);
    metaCheck.push(metaDataCheck);
    if (
      metaCheck[0].length === this.props.metaDataList.length &&
      !metaCheck.includes("")
    ) {
      this.props.history.push("/select-template");
      console.log("next");
      // this.props.createTikEdit({ metaData: this.state.addMeta });
      localStorage.setItem("addMetaData", JSON.stringify(this.props.metaData));
    }
  };
  render() {
    const { metaDataList, roledocument, document, tikLimit } = this.props;
    if (document && roledocument) {
      if (document.create == false && roledocument.create == false) {
        this.props.history.push("/docHistory");
        toast.error("you are not authorized");
      }
    }
    if (tikLimit) {
      this.props.history.push("/docHistory");
    }
    return (
      <>
      <HeaderWithoutSearch/>
        <div id="content" class="container my-5">
          <div class="row">
            <div class="offset-lg-2 col-lg-8 col-md-12 d-flex align-items-center justify-content-center flex-column f-m">
              <h1 class="text-center txt-blk mb-5 f-b">Add Metadata</h1>
            </div>
            <div class="offset-lg-2 col-lg-8 box-shd br-20">
              <form class="p-5 metadata">
                {metaDataList &&
                  metaDataList.map((e, index) => {
                    // if (e.datatype == "String") {
                    return (
                      <>
                        <div class="form-group row align-items-center">
                          <label
                            for="meta1"
                            class="col-sm-3 col-form-label f-18 f-m"
                          >
                            {e.name}
                          </label>
                          <div class="col-sm-8">
                            <input
                              value={
                                this.props.metaData[index] != undefined
                                  ? this.props.metaData[index].value
                                  : null
                              }
                              type="text"
                              class="form-control f-16"
                              id="meta1"
                              placeholder={`Enter ${e.name}`}
                              onChange={(event) =>
                                this.handleChange(event, e.name, index)
                              }
                            />
                          </div>
                          <div class="col-sm-1">
                            {
                              <OverlayTrigger
                                placement={
                                  this.state.screenwidth > 570
                                    ? "left"
                                    : "right"
                                }
                                delay={{ show: 250, hide: 400 }}
                                overlay={(event) =>
                                  this.renderTooltip(event, e.description)
                                }
                              >
                                <a class="f-28 txt-blk">
                                  <i class="fa fa-question-circle"></i>
                                </a>
                              </OverlayTrigger>
                            }
                          </div>
                        </div>
                        {this.props.metaData[index] != undefined ? (
                          this.props.metaData[index].value == "" ? (
                            <div
                              className="input-feedback-meta"
                              style={{
                                marginTop: "-11px",
                                marginBottom: "16px",
                              }}
                            >
                              Please enter the {e.name}
                            </div>
                          ) : null
                        ) : this.state.submit ? (
                          <div
                            className="input-feedback-meta"
                            style={{ marginTop: "-11px", marginBottom: "16px" }}
                          >
                            Please enter the {e.name}
                          </div>
                        ) : null}
                      </>
                    );
                  })}
                <div class="col-lg-12 d-flex mt-5">
                  <a
                    onClick={() => this.props.history.push("/docHistory")}
                    class="btn btn-default m-1 w-100 f-b"
                  >
                    Cancel
                  </a>
                  <a
                    onClick={this.nextToSelect}
                    class="btn btn-org m-1 w-100 f-b text-light"
                  >
                    Next
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  metaData: state.Tik.metaData,
  metaDataList: state.Tik.metaDataList,
  document: state.Profile.document,
  roledocument: state.Profile.Roledocument,
  tikLimit: state.Tik.tikLimit,
});

const mapDispatchToProps = (dispatch) => ({
  profile: (payload) => dispatch(actions.profileGetInfo(payload)),
  createTikEdit: (data) => dispatch(actions.createTikEdit(data)),
  getMetaData: () => dispatch(actions.getMetaData()),
});

export default withRouter(
  withLastLocation(connect(mapStateToProps, mapDispatchToProps)(AddMetadata))
);
