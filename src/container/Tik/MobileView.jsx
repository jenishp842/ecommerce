/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";
import { Modal } from "../../component/index.jsx";
import close from "../../assets/img/close.png";
import mb1 from "../../assets/img/mb1.png";
import certi from "../../assets/img/certi.png";

var QRCode = require("qrcode.react");

const options = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

class MobileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
    };
  }

  render() {
    const { closePopup } = this.props;
    return (
      <>
        <div
          className="modal fade show"
          id="twoFactor"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="twoFactorTitle"
          aria-hidden="true"
          style={{ zIndex: 1, overflowY: "auto", overflowX: "hidden" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content" style={{height: '850px'}}>
              <div className="modal-header ">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={closePopup}
                >
                  <img src={close} />
                </button>
              </div>

              <div class="modal-body pt-0 plr-100 pb-5 iframe-container">
                <img
                  class="mx-auto my-0 d-block width-auto mobile"
                  src={mb1}
                />
                {/* <iframe
                  id="myiFrame"
                  src="http://18.222.151.29/create-tik"
                ></iframe> */}
                <div class="mb-5 br-20 right-ticket">
                  <div class=" right-container">
                    <div class="pr-0 min-fixHeight">
                
                          {/* <!-- <img class="my-5 mx-auto d-block qr-img" src="images/qr.png" /> --> */}
                          {this.props.imgList.map((e) => {
                        if (e.value != undefined) {
                          if (e.value != "" && e.default == true) {
                            return (
                              <div class="px-3 py-4 border-dark br-20 first-box">
                              <div class="d-flex  flex-wrap flex-column justify-content-center">
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
                            );
                          }
                        }
                      })}
                      
                     
                      <div class="px-3 py-4 border-dark br-20 mt-2 second-box">
                        <div class=" justify-content-center">
                        {this.props.image != '' ? this.props.image.map((e) => {
                        if(e.default == true){
                          return <img
                          style={{
                            height: "132px",
                            width: "132px",
                          }}
                          class="d-block mx-auto  mb-2 img-fluid"
                          src={URL.createObjectURL(e.image)}
                        />
                        }
                      }): <img
                      style={{
                        height: "132px",
                        width: "132px",
                      }}
                      class="d-block mx-auto  mb-2 img-fluid"
                      src={certi}
                    />}
                          <div class="text-center justify-content-center align-items-center">
                            <h3 class="f-26 f-b ">
                              {" "}
                              {this.props.templateDetail.template_type}
                            </h3>
                            {/* <!-- <h3 class="f-20">00</h3> --> */}
                          </div>
                        </div>
                      </div>
                      <div class="px-3 py-4 border-dark br-20 mt-2 third-box">
                        <h4 class="f-24 f-m text-center" style={{wordBreak:'break-all'}}>
                          {this.props.templateDetail.template_name}
                        </h4>
                        {/* <!-- <img class="d-block mx-auto tik-logo mb-2 img-fluid" src="images/certificate.png" /> --> */}
                        {/* <img class="d-block mx-auto tik-logo  my-5 img-fluid" src={Images.certificate} /> */}
                        {this.props.imgList.map((e) => {
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
                        {this.props.image.map((e) => {
                         if(e.default == false){
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
                        {this.props.attrVal.map((e, index) => {
                          return (
                            <div class="d-flex flex-wrap">
                              <div class="col-sm-6">
                                <h3 class="f-16 f-b">{e.name}</h3>
                              </div>
                              <div class="col-sm-6">
                                <h3 class="f-16">
                                  {e.value == true
                                    ? "True"
                                    : e.value == false
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
              {/* <a href="#" type="button" className="btn btn-primary w-100 f-18 f-b" onClick={this.handleLogin}>Log In</a> */}
            </div>
          </div>
        </div>

        <div className="modal-backdrop fade show" style={{ zIndex: 0 }}></div>
      </>
    );
  }
}

export default MobileView;
