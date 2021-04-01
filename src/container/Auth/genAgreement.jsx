import React, { Component } from "react";
import { Header } from "../../component/index.jsx";
import DocModal from "../../container/Auth/DocVerificationModal.jsx";
import * as actions from "../../actions";
import { connect } from "react-redux";

class GenAgreement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popupFlag: false,
      isChecked: false
    };
  }
  handleSubmit = () => {
    this.setState({ popupFlag: true });
  };
  onChangeCheckbox = (event) => {
    this.setState({
      isChecked: event.target.checked,
    });
  };
  render() {
    const { isChecked, popupFlag } = this.state
    return (
      <>
        <Header />
        <div id="content" className="container my-5">
          <div className="row">
            <div className="offset-lg-2 col-lg-8 col-md-12 d-flex align-items-center justify-content-center flex-column f-m">
              <h1 className="text-center txt-blk mb-5 f-b">
                Welcome to DocTrace
              </h1>
            </div>
            <div className="offset-lg-2 col-lg-8 box-shd br-20">
              <h4 className="f-24 text-center mt-5 mb-4 f-b">
                General Agreement
              </h4>
              <div className="px-4 l-32 mb-5 f-m fixHeight">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  eget ornare lacus. Donec commodo justo ipsum, non gravida
                  tellus vestibulum vestibulum. Proin diam ex, placerat eget
                  convallis a, commodo euismod nibh. Pellentesque ullamcorper
                  porttitor varius. Ut at nisi imperdiet, euismod sem sit amet
                  fermentum est.
                  <br /> Donec interdum, enim eget elementum rhoncus, tortor
                  ligula ultricies erat, eu scelerisque odio leo eu sem. Nunc
                  eget justo tincidunt, tristique nisl at, malesuada eros.
                  Curabitur sodales luctus dui, vestibulum elementum metus
                  scelerisque sed. Nam lacinia tempor ante vel viverra.
                  Suspendisse tempus nisi quis augue pretium pharetra. Nulla
                  imperdiet posuere cursus. Proin quis scelerisque est. Proin
                  dapibus turpis ac ligula semper lobortis.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  eget ornare lacus. Donec commodo justo ipsum, non gravida
                  tellus vestibulum vestibulum. Proin diam ex, placerat eget
                  convallis a, commodo euismod nibh. Pellentesque ullamcorper
                  porttitor varius. Ut at nisi imperdiet, euismod sem sit amet
                  fermentum est.
                  <br /> Donec interdum, enim eget elementum rhoncus, tortor
                  ligula ultricies erat, eu scelerisque odio leo eu sem. Nunc
                  eget justo tincidunt, tristique nisl at, malesuada eros.
                  Curabitur sodales luctus dui, vestibulum elementum metus
                  scelerisque sed. Nam lacinia tempor ante vel viverra.
                  Suspendisse tempus nisi quis augue pretium pharetra. Nulla
                  imperdiet posuere cursus. Proin quis scelerisque est. Proin
                  dapibus turpis ac ligula semper lobortis.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  eget ornare lacus. Donec commodo justo ipsum, non gravida
                  tellus vestibulum vestibulum. Proin diam ex, placerat eget
                  convallis a, commodo euismod nibh. Pellentesque ullamcorper
                  porttitor varius. Ut at nisi imperdiet, euismod sem sit amet
                  fermentum est.
                  <br /> Donec interdum, enim eget elementum rhoncus, tortor
                  ligula ultricies erat, eu scelerisque odio leo eu sem. Nunc
                  eget justo tincidunt, tristique nisl at, malesuada eros.
                  Curabitur sodales luctus dui, vestibulum elementum metus
                  scelerisque sed. Nam lacinia tempor ante vel viverra.
                  Suspendisse tempus nisi quis augue pretium pharetra. Nulla
                  imperdiet posuere cursus. Proin quis scelerisque est. Proin
                  dapibus turpis ac ligula semper lobortis.
                </p>
              </div>
            </div>
            <div className="offset-lg-2 col-lg-8 col-md-12 my-5">
              <div className="custom-control custom-checkbox">
                <input
                  onChange={this.onChangeCheckbox}
                  checked={isChecked}
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck"
                  name="example1"
                />
                <label
                  className="custom-control-label f-m f-14"
                  htmlFor="customCheck"
                >
                  I have read through General Agreement and I comply with all
                  the{" "}
                  <a href="#!" className="txt-blk">
                    <u>Terms</u>
                  </a>{" "}
                  &{" "}
                  <a href="#!" className="txt-blk">
                    <u>Conditions</u>
                  </a>{" "}
                  mentioned{" "}
                </label>
              </div>
            </div>
            <div className="offset-lg-4 col-lg-4">
              <a
                onClick={this.handleSubmit}
                type="button"
                className={ isChecked ? "btn box-shd-hover-org btn-primary my-5 w-100 f-18 f-b" : " disabled btn box-shd-hover-org btn-primary my-5 w-100 f-18 f-b"}
                data-toggle="modal"
                data-target="#success"
                disabled={!isChecked}
              >
                Login
              </a>
            </div>
          </div>
        </div>
        {popupFlag == true ? (
          <DocModal
            closePopup={this.closeSuccessPopup}
            history={this.props.history}
          />
        ) : null}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isSuperProvider: state.Auth.isSuperProvider,
  document: state.Auth.document,
  isVarified: state.Auth.isSuperProvider,
});

const mapDispatchToProps = (dispatch) => ({
  login: (payload) => dispatch(actions.login(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GenAgreement);
