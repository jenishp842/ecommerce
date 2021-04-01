import React, { Component } from "react";
import {
  ProfileDropdown,
  Notification,
  Modal,
  Button,
} from "../../component/index.jsx";
import { connect } from "react-redux";
import { Images } from "../../assets/images";
import * as actions from "../../actions";
import SuccessModal from "../../component/SuccessModal.jsx";
import Timekeeper from "react-timekeeper";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DraftMobileView from "./DraftMobileView.jsx";
import { toast } from "react-toastify";
import CreatableSelect from "react-select/creatable";
import _ from "lodash";
import { draftDetailSuccess } from "../../actions";
// import QRCode from 'react-qr-code';
import searcho from "../../assets/img/searcho.png";
import header_logo from "../../assets/img/logo.png";
import logom from "../../assets/img/logom.png";
import doc from "../../assets/img/doc.png";
import calander from"../../assets/img/cal.png";
import times from "../../assets/img/time.png";
import certi from "../../assets/img/certi.png";
var QRCode = require("qrcode.react");

class EditDraft extends Component {
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
      imageURL: "",
      coverImage: "",
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
      touch: false,
      isbase64: false,
      isChecked: false,
    };
    this.updateWidth = this.updateWidth.bind(this);
  }
  componentDidMount() {
    this.props.errorClear();
    const tempId = JSON.parse(localStorage.getItem("templateId"));
    const draftId = JSON.parse(localStorage.getItem("draftId"));
    if (draftId != null) {
      this.props.draftDtail({ Id: draftId });
      localStorage.setItem("isEditDraft", JSON.stringify(false));
    }
    this.props.profile();
    // this.props.getTemplateDetail({ templateId: tempId });
    this.props.reciverListInfo();
    // window.addEventListener("resize", this.updateWidth);
    localStorage.setItem("prevroute", JSON.stringify("editDraft"));
    // let previousdata = this.props.imgList;
    // this.props.imgListData.map((e) => {
    //   console.log("ppppppppppppppppppppppp", e);
    //   let data5 = previousdata[e.order - 1];
    //   let testObject = {
    //     ...data5,
    //     dataType: e.dataType,
    //     default: e.default,
    //     name: e.name,
    //     order: e.order.toString(),
    //     value: e.value,
    //   };
    //   previousdata[e.order - 1] = testObject;
    //   this.setState({ attrVal: previousdata });
    //   this.props.imgListEdit({ previousdata });
    // });
  }

  b64toBlob = (b64Data, contentType, sliceSize) => {
    contentType = contentType || "";
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  };

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
              dataType: e.datatype,
              default: e.defaultValue,
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
      this.setState({
        showSuccess: true,
        message: "Tik published successfully",
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
      //   this.setState({ teeDetail: teeObjectList });
      this.props.reciverDraft({ teeDetail: teeObjectList });
    }

    if (this.props.saveDraftSuccess != prevProps.saveDraftSuccess) {
      this.setState({
        showSuccess: true,
        message: "Draft saved sucessfully",
        loader: false,
      });
    }

    if (this.props.draftDetailSuccess != prevProps.draftDetailSuccess) {
      let previousdata = this.props.imgList;
      this.props.imgListData.map((e) => {
        if (e.dataType == "Image") {
          let data5 = previousdata[e.order - 1];
          let testObject = {
            ...data5,
            dataType: e.dataType,
            default: e.default,
            name: e.name,
            order: e.order.toString(),
            value: e.value,
            fileName: e.fileName,
          };
          previousdata[e.order - 1] = testObject;
          this.setState({ attrVal: previousdata });
          this.props.imgListEdit({ previousdata });
        } else {
          let data5 = previousdata[e.order - 1];
          let testObject = {
            ...data5,
            dataType: e.dataType,
            default: e.default,
            name: e.name,
            order: e.order.toString(),
            value: e.value,
          };
          previousdata[e.order - 1] = testObject;
          this.setState({ attrVal: previousdata });
          this.props.imgListEdit({ previousdata });
        }
      });
      let teeDraftObjectList = [];
      let teeDraftArrayList = [];
      console.log(
        "oooooooooooooooo",
        this.props.draftDetailSuccess.draftData.receiverList
      );
      this.props.draftDetailSuccess.draftData.receiverList.map((e) => {
        // console.log(e);
        teeDraftArrayList.push(e);
        const teeObject = {
          ...teeDraftArrayList,
          value: e,
          label: e,
        };
        // console.log(teeObject);
      });
      teeDraftArrayList.map((e) => {
        const teeObject = {
          value: e,
          label: e,
        };
        teeDraftObjectList.push(teeObject);
      });
      //   this.setState({ teeDetail: teeObjectList });
      this.props.reciverDraftEdit({ reciverList: teeDraftObjectList });
      this.props.getTemplateDetail({
        templateId: this.props.draftDetailSuccess.draftData.templateId,
        whiteList: true,
      });
      localStorage.setItem(
        "addMetaData",
        JSON.stringify(this.props.draftDetailSuccess.draftData.metaList)
      );
      localStorage.setItem(
        "templateId",
        JSON.stringify(this.props.draftDetailSuccess.draftData.templateId)
      );
      localStorage.setItem(
        "selectId",
        JSON.stringify(this.props.draftDetailSuccess.draftData.templateId)
      );
      this.props.addMetaData({
        metaData: this.props.draftDetailSuccess.draftData.metaList,
      });
    }
  }
  closeSuccessPopup = () => {
    this.setState({ showSuccess: false });
    this.props.history.push({
      pathname: "/docHistory",
      state: { detail: "Drafts" },
    });
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

  handleSubmit = () => {
    this.setState({ submit: true, touch: true });
    let images = [];
    let sortReciverList = [];
    let sortattrValCheck = [];
    let sortimgListCheck = [];
    let imageValueFilter = [];
    let sortImageFilter = [];
    let numberVali = [];
    let filterTemplateDetail;
    let blobArray = [];

    const { draftDetailSuccess, imageData } = this.props;
    filterTemplateDetail = this.props.templateDetail.attribute
    // filterTemplateDetail = this.props.templateDetail.attribute.filter(
    //   (e) => e.dataType != "Text"
    // );

    // const sortattrVal = this.state.attrVal.filter(
    //   (e) => Object.keys(e).length != 0
    // );
    const sortimgList = this.props.imgList.filter(
      (e) => e && Object.keys(e).length != 0
    );
    const sortimage = this.props.imageData.filter(
      (e) => e && Object.keys(e).length != 0
    );

    // sortattrVal.map((e) => {
    //   sortattrValCheck.push(e.value);
    // });
    sortimgList.map((e, i) => {
      if (e.dataType == "Image" && e.value == "") {
        let imageFilter = imageValueFilter;
        let data = imageFilter[i];
        const imageFilterObject = {
          ...data,
          dataType: e.dataType,
          default: e.default,
          name: e.name,
          order: e.order,
        };
        imageValueFilter.push(imageFilterObject);
      } else if (
        e.dataType == "Image" &&
        e.value != "" &&
        e.value.split(";")[1] != undefined
      ) {
        let imageFilter = imageValueFilter;
        let data = imageFilter[i];
        const imageFilterObject = {
          ...data,
          dataType: e.dataType,
          default: e.default,
          name: e.name,
          order: e.order,
        };
        imageValueFilter.push(imageFilterObject);

        let block = e.value.split(";");
        // Get the content type of the image
        let contentType = block[0].split(":")[1]; // In this case "image/gif"
        // get the real base64 content of the file
        let realData = block[1].split(",")[1]; // In this case "R0lGODlhPQBEAPeoAJosM...."

        // Convert it to a blob to upload
        let blob = this.b64toBlob(realData, contentType);

        blobArray.push(blob);
        this.setState({ isbase64: true });
      } else if (
        e.dataType == "Image" &&
        e.value != "" &&
        e.value.split(";")[1] == undefined
      ) {
        let imageFilter = imageValueFilter;
        let data = imageFilter[i];
        const imageFilterObject = {
          ...data,
          dataType: e.dataType,
          default: e.default,
          name: e.name,
          order: e.order,
          value: e.value,
        };
        imageValueFilter.push(imageFilterObject);
        this.setState({ isbase64: false });
      }
    });

    sortimgList.map((e) => {
      if (e.dataType == "Number") {
        numberVali.push(e.value);
      }
    });

    sortImageFilter = sortimgList.filter((e) => e.dataType != "Image");
    sortimgList.map((e) => {
      sortimgListCheck.push(e.value);
    });
    const tempId = JSON.parse(localStorage.getItem("templateId"));
    const addMeta = JSON.parse(localStorage.getItem("addMetaData"));

    const documentName = addMeta[0].value;
    const templateId = tempId;

    imageData.map((e) => {
      if (e != undefined) {
        images.push(e.image);
      }
    });
    if (this.props.reciverDraftList != null) {
      this.props.reciverDraftList.map((e) => {
        // console.log(e);
        sortReciverList.push(e.value);
      });
    }
    const concatAttr = sortImageFilter.concat(imageValueFilter);

    console.log(
      concatAttr,
      filterTemplateDetail,
      imageValueFilter,
      concatAttr.length === filterTemplateDetail.length,
      !sortImageFilter.includes(""),
      sortReciverList.length != 0,
      this.state.error == false
    );
    let concateImage = images.concat(blobArray);
    if (
      concatAttr.length === filterTemplateDetail.length &&
      !sortImageFilter.includes("") &&
      sortReciverList.length != 0 &&
      this.state.error == false &&
      /^[0-9]*$/i.test(numberVali)
    ) {
      this.setState({ loader: true });
      this.props.createTik({
        documentName: addMeta[0].value,
        templateId,
        metaData: addMeta,
        sortattrVal: concatAttr,
        sortimgList,
        images: this.state.isbase64 ? concateImage : images,
        receiverList: sortReciverList,
      });
    }
  };
  saveDraft = () => {
    const tempId = JSON.parse(localStorage.getItem("templateId"));
    this.setState({ isChecked: true });
    let images = [];
    let sortReciverList = [];
    let sortattrValCheck = [];
    let sortimgListCheck = [];
    let imageValueFilter = [];
    let sortImageFilter = [];
    let numberVali = [];
    let filterTemplateDetail;
    let blobArray = [];

    const {
      draftDetailSuccess,
      imageData,
      metaData,
      templateDetail,
    } = this.props;
    let isEditDraft = JSON.parse(localStorage.getItem("isEditDraft"));
    let draftDetailId = draftDetailSuccess.draftData._id;
    filterTemplateDetail = draftDetailSuccess.templateDetails.attribute.filter(
      (e) => e.dataType != "Text"
    );

    // const sortattrVal = this.state.attrVal.filter(
    //   (e) => Object.keys(e).length != 0
    // );
    const sortimgList = this.props.imgList.filter(
      (e) => e && Object.keys(e).length != 0
    );
    const sortimage = this.props.imageData.filter(
      (e) => e && Object.keys(e).length != 0
    );

    // sortattrVal.map((e) => {
    //   sortattrValCheck.push(e.value);
    // });
    sortimgList.map((e, i) => {
      if (e.dataType == "Image" && e.value == "") {
        let imageFilter = imageValueFilter;
        let data = imageFilter[i];
        const imageFilterObject = {
          ...data,
          dataType: e.dataType,
          default: e.default,
          name: e.name,
          order: e.order,
        };
        imageValueFilter.push(imageFilterObject);
      } else if (
        e.dataType == "Image" &&
        e.value != "" &&
        e.value.split(";")[1] != undefined
      ) {
        let imageFilter = imageValueFilter;
        let data = imageFilter[i];
        const imageFilterObject = {
          ...data,
          dataType: e.dataType,
          default: e.default,
          name: e.name,
          order: e.order,
        };
        imageValueFilter.push(imageFilterObject);

        let block = e.value.split(";");
        // Get the content type of the image
        let contentType = block[0].split(":")[1]; // In this case "image/gif"
        // get the real base64 content of the file
        let realData = block[1].split(",")[1]; // In this case "R0lGODlhPQBEAPeoAJosM...."

        // Convert it to a blob to upload
        let blob = this.b64toBlob(realData, contentType);
        blobArray.push(blob);
        this.setState({ isbase64: true });
      } else {
        let imageFilter = imageValueFilter;
        let data = imageFilter[i];
        const imageFilterObject = {
          ...data,
          dataType: e.dataType,
          default: e.default,
          name: e.name,
          order: e.order,
          value: e.value,
        };
        imageValueFilter.push(imageFilterObject);
        this.setState({ isbase64: false });
      }
    });

    sortimgList.map((e) => {
      if (e.dataType == "Number") {
        numberVali.push(e.value);
      }
    });

    sortImageFilter = sortimgList.filter((e) => e.dataType != "Image");
    sortimgList.map((e) => {
      sortimgListCheck.push(e.value);
    });
    const addMeta = JSON.parse(localStorage.getItem("addMetaData"));
    const documentName = addMeta[0].value;
    const templateId = tempId;

    imageData.map((e) => {
      if (e != undefined) {
        images.push(e.image);
      }
    });
    if (this.props.reciverDraftList != null) {
      this.props.reciverDraftList.map((e) => {
        // console.log(e);
        sortReciverList.push(e.value);
      });
    }
    const concatAttr = sortImageFilter.concat(imageValueFilter);
    console.log(
      imageValueFilter,
      concatAttr.length,
      filterTemplateDetail.length,
      concatAttr.length === filterTemplateDetail.length,
      !sortImageFilter.includes(""),
      sortReciverList.length != 0,
      this.state.error == false
    );
    console.log(blobArray);
    let concateImage = images.concat(blobArray);
    console.log("aaaaaaaaaaaa", concateImage);

    this.setState({ loader: true });
    this.props.saveDraft({
      documentName: addMeta[0].value,
      templateId: tempId,
      metaData: addMeta,
      sortattrVal: concatAttr,
      sortimgList,
      images: this.state.isbase64 ? concateImage : images,
      receiverList: sortReciverList,
      removeDraftId: isEditDraft ? "" : draftDetailId,
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
    this.setState({ touch: true });
    if (value == "attribute_name") {
      let previousdata = this.props.imgList;
      let livePreview = this.state.livepreview;

      let data = previousdata[index];
      let previewData = livePreview[index];
      const object = {
        ...data,
        name: name,
        value:
          e.target != undefined
            ? date == "boolean"
              ? e.target.checked.toString()
              : e.target.value
            : date == "date"
            ? ("0" + new Date(e).getDate()).slice(-2) +
              "-" +
              ("0" + (new Date(e).getMonth() + 1)).slice(-2) +
              "-" +
              e.getFullYear()
            : e,
        order: (index + 1).toString(),
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
            ? ("0" + new Date(e).getDate()).slice(-2) +
              "-" +
              ("0" + (new Date(e).getMonth() + 1)).slice(-2) +
              "-" +
              e.getFullYear()
            : e,
        order: index + 1,
      };
      previousdata[index] = object;
      livePreview[index] = previewObject;

      //   this.setState({
      //     attrVal: previousdata,
      //     livepreview: livePreview,
      //   });
      this.props.imgListEdit({ previousdata });
    }
    if (value == "image_title") {
      if (e.target.files == undefined) {
        let previousdata = this.props.imgList;

        let data = previousdata[index];
        const object = {
          ...data,
          name: name,
          value: e.target.value,
          order: (index + 1).toString(),
          dataType: datatype,
          default: defaultValue,
        };

        previousdata[index] = object;
        this.props.imgListEdit({ previousdata });
      } else {
        if (
          e.target.files[0].name.split(".").includes("jpg") ||
          e.target.files[0].name.split(".").includes("jpeg") ||
          e.target.files[0].name.split(".").includes("png")
        ) {
          let previousdata = this.props.imgList;
          let previousdata2 = this.props.imageData;

          let data = previousdata[index];
          let data2 = previousdata2[index];

          const object = {
            ...data,
            name: name,
            order: (index + 1).toString(),
            dataType: datatype,
            default: defaultValue,
            value: "",
          };
          const object2 = {
            ...data2,
            name: name,
            image: e.target.files[0],
            order: (index + 1).toString(),
            default: defaultValue,
            value: e.target.files[0].name,
          };
          previousdata[index] = object;
          previousdata2[index] = object2;

          this.setState({
            imgList: previousdata,
            image: previousdata2,
          });
          this.props.imgListEdit({ previousdata });
          this.props.imageEdit({ previousdata2 });
        } else {
          toast.error("Only jpg,jpeg and png files are supported");
        }
      }
    }
  };
  handleTeeChange = (e) => {
    console.log(e);
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
          // this.setState({
          //   reciverList: e,
          // });
          this.props.reciverDraftEdit({ reciverList: e });
        }
      }
    } else {
      this.props.reciverDraftEdit({ reciverList: e });
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
    console.log(this.props.imageDate,this.props.imgList)
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
      isChecked,
    } = this.state;

    const {
      templateDetail,
      metaData,
      reciverData,
      draftDetailSuccess,
    } = this.props;
    let numberValidation = /^[0-9]*$/i;
    // const sortattrVal = attrVal.filter((e) => Object.keys(e).length != 0);
    // const sortimgList = this.props.imgList.filter((e) => Object.keys(e).length != 0 && Object.keys(e) != undefined );
    // const sortimage = this.props.imageData.filter((e) => Object.keys(e).length != 0);
    // let localMetaData = JSON.parse(localStorage.getItem("addMetaData"));
    // console.log("before sort", imgList);
    // console.log("after sort", sortattrVal, sortimgList, sortimage);
    // console.log("concat", sortattrVal.concat(sortimgList), sortimage);
    // console.log("tee detail", this.props.error);
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
  
    // console.log(_.findIndex(this.props.imgList, ["order", "1"]));

 

    return (
      <>
        <nav className="navbar beforel navbar-expand-md py-1">
          <a
            class="navbar-brand"
            onClick={() => this.props.history.push("/dashboard")}
          >
            <img class="big img-fluid" src={header_logo} />
            <img class="mini img-fluid" src={logom} />
          </a>
          <ul className="nav navbar-top-links navbar-right">
            <li className="ml-2 mr-2">
              <a
                className="btn p-0"
                data-toggle="modal"
                data-target="#searchmodal"
              >
                <img className src={searcho} />
                {/* <i className="fas fa-search"></i> */}
              </a>
            </li>
            <li className="ml-2 mr-2">
              {this.props.document == null ? (
                <li className="ml-2 mr-2">
                  <a
                    onClick={() => {
                      this.props.history.push("/add-metadata");
                      localStorage.setItem(
                        "prevroute",
                        JSON.stringify("create-tik")
                      );
                      localStorage.removeItem("addMetaData");
                      this.props.createTikEdit({ metaData: [] });
                      localStorage.removeItem("selectId");
                    }}
                    className="btn-border org-border br-6 d-flex p-2"
                  >
                    <img className src={doc} />
                    <h4
                      style={{ fontSize: "14px", marginTop: "5px" }}
                      className="txt-org f-m ml-2 mb-0 newDoc"
                    >
                      Create New Tik
                    </h4>
                  </a>
                </li>
              ) : this.props.roledocument != undefined ? (
                this.props.document.create || this.props.roledocument.create ? (
                  <a
                    onClick={() => {
                      this.props.history.push("/add-metadata");
                      localStorage.setItem(
                        "prevroute",
                        JSON.stringify("create-tik")
                      );
                      localStorage.removeItem("addMetaData");
                    }}
                    className="btn-border org-border br-6 d-flex p-2"
                  >
                    <img className src={doc} />
                    <h4
                      style={{ fontSize: "14px", marginTop: "5px" }}
                      className="txt-org f-m ml-2 mb-0 newDoc"
                    >
                      Create New Tik
                    </h4>
                  </a>
                ) : null
              ) : null}
            </li>
            <li className="dropdown mx-2">
              <a
                className="dropdown-toggle count-info px-0"
                data-toggle="dropdown"
                onClick={() => this.showNotification()}
              >
                <i className="fa fa-bell f-26"></i>{" "}
                <span className="label label-primary">8</span>
              </a>
              {showNotification === true ? <Notification /> : null}
            </li>

            <li className="ml-2">
              <ProfileDropdown logout={this.logoutHandler} />
            </li>
          </ul>
        </nav>
        {logout ? (
          <Modal closePopup={this.closeLogoutPopup}>
            <div class="modal-body pt-0 plr-100 pb-5">
              <h4 class="modal-title text-center f-20 f-m" id="">
                Are you sure you want to log out?
              </h4>
              <div class="d-flex logout-buttons">
                <Button
                  type="button"
                  buttonText="No"
                  className="m-1 clear_button"
                  onClick={() => this.closeLogoutPopup()}
                />
                <Button
                  type="button"
                  buttonText={"Yes"}
                  className="m-1"
                  onClick={() => this.logout()}
                />
              </div>
            </div>
          </Modal>
        ) : (
          ""
        )}
        <div id="content" class="container-fluid my-5 createDoc">
          <div class="row">
            <div class="col-md-12 d-flex align-items-center f-m">
              <h1
                className="text-center txt-blk mb-4 f-b"
                style={{ width: "69%" }}
              >
                Edit Draft
              </h1>
              <a
                onClick={this.saveDraft}
                style={{ whiteSpace: "nowrap" }}
                className={
                  isChecked
                    ? "disabled btn btn-primary f-16 mView-btn saveDraft m-1"
                    : "btn btn-primary f-16 mView-btn saveDraft m-1"
                }
              >
                Save
              </a>
              <a
                onClick={this.showMobileView}
                class="btn btn-primary f-16"
                style={{ whiteSpace: "nowrap" }}
                data-toggle="modal"
                data-target="#mView"
              >
                Mobile Preview{" "}
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
                      {this.props.draftDetailSuccess &&
                        this.props.draftDetailSuccess.draftData.metaList.map(
                          (e) => {
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
                          }
                        )}
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
                            <h3 class="f-16">
                              {this.props.draftDetailSuccess &&
                                this.props.draftDetailSuccess.templateDetails
                                  .template_name}
                            </h3>
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
                              {this.props.draftDetailSuccess &&
                              this.props.draftDetailSuccess.templateDetails
                                .attribute != undefined
                                ? this.props.draftDetailSuccess.templateDetails
                                    .attribute.length
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
                            <h3 class="f-16">
                              {this.props.draftDetailSuccess &&
                                this.props.draftDetailSuccess.templateDetails
                                  .template_type}
                            </h3>
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
                              {this.props.draftDetailSuccess &&
                              this.props.draftDetailSuccess.templateDetails
                                .isAcceptanceDocument
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
                                        this.props.imgList &&
                                        this.props.imgList[
                                          _.findIndex(this.props.imgList, [
                                            "order",
                                            e.order.toString(),
                                          ])
                                        ] != undefined
                                          ? this.props.imgList[
                                              _.findIndex(this.props.imgList, [
                                                "order",
                                                e.order.toString(),
                                              ])
                                            ].value
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
                              {this.state.touch &&
                              this.props.imgList[
                                _.findIndex(this.props.imgList, [
                                  "order",
                                  e.order.toString(),
                                ])
                              ] != undefined ? (
                                this.props.imgList[
                                  _.findIndex(this.props.imgList, [
                                    "order",
                                    e.order.toString(),
                                  ])
                                ].value == "" ? (
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
                                    style={{ marginTop: "3px" }}
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
                                        checked={
                                          this.props.imgList &&
                                          this.props.imgList[
                                            _.findIndex(this.props.imgList, [
                                              "order",
                                              e.order.toString(),
                                            ])
                                          ] != undefined
                                            ? this.props.imgList[
                                                _.findIndex(
                                                  this.props.imgList,
                                                  ["order", e.order.toString()]
                                                )
                                              ].value == "false"
                                              ? false
                                              : true
                                            : false
                                        }
                                      />
                                      <label
                                        class="custom-control-label f-m"
                                        for={index}
                                      ></label>
                                    </div>
                                  </form>
                                </div>
                              </div>
                              {this.props.imgList[
                                _.findIndex(this.props.imgList, [
                                  "order",
                                  e.order.toString(),
                                ])
                              ] != undefined ? (
                                this.props.imgList[
                                  _.findIndex(this.props.imgList, [
                                    "order",
                                    e.order.toString(),
                                  ])
                                ].value == "" ? (
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
                                      value={
                                        this.props.imgList &&
                                        this.props.imgList[
                                          _.findIndex(this.props.imgList, [
                                            "order",
                                            e.order.toString(),
                                          ])
                                        ] != undefined
                                          ? this.props.imgList[
                                              _.findIndex(this.props.imgList, [
                                                "order",
                                                e.order.toString(),
                                              ])
                                            ].value
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
                              {this.state.touch &&
                              this.props.imgList[
                                _.findIndex(this.props.imgList, [
                                  "order",
                                  e.order.toString(),
                                ])
                              ] != undefined ? (
                                this.props.imgList[
                                  _.findIndex(this.props.imgList, [
                                    "order",
                                    e.order.toString(),
                                  ])
                                ].value == "" ? (
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
                                    parseInt(
                                      this.props.imgList[
                                        _.findIndex(this.props.imgList, [
                                          "order",
                                          e.order.toString(),
                                        ])
                                      ].value
                                    )
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
                                        this.props.imgList &&
                                        this.props.imgList[
                                          _.findIndex(this.props.imgList, [
                                            "order",
                                            e.order.toString(),
                                          ])
                                        ] != undefined
                                          ? this.props.imgList[
                                              _.findIndex(this.props.imgList, [
                                                "order",
                                                e.order.toString(),
                                              ])
                                            ].value
                                          : null
                                      }
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
                              {this.props.imgList &&
                              this.props.imgList[
                                _.findIndex(this.props.imgList, [
                                  "order",
                                  e.order.toString(),
                                ])
                              ] != undefined ? (
                                this.props.imgList[
                                  _.findIndex(this.props.imgList, [
                                    "order",
                                    e.order.toString(),
                                  ])
                                ].value == "" ? (
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
                                        this.props.imgList &&
                                        this.props.imgList[
                                          _.findIndex(this.props.imgList, [
                                            "order",
                                            e.order.toString(),
                                          ])
                                        ] != undefined
                                          ? this.props.imgList[
                                              _.findIndex(this.props.imgList, [
                                                "order",
                                                e.order.toString(),
                                              ])
                                            ].value
                                          : null
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
                                        onDoneClick={() =>
                                          this.showTimeCloseHandler()
                                        }
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
                              {this.props.imgList[
                                _.findIndex(this.props.imgList, [
                                  "order",
                                  e.order.toString(),
                                ])
                              ] != undefined ? (
                                this.props.imgList[
                                  _.findIndex(this.props.imgList, [
                                    "order",
                                    e.order.toString(),
                                  ])
                                ].value == "" ? (
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
                                      value={
                                        this.props.imgList &&
                                        this.props.imgList[
                                          _.findIndex(this.props.imgList, [
                                            "order",
                                            e.order.toString(),
                                          ])
                                        ] != undefined
                                          ? this.props.imgList[
                                              _.findIndex(this.props.imgList, [
                                                "order",
                                                e.order.toString(),
                                              ])
                                            ].value
                                          : null
                                      }
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
                              {this.state.touch &&
                              this.props.imgList[
                                _.findIndex(this.props.imgList, [
                                  "order",
                                  e.order.toString(),
                                ])
                              ] != undefined ? (
                                this.props.imgList[
                                  _.findIndex(this.props.imgList, [
                                    "order",
                                    e.order.toString(),
                                  ])
                                ].value == "" ? (
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
                                        for="customFile"
                                      >
                                        {this.props.imageData[
                                          _.findIndex(this.props.imageData, [
                                            "order",
                                            e.order.toString(),
                                          ])
                                        ] != undefined
                                          ? _.truncate(
                                              this.props.imageData[
                                                _.findIndex(
                                                  this.props.imageData,
                                                  ["order", e.order.toString()]
                                                )
                                              ].value,
                                              { length: 12 }
                                            )
                                          : this.props.imgList[
                                              _.findIndex(this.props.imgList, [
                                                "order",
                                                e.order.toString(),
                                              ])
                                            ] != undefined
                                          ? _.truncate(
                                              this.props.imgList[
                                                _.findIndex(
                                                  this.props.imgList,
                                                  ["order", e.order.toString()]
                                                )
                                              ].fileName,
                                              { length: 12 }
                                            )
                                          : "No file selected"}
                                      </label>
                                    </div>
                                  </form>
                                </div>
                              </div>
                              {this.props.imgList[index] != undefined ? (
                                (
                                  this.props.imgList[index].value == "" &&
                                  (this.props.imageData[index] != undefined
                                    ? this.props.imageData[index].value == ""
                                    : true) ? (
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
                                    this.props.imageData[index] &&
                                    !this.props.imageData[index].value
                                      .split(".")
                                      .includes("jpg") &&
                                    !this.props.imageData[index].value
                                      .split(".")
                                      .includes("jpeg") &&
                                    !this.props.imageData[index].value
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
                                options={this.props.reciverList}
                                value={this.props.reciverDraftList}
                              />
                            </form>
                          </div>
                        </div>

                        {this.state.submit ? (
                          this.props.reciverDraftList != null ? (
                            this.props.reciverDraftList.length == 0 ? (
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
                          onClick={this.handleSubmit}
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
                  {this.props.imgList.map((e) => {
                    if (e != undefined) {
                      if (
                        e.value != "" &&
                        e.default == true &&
                        e.dataType == "Qr"
                      ) {
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
                      {/* {this.state.image != '' ? this.props.imgList.map((e) => {
                        console.log('edit draft',e)
                        if (e.default == true) {
                          return (
                            <img
                              style={{
                                height: "132px",
                                width: "132px",
                              }}
                              class="d-block mx-auto  mb-2 img-fluid"
                              src={e.image != '' ? URL.createObjectURL(e.image): certi}
                            />
                          );
                        }
                      }): <img
                      style={{
                        height: "132px",
                        width: "132px",
                      }}
                      class="d-block mx-auto  mb-2 img-fluid"
                      src={certi}
                    />} */}
    
                    {this.props.imageData == undefined ? this.props.imgList.map((e) => {
                      if (e != undefined) {
                        if (
                          e.default == true &&
                          e.dataType == "Image" &&
                          e.value != ""
                        ) {
                          return (
                            <img
                              style={{
                                height: "132px",
                                width: "132px",
                              }}
                              class="d-block mx-auto  mb-2 img-fluid"
                              src={e.value != '' ? e.value:certi}
                            />
                          );
                        }
                      }else{
                        return <img
                        style={{
                          height: "132px",
                          width: "132px",
                        }}
                        class="d-block mx-auto  mb-2 img-fluid"
                        src={certi}
                      />
                      }
                    }):this.props.imageData.map((e) => {
                      if (e != undefined) {
                        if (e.default == true) {
                          return (
                            <img
                              style={{
                                height: "132px",
                                width: "132px",
                              }}
                              class="d-block mx-auto  mb-2 img-fluid"
                              src={URL.createObjectURL(e.image)}
                            />
                          );
                        }
                      }
                    })
                  }

                    {/* {this.props.imageData.map((e) => {
                      if (e != undefined) {
                        if (e.default == true) {
                          console.log("image", e);
                          return (
                            <img
                              style={{
                                height: "132px",
                                width: "132px",
                              }}
                              class="d-block mx-auto  mb-2 img-fluid"
                              src={URL.createObjectURL(e.image)}
                            />
                          );
                        }
                      }
                    })} */}
                 
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
                      style={{ wordBreak: "break-all" }}
                    >
                      {this.props.templateDetail.template_name}
                    </h4>

                    {this.props.imgList.map((e) => {
                      if (e != undefined) {
                        if (
                          e.value != "" &&
                          e.default == false &&
                          e.dataType == "Qr"
                        ) {
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
                    {this.props.imgList.map((e) => {
                      if (e != undefined) {
                        if (
                          e.default == false &&
                          e.dataType == "Image" &&
                          e.value != ""
                        ) {
                          return (
                            <img
                              style={{
                                height: "132px",
                                width: "132px",
                              }}
                              class="d-block mx-auto  mb-2 img-fluid"
                              src={e.value}
                            />
                          );
                        }
                      }
                    })}

                    {this.props.imageData.map((e) => {
                      if (e != undefined) {
                        if (e.default == false) {
                          return (
                            <img
                              style={{
                                height: "132px",
                                width: "132px",
                              }}
                              class="d-block mx-auto  mb-2 img-fluid"
                              src={URL.createObjectURL(e.image)}
                            />
                          );
                        }
                      }
                    })}
                    {this.props.imgList.map((e, index) => {
                      if (e != undefined) {
                        if (e.dataType != "Image") {
                          return (
                            <div class="d-flex flex-wrap">
                              <div class="col-sm-4">
                                <h3 class="f-16 f-b">{e.name}</h3>
                              </div>
                              <div class="col-sm-8">
                                <h3 class="f-16">
                                  {e.value == true && e.value != ""
                                    ? "True"
                                    : e.value == false && e.value != ""
                                    ? "False"
                                    : e.value}
                                </h3>
                              </div>
                            </div>
                          );
                        }
                      }
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
          <DraftMobileView
            closePopup={this.closeMobilePopup}
            history={this.props.history}
            imageData={this.props.imageData}
            imgList={this.props.imgList}
            draft={this.props.draftDetailSuccess}
          />
        ) : null}
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
  roledocument: state.Profile.Roledocument,
  draftDetailSuccess: state.Tik.draftDetailSuccess,
  imgList: state.Tik.imgList,
  imageData: state.Tik.image,
  imgListData: state.Tik.imgListData,
  reciverList: state.Tik.reciverList,
  reciverDraftList: state.Tik.reciverDraftList,
  saveDraftSuccess: state.Tik.saveDraftSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  profile: (payload) => dispatch(actions.profileGetInfo(payload)),
  getTemplateDetail: (data) => dispatch(actions.getTemplateDetail(data)),
  createTikEdit: (data) => dispatch(actions.createTikEdit(data)),
  createTik: (payload) => dispatch(actions.createTik(payload)),
  reciverListInfo: () => dispatch(actions.reciverList()),
  errorClear: () => dispatch(actions.errorClear()),
  saveDraft: (payload) => dispatch(actions.saveDraft(payload)),
  imgListEdit: (payload) => dispatch(actions.imgListEdit(payload)),
  imageEdit: (payload) => dispatch(actions.imageEdit(payload)),
  reciverDraft: (payload) => dispatch(actions.reciverDraft(payload)),
  reciverDraftEdit: (payload) => dispatch(actions.reciverDraftEdit(payload)),
  draftDtail: (data) => dispatch(actions.draftDtail(data)),
  addMetaData: (data) => dispatch(actions.addMetaData(data)),
  createTikEdit: (data) => dispatch(actions.createTikEdit(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditDraft);
