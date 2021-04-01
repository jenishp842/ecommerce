/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  WithLayoutContainer,
  TikHistoryTable,
  SuccessPopup,
} from "../../component/index.jsx";
import * as actions from "../../actions";
import { formatTime, formatDate } from "../../helper/utility.js";
import moment from "moment";
import SharedModal from "./SharedModal.jsx";
import SharedMeModal from "./SharedMeModal.jsx";
var QRCode = require("qrcode.react");

class ViewTik extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAccord: false,
      sharedModal: false,
      sharedMeModal: false,
      index: "",
      initial: "start",
      tab: [],
      tabList: [],
      statusOpen: false,
    };
  }
  componentDidMount() {
    const docId = JSON.parse(localStorage.getItem("docId"));
    this.props.viewTik({ Id: docId });
  }
  successPopup = () => {
    this.setState({
      deleteSuccessFlag: false,
      deleteDraftFlag: false,
      deleteDraftData: {},
      SuccessPopupFlag: true,
    });

    // this.props.getDocumentListInfo('Drafts');
  };

  successPopupClosePopup = () => {
    this.props.tikInitialization();

    this.setState({
      deleteDraftFlag: false,
      deleteDraftData: {},
      SuccessPopupFlag: false,
      deleteSuccessFlag: false,
    });
  };
  showAccord = (i, e) => {
    this.setState({ tab: this.updateTabs(i) });
  };
  updateTabs(id) {
    let tabs = this.state.tabList;
    let newtabs = tabs.map((tab, index) => {
      if (index == id) {
        if (tab.activeAcc == true) {
          tab.activeAcc = false;
        } else {
          tab.activeAcc = true;
        }
      } else {
        tab.activeAcc = false;
      }
      return tab;
    });
    return newtabs;
  }
  componentDidUpdate(prevprops) {
    if (this.props.viewTikData != prevprops.viewTikData) {
      let template = [];
      this.props.viewTikData.timeline.map((e) => {
        template.push(JSON.parse(e.blockchainData.DocumentObject.Attributes));
      });
      this.setState({ templateField: template });

      this.props.viewTikData &&
        this.props.viewTikData.timeline.map((o, l) => {
          console.log(o.acceptanceDocData);
          const u = this.state.tab;
          const v = u[l];
          const obj = {
            ...v,
            activeAcc: false,
            at: o.at,
            blockchainData: o.blockchainData,
            description: o.description,
            blockchainDocId: o.blockchainDocId,
            status: o.status,
            requireToUpdate: o.requireToUpdate,
            acceptance:
              o.acceptanceDocData != undefined &&
              Object.keys(o.acceptanceDocData).length !== 0
                ? o.acceptanceDocData.data.DocumentTemplate
                : [],
            isacceptance:
              o.acceptanceDocData != undefined &&
              Object.keys(o.acceptanceDocData).length !== 0
                ? true
                : false,
          };
          u[l] = obj;
          this.setState({ tab: u });
          console.log(u);
        });
      this.state.tab.map((e, i) => {
        const l = this.state.tabList;
        const data = l[i];
        const object = {
          ...data,
          data: [
            _.sortBy(JSON.parse(e.blockchainData.DocumentObject.Attributes), [
              "order",
            ]),
          ],
          description: e.description,
          at: e.at,
          activeAcc: e.activeAcc,
          status: e.status,
          requireToUpdate: e.requireToUpdate,
          acceptance: e.acceptance ? e.acceptance : null,
          isAcceptance: e.isacceptance ? true : false,
          statusList: this.props.viewTikData.statusList,
        };
        l[i] = object;
        this.setState({ tabList: l });
      });
    }
  }
  closePopup = () => {
    this.setState({ sharedModal: false, sharedMeModal: false });
  };
  showShared = () => {
    this.setState({ sharedModal: true });
  };
  showSharedMe = () => {
    this.setState({ sharedMeModal: true });
  };
  render() {
    // let sortedMain = _.sortBy(sortTab, ["order"]);
    console.log(this.state.tabList);
    // this.state.tabList.map(e => {
    //   e.data[0].map(o => {
    //     console.log(o)
    //   })
    // })
    const { viewTikData } = this.props;
    return (
      <WithLayoutContainer>
        <div id="tikDetail" class="wrapper wrapper-content">
          <div class="row">
            <div class="col-xl-12">
              <div class="containerBox">
                <div
                  class="fixHeight"
                  style={{ maxHeight: "calc(100vh - 240px)" }}
                >
                  <div class="container-fluid">
                    {/* <div class="row">
                      <div class="col-lg-6">
                        <div class="row">
                          <div class="col-lg-6">
                            <h3 class="f-16 f-b">Tor Name</h3>
                          </div>
                          <div class="col-lg-6">
                            <h3 class="f-16">Antonio Johnson</h3>
                          </div>
                          
                      <div class="col-lg-6">
                          <div class="col-lg-6">
                            <h3 class="f-16 f-b">Affiliated</h3>
                          </div>
                          <div class="col-lg-6">
                            <h3 class="f-16">Solulab Inc</h3>
                          </div>
                      </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="row">
                          <div class="col">
                          <h3 class="f-16 f-b">Receiver Name and Email Address</h3>
                            <h3 class="f-16">
                              {viewTikData &&
                                `${viewTikData.receiver.firstName} ${viewTikData.receiver.lastName} (${viewTikData.receiver.email})`}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div> */}
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="row">
                          <div class="col-lg-6">
                            <h3 class="f-16 f-b">Tor Name</h3>
                          </div>
                          <div class="col-lg-6">
                            <h3 class="f-16">
                              {viewTikData &&
                                `${viewTikData.providerData.firstName} ${viewTikData.providerData.lastName}`}
                            </h3>
                          </div>
                          <div class="col-lg-6">
                            <h3 class="f-16 f-b">Affiliated</h3>
                          </div>
                          <div class="col-lg-6">
                            <h3 class="f-16">
                              {viewTikData && viewTikData.orgName}
                            </h3>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="row">
                          <div class="col">
                            <h3 class="f-16 f-b">
                              Receiver Name and Email Address
                            </h3>
                            {viewTikData &&
                              `${viewTikData.receiver.firstName} ${viewTikData.receiver.lastName}  (${viewTikData.receiver.email})`}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div class="container-fluid">
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="row">
                          <div class="col-lg-6">
                            <h3 class="f-16 f-b">Tik Name</h3>
                          </div>
                          <div class="col-lg-6">
                            <h3 class="f-16">
                              {viewTikData.doc &&
                                viewTikData.doc.metaList[0].value}
                            </h3>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="row">
                          <div class="col-lg-6">
                            <h3 class="f-16 f-b">Tik ID</h3>
                          </div>
                          <div class="col-lg-6">
                            <h3 class="f-16">
                              {viewTikData.doc &&
                                viewTikData.doc.metaList[1].value}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-lg-6">
                        <div class="row">
                          <div class="col-lg-6">
                            <h3 class="f-16 f-b">Published At</h3>
                          </div>
                          <div class="col-lg-6">
                            <h3 class="f-16">
                              {viewTikData.doc &&
                                viewTikData.doc.metaList[2].value}
                            </h3>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="row">
                          <div class="col-lg-6">
                            <h3 class="f-16 f-b">Published To</h3>
                          </div>
                          <div class="col-lg-6">
                            <h3 class="f-16">
                              {viewTikData.doc &&
                                viewTikData.doc.metaList[3].value}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  {/* <div class="text-right">
                    <button
                      type="button"
                      class="btn btn-primary m-1"
                      data-toggle="modal"
                      data-target="#modalRelatedContent"
                      onClick={this.showShared}
                    >
                      <i class="fas fa-users mr-2"></i>Shared Publically
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary m-1"
                      data-toggle="modal"
                      data-target="#modalRelatedContent1"
                      onClick={this.showSharedMe}

                    >
                      <i class="fas fa-user-tag mr-2"></i>Shared With -{" "}
                      <span class="badge badge-light">0</span>
                    </button>
                  </div> */}
                  <div id="accordion" class="mt-5">
                    <div class="middle-line">
                      <div class="mCircle mx-auto mb-4"></div>
                    </div>
                    {this.state.tabList &&
                      this.state.tabList.map((e, i) => {
                        console.log(e);
                        return (
                          <div class="card">
                            <div class="card-header" id="headingThree">
                              <h5
                                class="m-0 d-flex justify-content-between align-items-center"
                                style={{ fontSize: "12px" }}
                              >
                                <div>
                                  <h5 class="f-18 f-m">{e.description}</h5>
                                  <p class="f-16 mb-2">
                                    {moment(e.at).format("DD/MM/YYYY")}{" "}
                                    <span>{moment(e.at).format("LT")}</span>
                                  </p>
                                </div>

                                <a
                                  onClick={() => this.showAccord(i)}
                                  data-toggle="collapse"
                                  data-target="#collapseThree"
                                  aria-expanded="true"
                                  aria-controls="collapseThree"
                                  style={{ fontSize: "12px" }}
                                >
                                  {e.activeAcc ? (
                                    <i class="fa fa-angle-down"></i>
                                  ) : (
                                    <i class="fa fa-angle-right"></i>
                                  )}
                                </a>
                              </h5>
                            </div>
                            <div
                              id="collapseThree"
                              class={
                                e.activeAcc ? "collapse show " : "collapse "
                              }
                              aria-labelledby="headingThree"
                              data-parent="#accordion"
                              style={{ position: "relative" }}
                            >
                              <div class="card-body">
                                <div class="card-body">
                                  <div class="container ">
                                    <div class="row">
                                      <div class="col-lg-2">
                                        {e.data[0].map((j) => {
                                          if (j.dataType == "Image") {
                                            return (
                                              <>
                                                <img
                                                  class="img-fluid"
                                                  src={j.value}
                                                  // style={{marginBottom:'10px'}}
                                                />
                                                <div
                                                  style={{
                                                    marginBottom: "10px",
                                                  }}
                                                >
                                                  {j.name}
                                                </div>
                                              </>
                                            );
                                          }
                                          if (j.dataType == "Qr") {
                                            return (
                                              <div
                                                style={{ marginBottom: "10px" }}
                                              >
                                                <QRCode
                                                  value={j.value}
                                                  size={80}
                                                  bgColor={"#ffffff"}
                                                  fgColor={"#000000"}
                                                  includeMargin={false}
                                                  renderAs={"svg"}
                                                  imageSettings={{
                                                    excavate: true,
                                                  }}
                                                />
                                                <div>{j.name}</div>
                                              </div>
                                            );
                                          }
                                        })}
                                      </div>
                                      <div class="col-lg-6">
                                        {e.data[0].map((j) => {
                                          if (
                                            j.dataType != "Image" &&
                                            j.dataType != "Boolean"
                                          ) {
                                            return (
                                              <div class="row">
                                                <div class="col-lg-6 f-b f-16">
                                                  {j.name}
                                                </div>
                                                <div class="col-lg-4">
                                                  {j.value}
                                                </div>
                                              </div>
                                            );
                                          }
                                          if (j.dataType == "Boolean") {
                                            return (
                                              <div class="row">
                                                <div class="col-lg-6 f-b f-16">
                                                  {j.name}
                                                </div>
                                                <div class="col-lg-4">
                                                  {j.value === true
                                                    ? "true"
                                                    : "false"}
                                                </div>
                                              </div>
                                            );
                                          }
                                        })}
                                      </div>
                                      <div class="col-lg-4">
                                        <div class="row">
                                          <div class="col-lg-12">
                                            <div id="headingThreea">
                                              <h2 class="mb-0 d-flex mt-0">
                                                <a
                                                  class="btn btn-link border-0 d-flex justify-content-between align-items-center bg-muted br-6"
                                                  style={{
                                                    width: "100%",
                                                    backgroundColor: "#f3f3f4",
                                                    borderRadius: "0px",
                                                  }}
                                                  data-toggle="collapse"
                                                  data-target="#collapseThreea"
                                                  aria-expanded="true"
                                                  onClick={() =>
                                                    this.setState({
                                                      statusOpen: !this.state
                                                        .statusOpen,
                                                    })
                                                  }
                                                >
                                                  <p class="mb-0"> Status </p>{" "}
                                                  {this.state.statusOpen ? (
                                                    <i class="fa fa-angle-down"></i>
                                                  ) : (
                                                    <i class="fa fa-angle-right"></i>
                                                  )}
                                                </a>
                                              </h2>
                                            </div>
                                            <div
                                              id="collapseThreea"
                                              className={
                                                this.state.statusOpen
                                                  ? "collapse show"
                                                  : "collapse"
                                              }
                                              aria-labelledby="headingThreea"
                                              data-parent=""
                                            >
                                              <div
                                                class="card-body"
                                                style={{
                                                  padding: "0px",
                                                  paddingTop: "10px",
                                                }}
                                              >
                                                <div class="col-lg-12 f-b f-16 text-left">
                                                  {e.statusList.map((i) => {
                                                    return (
                                                      <p
                                                        class={
                                                          i.status ==
                                                          "Created On"
                                                            ? "draftdoc"
                                                            : i.status ==
                                                              "Sent On"
                                                            ? "pendingdoc"
                                                            : i.status ==
                                                              "Updated Required On"
                                                            ? "sharedoc"
                                                            : i.status ==
                                                              "Updated on"
                                                            ? "updatetdoc"
                                                            : i.status ==
                                                              "Accepted on"
                                                            ? "acceptdoc"
                                                            : null
                                                        }
                                                      >
                                                        {i.status}
                                                        <span>
                                                          <b>
                                                            {" "}
                                                            <i>
                                                              <u>
                                                                {moment(
                                                                  i.at
                                                                ).format(
                                                                  "DD/MM/YYYY"
                                                                )}{" "}
                                                                <span>
                                                                  {moment(
                                                                    i.at
                                                                  ).format(
                                                                    "LT"
                                                                  )}
                                                                </span>
                                                              </u>
                                                            </i>
                                                          </b>
                                                        </span>
                                                      </p>
                                                    );
                                                  })}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {e.status === "Update_Required" ? (
                                  <>
                                    <div class="col-lg-12 p-0">
                                      <p class="m-0">
                                        <i>
                                          <b>
                                            <small class="bg-muted p-2 br-6">
                                              Update Required
                                            </small>
                                          </b>
                                        </i>
                                      </p>
                                    </div>{" "}
                                    <div class="card-body">
                                      <div class="container">
                                        <div class="row">
                                          <div class="col-lg-10">
                                            <div class="row">
                                              <div class="col-lg-2 f-b f-16">
                                                Reason
                                              </div>
                                              <div class="col-lg-8">
                                                {e.requireToUpdate}
                                              </div>
                                            </div>
                                          </div>
                                          <div class="col-lg-2"></div>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                ) : null}
                                {e.isAcceptance ? (
                                  <>
                                    <div class="col-lg-12 p-0">
                                      <p class="m-0">
                                        <i>
                                          <b>
                                            <small class="bg-muted p-2 br-6">
                                              Acceptance Form
                                            </small>
                                          </b>
                                        </i>
                                      </p>
                                    </div>{" "}
                                    <div class="card-body">
                                      <div class="container">
                                        <div class="row">
                                          <div class="col-lg-10">
                                            {e.acceptance.map((j) => {
                                              if (
                                                j.dataType != "Image" &&
                                                j.dataType != "Boolean"
                                              ) {
                                                return (
                                                  <div class="row">
                                                    <div class="col-lg-2 f-b f-16">
                                                      {j.name}
                                                    </div>
                                                    <div class="col-lg-8">
                                                      {j.value}
                                                    </div>
                                                  </div>
                                                );
                                              }
                                              if (j.dataType == "Boolean") {
                                                return (
                                                  <div class="row">
                                                    <div class="col-lg-2 f-b f-16">
                                                      {j.name}
                                                    </div>
                                                    <div class="col-lg-8">
                                                      {j.value === true
                                                        ? "true"
                                                        : "false"}
                                                    </div>
                                                  </div>
                                                );
                                              }
                                            })}
                                          </div>
                                          <div class="col-lg-2">
                                            {e.acceptance.map((j) => {
                                              if (j.dataType == "Image") {
                                                return (
                                                  <>
                                                    <img
                                                      class="img-fluid"
                                                      src={j.value}
                                                      // style={{marginBottom:'10px'}}
                                                    />
                                                    <div
                                                      style={{
                                                        marginBottom: "10px",
                                                      }}
                                                    >
                                                      {j.name}
                                                    </div>
                                                  </>
                                                );
                                              }
                                              if (j.dataType == "Qr") {
                                                return (
                                                  <div
                                                    style={{
                                                      marginBottom: "10px",
                                                    }}
                                                  >
                                                    <QRCode
                                                      value={j.value}
                                                      size={80}
                                                      bgColor={"#ffffff"}
                                                      fgColor={"#000000"}
                                                      includeMargin={false}
                                                      renderAs={"svg"}
                                                      imageSettings={{
                                                        excavate: true,
                                                      }}
                                                    />
                                                    <div>{j.name}</div>
                                                  </div>
                                                );
                                              }
                                            })}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.state.sharedModal == true ? (
          <SharedModal
            closePopup={this.closePopup}
            sharedData={viewTikData && viewTikData.timeline}
          />
        ) : null}
        {this.state.sharedMeModal == true ? (
          <SharedMeModal
            closePopup={this.closePopup}
            sharedData={viewTikData && viewTikData.timeline}
          />
        ) : null}
      </WithLayoutContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    documentList: state.Tik.documentList,
    viewTikData: state.Tik.viewTik,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getDocumentListInfo: (filter) =>
    dispatch(actions.getDocumentListInfo(filter)),
  viewTik: (payload) => dispatch(actions.viewTik(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewTik);
