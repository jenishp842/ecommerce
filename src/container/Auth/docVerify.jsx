import React, { Component } from "react";
import { DocVerifyForm, Header } from '../../component/index.jsx'

class DocVerify extends Component {
  render() {
    return (
      <>
        <Header />
        <div id="content" className="container my-5">
          <div className="row">
            <div
              className="offset-lg-2 col-lg-8 col-md-12 d-flex align-items-center justify-content-center flex-column f-m">
              <h1 className="text-center txt-blk mb-5 f-b">Welcome to DocTrace</h1>
            </div>
            <div className="offset-lg-2 col-lg-8 box-shd br-20">
              <h4 className="f-24 text-center my-5 f-b">Document verification</h4>
              <div className="w-400 mx-auto">
                <DocVerifyForm history={this.props.history} />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default DocVerify;
