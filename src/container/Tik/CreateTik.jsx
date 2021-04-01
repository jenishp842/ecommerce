/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import {
  ProfileDropdown,
  Notification,
  Modal,
  Button,
  HeaderWithoutSearch
} from "../../component/index.jsx";
import { connect } from "react-redux";
import * as actions from "../../actions";
import SuccessModal from "../../component/SuccessModal.jsx";
import Timekeeper from "react-timekeeper";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MobilewView from "./MobileView.jsx";
import MobileView from "./MobileView.jsx";
import { toast } from "react-toastify";
import CreatableSelect from "react-select/creatable";
import _ from "lodash";
import searcho from "../../assets/img/searcho.png";
import header_logo from "../../assets/img/logo.png";
import logom from "../../assets/img/logom.png";
import doc from "../../assets/img/doc.png";
import calander from"../../assets/img/cal.png";
import times from "../../assets/img/time.png";
import certi from "../../assets/img/certi.png";
import moment from 'moment';

// import QRCode from 'react-qr-code';
var QRCode = require("qrcode.react");
class CreateTik extends Component {
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
      showTime: false,
      time: "12:34pm",
      attrVal: [],
      timeIndex: null,
      imgList: [],
      image: [],
      livepreview: [],
      MobileViewPoppup: false,
      submit: false,
      reciverList: [],
      teeDetail: [],
      showTicket: false,
      screenwidth: "",
      loader: false,
      error: false,
      errormessage: "",
      tikSize: '',
      isdocSizeLimit: true,
      limitPopup: false,
      Docaccept: true
    };
    this.updateWidth = this.updateWidth.bind(this);
  }
  componentDidMount() {
    this.props.errorClear();
    const tempId = JSON.parse(localStorage.getItem("templateId"));
    this.props.profile();
    this.props.getTemplateDetail({ templateId: tempId, whiteList: true });
    let localMetaData = JSON.parse(localStorage.getItem("addMetaData"));
    console.log(localMetaData);
    localMetaData == null ? this.props.history.push("/add-metadata") : null;
    console.log(this.props.metaData);
    this.props.reciverListInfo();
    // window.addEventListener("resize", this.updateWidth);
  }
  updateWidth = () => {
    const x = document.getElementById("screenPixel").offsetWidth;
    this.setState({
      screenwidth: x,
    });
  };
  logoutHandler = () => {
    document.body.classList.add("modal-open");
    this.setState({
      logout: true,
    });
  };
  newLine = (success, err) => {
    const newText = (success + "\n" + err)
      .split("\n")
      .map((str, i) => {
        if(i == 2){
         return <p style={{ maxHeight: "120px", overflowY: "scroll" }}>{str}</p>
        }else{
        return <p>{str}</p>
        }
      });
    return newText;
  };
  componentDidUpdate(prevProps) {
    if (prevProps.templateDetail != this.props.templateDetail) {
      if (this.props.templateDetail != undefined) {
        let booleanMain = [];
        Object.keys(this.props.templateDetail).map((e) => {
          if (e == "attribute") {
            this.props.templateDetail["attribute"].map((i) => {
              booleanMain.push(i);
            });
          }
          if (e == "image") {
            this.props.templateDetail["image"].map((i) => {
              booleanMain.push(i);
            });
          }
          if (e == "text") {
            this.props.templateDetail["text"].map((i) => {
              booleanMain.push(i);
            });
          }
        });
        let sortedBooleanMain = _.sortBy(booleanMain, ["order"]);
        // console.log('callllllllllllllllllllll',sortedBooleanMain)
        sortedBooleanMain.map((e) => {
          if (e.dataType == "Boolean") {
            //  console.log('boolean condition')
            let booleanData = this.state.attrVal;
            let data = booleanData[e.order - 1];
            const object = {
              ...data,
              name: e.attribute_name,
              value: false,
              order: e.order,
              dataType: e.dataType,
              default: e.default,
            };
            booleanData[e.order - 1] = object;
            this.setState(
              {
                attrVal: booleanData,
              },
              () => console.log("sasvddvhjdadhjddhjdahd", this.state.attrVal)
            );
          }
          if (e.dataType == "Text") {
            //  console.log('boolean condition')
            let textData = this.state.attrVal;
            let data = textData[e.order - 1];
            const object = {
              ...data,
              name: e.attribute_name,
              value: e.value,
              order: e.order,
              dataType: e.dataType,
              default: e.default,
            };
            textData[e.order - 1] = object;
            this.setState(
              {
                attrVal: textData,
              },
              () => console.log("sasvddvhjdadhjddhjdahd", this.state.attrVal)
            );
          }
        });
      }
    }

    if (prevProps.createTikSuccess != this.props.createTikSuccess) {
      const errorMessage = this.props.createTikSuccess.msg.errorMessage;
      const successMessage = this.props.createTikSuccess.msg.successMessage;

      this.setState({
        showSuccess: true,
        message: this.newLine(successMessage, errorMessage),
        loader: false,
      });
    }
    if (this.props.error != prevProps.error) {
      // console.log(this.props.error);
      this.setState({ loader: false });
    }
    if (
      this.props.reciverData != undefined &&
      this.props.reciverData instanceof Array &&
      this.props.reciverData != prevProps.reciverData
    ) {
      let teeObjectList = [];
      let teeArrayList = [];
      this.props.reciverData.map((e) => {
        // console.log(e);
        teeArrayList.push(e.email);
        const teeObject = {
          ...teeArrayList,
          value: e.email,
          label: e.email,
        };
        // console.log(teeObject);
      });
      teeArrayList.map((e) => {
        const teeObject = {
          value: e,
          label: e,
        };
        teeObjectList.push(teeObject);
      });
      this.setState({ teeDetail: teeObjectList });
    }

    if (this.props.saveDraftSuccess != prevProps.saveDraftSuccess) {
      this.setState({
        showSuccess: true,
        message: "Draft saved sucessfully",
        loader: false,
      });
    }
  }
  closeSuccessPopup = () => {
    this.setState({ showSuccess: false });
    this.props.history.push("/docHistory");
  };
  logout = () => {
    document.body.classList.remove("modal-open");
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("isFree");
    this.props.history.push("/signin");
  };
  ticketHandler = () => {
    this.setState({
      showTicket: !this.state.showTicket,
    });
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
  acceptLimit = () => {
    this.setState({ limitPopup: false, isdocSizeLimit: true })
    this.handleSubmit()
  }
  closeLimitPopup = () => {
    this.setState({ limitPopup: false })
  }
  applyLimit = () => {
    const { myPlan } = this.props;
    let images = [];
    const sortattrVal = this.state.attrVal.filter(
      (e) => Object.keys(e).length != 0
    );
    const sortimgList = this.state.imgList.filter(
      (e) => Object.keys(e).length != 0
    );
    const concatAttr = sortattrVal.concat(sortimgList);
    const sortimage = this.state.image.filter(
      (e) => Object.keys(e).length != 0
    );
    sortimage.map((e) => {
      images.push(e.image);
    });
  // tik size
  const stringsortattrVal = JSON.stringify(concatAttr);
  const fd = new FormData();
  for (let i = 0; i < images.length; i++) {
    fd.append('image', images[i]);
  }
  fd.append('attributeList', stringsortattrVal);
  let size = 0;
  for (let pair of fd.entries()) {
    if (pair[1] instanceof Blob)
      size += pair[1].size;
    else
      size += pair[1].length;
  }
  if (
    size > myPlan.subscriptionPlanDetails.docSizePerTransaction * 1048576
    ){
    this.setState({limitPopup: true})
  }else{
    this.setState({ limitPopup: false},() => this.handleSubmit())
  }
  }
  handleSubmit = () => {
    this.setState({ submit: true });
    let images = [];
    let sortReciverList = [];
    let sortattrValCheck = [];
    let sortimgListCheck = [];
    let numberVali = [];
    let filterTemplateDetail;
    const { metaData, templateDetail, myPlan } = this.props;
    let logId = JSON.parse(localStorage.getItem("logId"));

    // filterTemplateDetail = templateDetail.attribute.filter(
    //   (e) => e.dataType != "Text"
    // );
    filterTemplateDetail = templateDetail.attribute
    const sortattrVal = this.state.attrVal.filter(
      (e) => Object.keys(e).length != 0
    );
    const sortimgList = this.state.imgList.filter(
      (e) => Object.keys(e).length != 0
    );
    const sortimage = this.state.image.filter(
      (e) => Object.keys(e).length != 0
    );

    sortattrVal.map((e) => {
      console.log(e)
      if(e.dataType != 'Text'){
        sortattrValCheck.push(e.value);
      }
    });
    sortattrVal.map((e) => {
      if (e.dataType == "Number") {
        numberVali.push(e.value);
      }
    });

    sortimgList.map((e) => {
      sortimgListCheck.push(e.value);
    });
    let localMetaData = JSON.parse(localStorage.getItem("addMetaData"));
    const documentName = localMetaData[0].value;
    const templateId = templateDetail._id;

    sortimage.map((e) => {
      images.push(e.image);
    });
    if (this.state.reciverList != null) {
      this.state.reciverList.map((e) => {
        // console.log(e);
        sortReciverList.push(e.value);
      });
    }

    const concatAttr = sortattrVal.concat(sortimgList);
  
    console.log(
      sortReciverList,
      numberVali,
      sortattrValCheck,
      concatAttr,
      concatAttr.length,
      filterTemplateDetail.length,
      !sortattrValCheck.includes(""),
      sortReciverList.length != 0,
      this.state.error == false,
      /^[0-9]*$/i.test(numberVali),
      images
    );
  
	
    if (
      concatAttr.length === filterTemplateDetail.length &&
      !sortattrValCheck.includes("") &&
      sortReciverList.length != 0 &&
      this.state.error == false &&
      /^[0-9]*$/i.test(numberVali)
    ) {
      this.setState({ loader: true });
      this.props.createTik({
        documentName,
        templateId,
        metaData: localMetaData,
        sortattrVal: concatAttr,
        sortimgList,
        images,
        receiverList: sortReciverList,
        logId
      });
    }
  };
  saveDraft = () => {
    let images = [];
    let sortReciverList = [];
    let sortattrValCheck = [];
    let sortimgListCheck = [];
    const { metaData, templateDetail } = this.props;
    const sortattrVal = this.state.attrVal.filter(
      (e) => Object.keys(e).length != 0
    );
    const sortimgList = this.state.imgList.filter(
      (e) => Object.keys(e).length != 0
    );
    const sortimage = this.state.image.filter(
      (e) => Object.keys(e).length != 0
    );

    sortattrVal.map((e) => {
      sortattrValCheck.push(e.value);
    });
    sortimgList.map((e) => {
      sortimgListCheck.push(e.value);
    });
    let localMetaData = JSON.parse(localStorage.getItem("addMetaData"));
    const documentName = localMetaData ? localMetaData[0].value : "";
    const templateId = templateDetail._id;

    sortimage.map((e) => {
      images.push(e.image);
    });
    if (this.state.reciverList != null) {
      this.state.reciverList.map((e) => {
        // console.log(e);
        sortReciverList.push(e.value);
      });
    }
    const concatAttr = sortattrVal.concat(sortimgList);

    console.log(
      concatAttr.length,
      templateDetail.attribute.length,
      !sortattrValCheck.includes(""),
      sortReciverList.length != 0,
      this.state.error == false
    );

    this.props.saveDraft({
      documentName,
      templateId,
      metaData: localMetaData,
      sortattrVal: concatAttr,
      sortimgList,
      images,
      receiverList: sortReciverList,
      removeDraftId: "",
    });
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
  showTimeHandler = (index) => {
    this.setState({
      showTime: true,
      timeIndex: index,
    });
  };
  showTimeCloseHandler = () => {
    this.setState({
      showTime: false,
    });
  };
  setTime = (e, index) => {
    this.setState({
      time: e,
    });
  };

  handleChange = (e, value, index, name, datatype, defaultValue, date = "") => {
    if (value == "attribute_name") {
      // if (this.state.attrVal.length == 1) {
      //     this.setState(
      //       {
      //         attrVal: [
      //           {
      //             ...this.state.attrVal[index],
      //             order: index,
      //             name: name,
      //             value: e.target != undefined ? e.target.value : e,
      //           },
      //         ],
      //       },
      //       () => {
      //         console.log("if data added", this.state.attrVal);
      //       }
      //     );
      //   } else {
      let previousdata = this.state.attrVal;
      let livePreview = this.state.livepreview;

      let data = previousdata[index];
      let previewData = livePreview[index];
      const object = {
        ...data,
        name: name,
        value:
          e.target != undefined
            ? date == "boolean"
              ? e.target.checked
              : e.target.value
            : date == "date"
            ? moment(e).format('DD-MM-YYYY')
            : e,
        order: index + 1,
        dataType: datatype,
        default: defaultValue,
      };
      const previewObject = {
        ...previewData,
        name: name,
        value:
          e.target != undefined
            ? date == "boolean"
              ? e.target.checked
              : e.target.value
            : date == "date"
            ? moment(e).format('DD-MM-YYYY')
            : e,
        order: index + 1,
      };
      previousdata[index] = object;
      livePreview[index] = previewObject;

      this.setState(
        {
          attrVal: previousdata,
          livepreview: livePreview,
        },
        () => console.log("again added", this.state.attrVal)
      );
      //   }
    }
    if (value == "image_title") {
      if (e.target.files == undefined) {
        let previousdata = this.state.imgList;

        let data = previousdata[index];
        const object = {
          ...data,
          name: name,
          value: e.target.value,
          order: index + 1,
          dataType: datatype,
          default: defaultValue,
        };

        previousdata[index] = object;
        this.setState(
          {
            imgList: previousdata,
          }
          // () => console.log("again added", this.state.imgList)
        );
      } else {
        if (
          e.target.files[0].name.split(".").includes("jpg") ||
          e.target.files[0].name.split(".").includes("jpeg") ||
          e.target.files[0].name.split(".").includes("png")
        ) {
          let previousdata = this.state.imgList;
          let previousdata2 = this.state.image;

          let data = previousdata[index];
          let data2 = previousdata2[index];

          const object = {
            ...data,
            name: name,
            order: index + 1,
            dataType: datatype,
            default: defaultValue,
          };
          const object2 = {
            ...data2,
            name: name,
            image: e.target.files[0],
            order: index + 1,
            default: defaultValue,
            value: e.target.files[0].name,
          };
          previousdata[index] = object;
          previousdata2[index] = object2;

          this.setState(
            {
              imgList: previousdata,
              image: previousdata2,
              tikSize: e.target.files[0].size
            }
            // () => console.log("again added", this.state.imgList)
          );
        } else {
          toast.error("Only jpg,jpeg and png files are supported");
        }
      }
    }
  };
  handleTeeChange = (e) => {
    if (e != null) {
      if (e.length != 0) {
        const result = e.filter(
          (j) => !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(j.value)
        );
        if (result.length > 0) {
          this.setState({
            error: true,
            errormessage: "invalid email address",
          });
        } else {
          this.setState({
            error: false,
            errormessage: "",
          });
          this.setState({
            reciverList: e,
          });
        }
      }
    }else{
      this.setState({
        reciverList: [],
      });
    }
  };
  imageChangeHandler = (e) => {
    if (
      !e.target.files[0].name.split(".").includes("jpg") &&
      !e.target.files[0].name.split(".").includes("jpeg") &&
      !e.target.files[0].name.split(".").includes("png")
    ) {
      toast.error("Only jpg,jpeg and png files are supported");
    } else {
      this.setState({
        imageURL: URL.createObjectURL(e.target.files[0]),
        coverImage: e.target.files[0],
      });
    }
  };
  closeMobilePopup = () => {
    this.setState({ MobileViewPoppup: false });
  };
  showMobileView = () => {
    this.setState({ MobileViewPoppup: true });
  };
  render() {
    const {
      showNotification,
      logout,
      showSuccess,
      message,
      showTime,
      time,
      timeIndex,
      attrVal,
      imgList,
      image,
      loader,
      MobileViewPoppup,
    } = this.state;
    const {
      templateDetail,
      metaData,
      reciverData,
      document,
      roledocument,
    } = this.props;

    if (document && roledocument) {
      if (document.create == false && roledocument.create == false) {
        this.props.history.push("/docHistory");
        toast.error("you are not authorized");
      }
    }
    let numberValidation = /^[0-9]*$/i;
    const sortattrVal = attrVal.filter((e) => Object.keys(e).length != 0);
    const sortimgList = imgList.filter((e) => Object.keys(e).length != 0);
    const sortimage = image.filter((e) => Object.keys(e).length != 0);
    let localMetaData = JSON.parse(localStorage.getItem("addMetaData"));
    let prevRoute = JSON.parse(localStorage.getItem("prevroute"));
    console.log("before sort", imgList);
    console.log("after sort", sortattrVal, sortimgList, sortimage);
    console.log("concat", sortattrVal.concat(sortimgList), sortimage);
    console.log(this.state.attrVal)
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
    return (
      <>
       <HeaderWithoutSearch/>
        <div id="content" class="container-fluid my-5 createDoc">
          <div class="row">
            <div class="col-md-12 d-flex align-items-center f-m">
              <h1 class="text-center txt-blk mb-4 f-b w-100">
                {prevRoute == "editDraft" ? "Edit Draft" : "Create Tik"}
              </h1>
              <a
                onClick={this.showMobileView}
                class="btn btn-primary f-16"
                style={{ whiteSpace: "nowrap" }}
                data-toggle="modal"
                data-target="#mView"
              >
                Mobile Preview{" "}
              </a>
              <a
                onClick={this.saveDraft}
                style={{ whiteSpace: "nowrap" }}
                class="btn btn-primary f-16 mView-btn saveDraft m-1"
              >
                {prevRoute == "editDraft" ? "Save" : "Save as Draft"}
              </a>
            </div>
          </div>

          <div
            class="row ox-hide"
            id="screenPixel"
            onClick={() => this.showTimeCloseHandler()}
          >
            <div class="col mb-5  flex-grow-3">
              <div class="border br-20 px-3 py-4 left-container">
                <div class="min-fixHeight pr-3" style={{ minHeight: "470px" }}>
                  <h3 class="f-20 f-b">Metadata</h3>
                  <div class="container">
                    <div class="row">
                      {localMetaData &&
                        localMetaData.map((e) => {
                          return (
                            <div class="col-lg-6">
                              <div class="row">
                                <div class="col-lg-6">
                                  <h3 class="f-16 f-b">{e.name}</h3>
                                </div>
                                <div class="col-lg-6">
                                  <h3 class="f-16">{e.value}</h3>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                  <hr />

                  <h3 class="f-20 f-b">Template</h3>
                  <div class="container">
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="row">
                          <div class="col-lg-6">
                            <h3 class="f-16 f-b">Template Name</h3>
                          </div>
                          <div class="col-lg-6">
                            <h3 class="f-16">{templateDetail.template_name}</h3>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="row">
                          <div class="col-lg-6">
                            <h3 class="f-16 f-b">Number of Attributes</h3>
                          </div>
                          <div class="col-lg-6">
                            <h3 class="f-16">
                              {templateDetail.attribute != undefined
                                ? templateDetail.attribute.length
                                : null}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="row">
                          <div class="col-lg-6">
                            <h3 class="f-16 f-b">Template Type</h3>
                          </div>
                          <div class="col-lg-6">
                            <h3 class="f-16">{templateDetail.template_type}</h3>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="row">
                          <div class="col-lg-6">
                            <h3 class="f-16 f-b">Acceptance Form Integrated</h3>
                          </div>
                          <div class="col-lg-6">
                            <h3 class="f-16">
                              {templateDetail.isAcceptanceDocument
                                ? "Yes"
                                : "No"}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <h3 class="f-20 f-b">Template Fields</h3>
                  <div class="container">
                    <div class="row">
                      {sortedMain.map((e, index) => {
                        if (e.dataType == "String") {
                          return (
                            <div class="col-lg-6">
                              <div class="row">
                                <div class="col-lg-4">
                                  <h3
                                    style={{ marginTop: "10px" }}
                                    class="f-16 f-b"
                                  >
                                    {e.attribute_name}
                                  </h3>
                                </div>
                                <div class="col-lg-8">
                                  <form
                                    onSubmit={(e) => {
                                      e.preventDefault();
                                    }}
                                    class="form-group"
                                  >
                                    <input
                                      type="text"
                                      class="form-control f-16 px-3 py-2"
                                      placeholder={`Enter ${e.attribute_name}`}
                                      value={
                                        this.state.attrVal[index] != undefined
                                          ? this.state.attrVal[index].value
                                          : null
                                      }
                                      onChange={(event) =>
                                        this.handleChange(
                                          event,
                                          "attribute_name",
                                          index,
                                          e.attribute_name,
                                          e.dataType,
                                          e.default
                                        )
                                      }
                                    />
                                  </form>
                                </div>
                              </div>
                              {this.state.attrVal[index] != undefined ? (
                                this.state.attrVal[index].value == "" ? (
                                  <>
                                    <div class="row">
                                      <div class="col-lg-4"></div>
                                      <div class="col-lg-8">
                                        <div className="input-feedback-tik">
                                          Please enter the {e.attribute_name}
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                ) : null
                              ) : this.state.submit ? (
                                <div class="row">
                                  <div class="col-lg-4"></div>
                                  <div class="col-lg-8">
                                    <div className="input-feedback-tik">
                                      Please enter the {e.attribute_name}
                                    </div>
                                  </div>
                                </div>
                              ) : null}
                            </div>
                          );
                        }
                        if (e.dataType == "Boolean") {
                          return (
                            <div class="col-lg-6">
                              <div class="row">
                                <div class="col-lg-4">
                                  <h3
                                    style={{ marginTop: "13px" }}
                                    class="f-16 f-b"
                                  >
                                    {e.attribute_name}
                                  </h3>
                                </div>
                                <div class="col-lg-8">
                                  <form class="d-flex flex-wrap form-group">
                                    <div class="form-check-inline custom-control custom-checkbox">
                                      <input
                                        onChange={(event) =>
                                          this.handleChange(
                                            event,
                                            "attribute_name",
                                            index,
                                            e.attribute_name,
                                            e.dataType,
                                            e.default,
                                            "boolean"
                                          )
                                        }
                                        type="checkbox"
                                        class="custom-control-input"
                                        id={index}
                                        name="example1"
                                        // checked={
                                        //   this.state.attrVal[index] != undefined
                                        //     ? this.state.attrVal[index].value
                                        //     : false
                                        // }
                                      />
                                      <label
                                        class="custom-control-label f-m"
                                        for={index}
                                      ></label>
                                    </div>
                                  </form>
                                </div>
                              </div>
                              {/* {this.state.attrVal[index] != undefined ? (
                                this.state.attrVal[index].value == "" ? (
                                  <>
                                    <div class="row">
                                      <div class="col-lg-4"></div>
                                      <div class="col-lg-8">
                                        <div className="input-feedback-tik">
                                          Please enter the {e.attribute_name}
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                ) : null
                              ) : this.state.submit ? (
                                <div class="row">
                                  <div class="col-lg-4"></div>
                                  <div class="col-lg-8">
                                    <div className="input-feedback-tik">
                                      Please enter the {e.attribute_name}
                                    </div>
                                  </div>
                                </div>
                              ) : null} */}
                            </div>
                          );
                        }
                        if (e.dataType == "Text") {
                          return (
                            <div class="col-lg-6">
                              <div class="row">
                                <div class="col-lg-4">
                                  <h3
                                    style={{ marginTop: "10px" }}
                                    class="f-16 f-b"
                                  >
                                    {e.attribute_name}
                                  </h3>
                                </div>
                                <div class="col-lg-8">
                                  <form
                                    onSubmit={(e) => {
                                      e.preventDefault();
                                    }}
                                    class="form-group"
                                  >
                                    <input
                                      type="text"
                                      class="form-control f-16 px-3 py-2"
                                      placeholder={`Enter ${e.attribute_name}`}
                                      value={
                                        this.state.attrVal[index] != undefined
                                          ? this.state.attrVal[index].value
                                          : null
                                      }
                                      disabled
                                    />
                                  </form>
                                </div>
                              </div>
                              
                            </div>
                          );
                        }
                        if (e.dataType == "Number") {
                          return (
                            <div class="col-lg-6">
                              <div class="row">
                                <div class="col-lg-4">
                                  <h3
                                    style={{ marginTop: "10px" }}
                                    class="f-16 f-b"
                                  >
                                    {e.attribute_name}
                                  </h3>
                                </div>
                                <div class="col-lg-8">
                                  <form
                                    onSubmit={(e) => {
                                      e.preventDefault();
                                    }}
                                    class="form-group"
                                  >
                                    <input
                                      type="text"
                                      class="form-control f-16 px-3 py-2"
                                      placeholder={`Enter ${e.attribute_name}`}
                                      onChange={(event) =>
                                        this.handleChange(
                                          event,
                                          "attribute_name",
                                          index,
                                          e.attribute_name,
                                          e.dataType,
                                          e.default
                                        )
                                      }
                                    />
                                  </form>
                                </div>
                              </div>
                              {this.state.attrVal[index] != undefined ? (
                                this.state.attrVal[index].value == "" ? (
                                  <>
                                    <div class="row">
                                      <div class="col-lg-4"></div>
                                      <div class="col-lg-8">
                                        <div className="input-feedback-tik">
                                          Please enter the {e.attribute_name}
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                ) : !numberValidation.test(
                                    this.state.attrVal[index].value
                                  ) ? (
                                  <>
                                    <div class="row">
                                      <div class="col-lg-4"></div>
                                      <div class="col-lg-8">
                                        <div className="input-feedback-tik">
                                          Please enter the only number
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                ) : null
                              ) : this.state.submit ? (
                                <div class="row">
                                  <div class="col-lg-4"></div>
                                  <div class="col-lg-8">
                                    <div className="input-feedback-tik">
                                      Please enter the {e.attribute_name}
                                    </div>
                                  </div>
                                </div>
                              ) : null}
                            </div>
                          );
                        }
                        // if (e.datatype == "Boolean") {
                        //     return (
                        //       <div class="col-lg-6">
                        //         <div class="row">
                        //           <div class="col-lg-4">
                        //             <h3 class="f-16 f-b">{e.attribute_name}</h3>
                        //           </div>
                        //           <input
                        //                   type="checkbox"
                        //                   class="custom-control-input"
                        //                   id="customCheck11212"
                        //                   name="example1"
                        //                   checked={
                        //                     document != null
                        //                       ? document.update
                        //                       : false
                        //                   }
                        //                 />
                        //         </div>
                        //       </div>
                        //     );
                        //   }
                        if (e.dataType == "Date") {
                          return (
                            <div class="col-lg-6">
                              <div class="row">
                                <div class="col-lg-4">
                                  <h3
                                    style={{ marginTop: "6px" }}
                                    class="f-16 f-b"
                                  >
                                    {e.attribute_name}
                                  </h3>
                                </div>
                                <div class="col-lg-8">
                                  <form
                                    onSubmit={(e) => {
                                      e.preventDefault();
                                    }}
                                    class="form-group"
                                  >
                                    <DatePicker
                                      value={
                                        this.state.attrVal[index] != undefined
                                          ? this.state.attrVal[index].value
                                          : null
                                      }
                                      selected={  this.state.attrVal[index] != undefined
                                        ? moment(this.state.attrVal[index].value,"DD-MM-YYYY")._d
                                        : new Date()}
                                      onChange={(date) =>
                                        this.handleChange(
                                          date,
                                          "attribute_name",
                                          index,
                                          e.attribute_name,
                                          e.dataType,
                                          e.default,
                                          "date"
                                        )
                                      }
                                      placeholderText="DD/MM/YYYY"
                                      dateFormat="MM-dd-yyyy"
                                      //   disabled={this.props.btnchange ? false : true}
                                      className={
                                        "form-control f-14 w-70 float-left text-center py-1 dull datetimepicker1"
                                      }
                                      showMonthDropdown
                                      showYearDropdown
                                      dropdownMode="select"
                                      //   maxDate={addDays(new Date(), 0)}
                                      //   minDate={subYears(new Date(), 100)}
                                    />
                                    <label class="w-30">
                                      <button
                                        class="border-0 event-none ml-1"
                                        disabled=""
                                      >
                                        <img src={calander} />
                                      </button>
                                    </label>
                                  </form>
                                </div>
                              </div>
                              {this.state.attrVal[index] != undefined ? (
                                this.state.attrVal[index].value == "" ? (
                                  <>
                                    <div class="row">
                                      <div class="col-lg-4"></div>
                                      <div class="col-lg-8">
                                        <div className="input-feedback-tik">
                                          Please enter the {e.attribute_name}
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                ) : null
                              ) : this.state.submit ? (
                                <div class="row">
                                  <div class="col-lg-4"></div>
                                  <div class="col-lg-8">
                                    <div className="input-feedback-tik">
                                      Please enter the {e.attribute_name}
                                    </div>
                                  </div>
                                </div>
                              ) : null}
                            </div>
                          );
                        }
                        if (e.dataType == "Time") {
                          return (
                            <div class="col-lg-6">
                              <div class="row">
                                <div class="col-lg-4">
                                  <h3
                                    style={{ marginTop: "6px" }}
                                    class="f-16 f-b"
                                  >
                                    {e.attribute_name}
                                  </h3>
                                </div>
                                <div
                                  class="col-lg-8"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <form
                                    onSubmit={(e) => {
                                      e.preventDefault();
                                    }}
                                    class="form-group date"
                                  >
                                    <input
                                      onClick={() =>
                                        this.showTimeHandler(index)
                                      }
                                      type="text"
                                      class="timepicker form-control f-14 w-70 float-left text-center py-1 dull"
                                      id=""
                                      placeholder="00:00"
                                      value={
                                        this.state.attrVal[index] != undefined
                                          ? this.state.attrVal[index].value
                                          : ""
                                      }
                                    />
                                    {showTime && timeIndex == index && (
                                      <Timekeeper
                                        // onChange={(newTime) =>
                                        //   this.setTime(
                                        //     newTime.formatted12,
                                        //     index
                                        //   )
                                        // }
                                        time={this.state.attrVal[index] != undefined ? this.state.attrVal[index].value:'12:30am'}
                                        onChange={(newTime) =>
                                          this.handleChange(
                                            newTime.formatted12,
                                            "attribute_name",
                                            index,
                                            e.attribute_name,
                                            e.dataType,
                                            e.default
                                          )
                                        }
                                        onDoneClick={(newTime) => {
                                          this.showTimeCloseHandler();
                                          this.handleChange(
                                            newTime.formatted12,
                                            "attribute_name",
                                            index,
                                            e.attribute_name,
                                            e.dataType,
                                            e.default
                                          );
                                        }}
                                        switchToMinuteOnHourSelect
                                      />
                                    )}
                                    <label class="w-30">
                                      <button
                                        class="border-0 event-none ml-1"
                                        disabled=""
                                      >
                                        <img src={times} />
                                      </button>
                                    </label>
                                  </form>
                                </div>
                              </div>
                              {this.state.attrVal[index] != undefined ? (
                                this.state.attrVal[index].value == "" ? (
                                  <>
                                    <div class="row">
                                      <div class="col-lg-4"></div>
                                      <div class="col-lg-8">
                                        <div className="input-feedback-tik">
                                          Please enter the {e.attribute_name}
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                ) : null
                              ) : this.state.submit ? (
                                <div class="row">
                                  <div class="col-lg-4"></div>
                                  <div class="col-lg-8">
                                    <div className="input-feedback-tik">
                                      Please enter the {e.attribute_name}
                                    </div>
                                  </div>
                                </div>
                              ) : null}
                            </div>
                          );
                        }
                        if (e.dataType == "Qr") {
                          return (
                            <div class="col-lg-6">
                              <div class="row">
                                <div class="col-lg-4">
                                  <h3
                                    style={{ marginTop: "10px" }}
                                    class="f-16 f-b"
                                  >
                                    {e.attribute_name}
                                  </h3>
                                </div>
                                <div class="col-lg-8">
                                  <form
                                    onSubmit={(e) => {
                                      e.preventDefault();
                                    }}
                                    class="form-group"
                                  >
                                    <input
                                      type="text"
                                      class="form-control f-16 px-3 py-2"
                                      placeholder={`Enter ${e.attribute_name}`}
                                      onChange={(event) =>
                                        this.handleChange(
                                          event,
                                          "image_title",
                                          index,
                                          e.attribute_name,
                                          e.dataType,
                                          e.default
                                        )
                                      }
                                    />
                                  </form>
                                </div>
                              </div>
                              {this.state.imgList[index] != undefined ? (
                                this.state.imgList[index].value == "" ? (
                                  <>
                                    <div class="row">
                                      <div class="col-lg-4"></div>
                                      <div class="col-lg-8">
                                        <div className="input-feedback-tik">
                                          Please enter the {e.attribute_name}
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                ) : null
                              ) : this.state.submit ? (
                                <>
                                  <div class="row">
                                    <div class="col-lg-4"></div>
                                    <div class="col-lg-8">
                                      <div className="input-feedback-tik">
                                        Please enter the {e.attribute_name}
                                      </div>
                                    </div>
                                  </div>
                                </>
                              ) : null}
                            </div>
                          );
                        }
                        if (e.dataType == "Image") {
                          return (
                            <div class="col-lg-6">
                              <div class="row">
                                <div class="col-lg-4">
                                  <h3
                                    style={{ marginTop: "10px" }}
                                    class="f-16 f-b"
                                  >
                                    {e.attribute_name}
                                  </h3>
                                </div>
                                <div class="col-lg-8">
                                  <form
                                    onSubmit={(e) => {
                                      e.preventDefault();
                                    }}
                                  >
                                    <div class="custom-file">
                                      <input
                                        type="file"
                                        class="custom-file-input"
                                        id="customFile"
                                        onChange={(event) =>
                                          this.handleChange(
                                            event,
                                            "image_title",
                                            index,
                                            e.attribute_name,
                                            e.dataType,
                                            e.default
                                          )
                                        }
                                      />
                                      <label
                                        class="custom-file-label f-m"
                                      >
                                        {this.state.image[index] != undefined
                                          ? _.truncate(
                                              this.state.image[index].value,
                                              { length: 12 }
                                            )
                                          : "No file selected"}
                                      </label>
                                    </div>
                                  </form>
                                </div>
                              </div>
                              {this.state.image[index] != undefined ? (
                                (
                                  this.state.image[index].value == "" ? (
                                    <>
                                      <div class="row">
                                        <div class="col-lg-4"></div>
                                        <div class="col-lg-8">
                                          <div className="input-feedback-tik">
                                            Please enter the {e.attribute_name}
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  ) : (
                                    !this.state.image[index].value
                                      .split(".")
                                      .includes("jpg") &&
                                    !this.state.image[index].value
                                      .split(".")
                                      .includes("jpeg") &&
                                    !this.state.image[index].value
                                      .split(".")
                                      .includes("png")
                                  )
                                ) ? (
                                  <div class="row">
                                    <div class="col-lg-4"></div>
                                    <div class="col-lg-8">
                                      <div className="input-feedback-tik">
                                        Only jpg,jpeg,png files are supported
                                      </div>
                                    </div>
                                  </div>
                                ) : null
                              ) : this.state.submit ? (
                                <>
                                  <div class="row">
                                    <div class="col-lg-4"></div>
                                    <div class="col-lg-8">
                                      <div className="input-feedback-tik">
                                        Please enter the {e.attribute_name}
                                      </div>
                                    </div>
                                  </div>
                                </>
                              ) : null}
                            </div>
                          );
                        }
                      })}
                      {/* {sortedMain.map((e, index) => {
                       
                      })} */}
                    </div>
                  </div>
                  <hr />

                  <h3 class="f-20 f-b">Tee Details</h3>
                  <div class="container">
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="row">
                          <div class="col-lg-4">
                            <h3 class="f-16 f-b" style={{ marginTop: "12px" }}>
                              Email Address
                            </h3>
                          </div>
                          <div class="col-lg-8">
                            <form
                              onSubmit={(e) => {
                                e.preventDefault();
                              }}
                              class="form-group createDoc"
                            >
                              <CreatableSelect
                                isMulti
                                onChange={this.handleTeeChange}
                                options={this.state.teeDetail}
                              />
                            </form>
                          </div>
                        </div>

                        {this.state.submit ? (
                          this.state.reciverList != null ? (
                            this.state.reciverList.length == 0 ? (
                              <>
                                <div class="row">
                                  <div class="col-lg-4"></div>
                                  <div class="col-lg-8">
                                    <div className="input-feedback-tik">
                                      Please select the email
                                    </div>
                                  </div>
                                </div>
                              </>
                            ) : this.state.error ? (
                              <>
                                <div class="row">
                                  <div class="col-lg-4"></div>
                                  <div class="col-lg-8">
                                    <div className="input-feedback-tik">
                                      {this.state.errormessage}
                                    </div>
                                  </div>
                                </div>
                              </>
                            ) : null
                          ) : (
                            <>
                              <div class="row">
                                <div class="col-lg-4"></div>
                                <div class="col-lg-8">
                                  <div className="input-feedback-tik">
                                    Please select the email
                                  </div>
                                </div>
                              </div>
                            </>
                          )
                        ) : this.state.error ? (
                          <>
                            <div class="row">
                              <div class="col-lg-4"></div>
                              <div class="col-lg-8">
                                <div className="input-feedback-tik">
                                  {this.state.errormessage}
                                </div>
                              </div>
                            </div>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <hr />

                  <div class="row">
                    <div class="offset-lg-1 col-lg-10 mt-5">
                      <div class="offset-lg-2 col-lg-8 d-flex">
                        <a
                          onClick={() =>
                            this.props.history.push("/select-template")
                          }
                          class="btn btn-default m-1 w-100 f-b"
                        >
                          Previous
                        </a>
                        <a
                          onClick={this.applyLimit}
                          id=""
                          data-toggle="modal"
                          data-target="#successPublished"
                          class="btn btn-org m-1 w-100 f-b published"
                        >
                          {loader ? (
                            <i class="fa fa-refresh fa-spin"></i>
                          ) : (
                            "Publish"
                          )}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={
                this.state.showTicket
                  ? "col flex-grow-0 d-flex align-items-center justify-content-center rotate"
                  : "col flex-grow-0 d-flex align-items-center justify-content-center"
              }
            >
              <a
                onClick={this.ticketHandler}
                class="arrow-toggle text-center text-white btn btn-primary d-table"
              >
                <i class="f-24 fa fa-chevron-left d-table-cell vertical-align-m"></i>
              </a>
            </div>

            <div
              className={
                this.state.showTicket
                  ? "col-lg-3 col-md-4 mb-5 br-20 right-ticket"
                  : "col-lg-3 col-md-4 mb-5 br-20 right-ticket hide-right-panel"
              }
            >
              <div class="br-20 px-3 py-4 right-container">
                <div class="pr-0 min-fixHeight">
                  {this.state.imgList.map((e) => {
                    if (e.value != undefined) {
                      if (e.value != "" && e.default == true) {
                        return (
                          <>
                            <div class="px-3 py-4 border-dark br-20 first-box">
                              <div class="d-flex  flex-wrap justify-content-center flex-column">
                                <div className="d-flex justify-content-center flex-column align-items-center my-5">
                                  <QRCode
                                    value={e.value}
                                    size={128}
                                    bgColor={"#ffffff"}
                                    fgColor={"#000000"}
                                    includeMargin={false}
                                    renderAs={"svg"}
                                    imageSettings={{
                                      excavate: true,
                                    }}
                                  />
                                </div>
                                <div class="text-center d-flex justify-content-center align-items-center">
                                  <h3
                                    style={{ wordBreak: "break-all" }}
                                    class="f-26 f-b mr-3"
                                  >
                                    {e.name}
                                  </h3>
                                  <h3
                                    style={{ wordBreak: "break-all" }}
                                    class="f-26"
                                  >
                                    {e.value}
                                  </h3>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      }
                    }
                  })}

                  <div class="px-3 py-4 border-dark br-20 mt-2 second-box">
                    <div class=" justify-content-center">
                      {this.state.image != "" ? (
                        this.state.image.map((e) => {
                          if (e.default == true) {
                            return (
                              <img
                                style={{
                                  height: "132px",
                                  width: "132px",
                                }}
                                class="d-block mx-auto  mb-2 img-fluid"
                                src={
                                  e.image != ""
                                    ? URL.createObjectURL(e.image)
                                    : certi
                                }
                              />
                            );
                          }
                        })
                      ) : (
                        <img
                          style={{
                            height: "132px",
                            width: "132px",
                          }}
                          class="d-block mx-auto  mb-2 img-fluid"
                          src={certi}
                        />
                      )}

                      <div class="text-center d-flex justify-content-center align-items-center">
                        <h3 class="f-26 f-b ">
                          {templateDetail.template_type}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div class="px-3 py-4 border-dark br-20 mt-2">
                    <h4
                      class="f-24 f-m text-center"
                      // style={{ wordBreak: "break-all" }}
                    >
                      {this.props.templateDetail.template_name}
                    </h4>

                    {this.state.imgList.map((e) => {
                      if (e.value != undefined) {
                        if (e.value != "" && e.default == false) {
                          return (
                            <div className="d-flex justify-content-center flex-column align-items-center my-5">
                              <QRCode
                                value={e.value}
                                size={128}
                                bgColor={"#ffffff"}
                                fgColor={"#000000"}
                                includeMargin={false}
                                renderAs={"svg"}
                                imageSettings={{
                                  excavate: true,
                                }}
                              />
                            </div>
                          );
                        }
                      }
                    })}
                    {this.state.image.map((e) => {
                      if (e.default == false) {
                        return (
                          <>
                            <img
                              style={{
                                height: "132px",
                                width: "132px",
                              }}
                              class="my-5 mx-auto d-block"
                              src={URL.createObjectURL(e.image)}
                            />
                          </>
                        );
                      }
                    })}
                    {this.state.attrVal.map((e, index) => {
                      return (
                        <div class="d-flex flex-wrap">
                          <div class="col-sm-6">
                            <h3 class="f-16 f-b">{e.name}</h3>
                          </div>
                          <div class="col-sm-6">
                            <h3 class="f-16">
                              {e.value === true
                                ? "True"
                                : e.value === false
                                ? "False"
                                : e.value}
                            </h3>
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
        {showSuccess == true ? (
          <SuccessModal
            closePopup={this.closeSuccessPopup}
            history={this.props.history}
            message={message}
          />
        ) : null}
        {MobileViewPoppup == true ? (
          <MobileView
            closePopup={this.closeMobilePopup}
            history={this.props.history}
            attrVal={this.state.attrVal}
            image={this.state.image}
            imgList={this.state.imgList}
            templateDetail={this.props.templateDetail}
          />
        ) : null}
        {this.state.limitPopup == true ? (
          <Modal closePopup={this.closeLimitPopup}>
          <div class="modal-body pt-0 plr-100 pb-5">
            <h4 class="modal-title text-center f-20 f-m" id="">
              Your tik size more than tik limit,Please upgrade plan or extra charge apply on this tik if you continue
            </h4>
            <div class="d-flex logout-buttons">
              <Button
                type="button"
                buttonText="Upgrade"
                className="m-1 clear_button"
                onClick={() => this.props.history.push('/subscription')}
              />
              <Button
                type="button"
                buttonText="Continue"
                className="m-1"
                onClick={() => this.acceptLimit()}
              />
            </div>
          </div>
        </Modal>
        ):null}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  firstName: state.Profile.firstName,
  templateDetail: state.Template.templateDetail,
  metaData: state.Tik.metaData,
  reciverData: state.Tik.reciverData,
  createTikSuccess: state.Tik.createTikSuccess,
  error: state.Auth.error,
  document: state.Profile.document,
  saveDraftSuccess: state.Tik.saveDraftSuccess,
  roledocument: state.Profile.Roledocument,
  myPlan: state.Subscription.myPlan,
});

const mapDispatchToProps = (dispatch) => ({
  profile: (payload) => dispatch(actions.profileGetInfo(payload)),
  getTemplateDetail: (data) => dispatch(actions.getTemplateDetail(data)),
  createTikEdit: (data) => dispatch(actions.createTikEdit(data)),
  createTik: (payload) => dispatch(actions.createTik(payload)),
  reciverListInfo: () => dispatch(actions.reciverList()),
  errorClear: () => dispatch(actions.errorClear()),
  saveDraft: (payload) => dispatch(actions.saveDraft(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTik);
