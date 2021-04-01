import React, { Component } from "react";
import {Link} from 'react-router-dom';
import fb from "../assets/img/fb.png";
import insta from "../assets/img/insta.png";
import twit from "../assets/img/twit.png";
import { connect } from "react-redux";

class Footer extends Component {
  render() {
    return (
      <>
        <div style={{bottom: this.props.style}} className="footer d-flex justify-content-between align-items-center flex-wrap">
          <div className="my-2">
            {this.props.isProvider ? <Link to='/subscription' className="mr-4 f-16 txt-blk f-m">Pricing</Link>:null}
            <Link to='/fine-print' className="mr-4 f-16 txt-blk f-m">Fine Print</Link>
            <Link to='/faq' className="mr-4 f-16 txt-blk f-m">FAQ</Link>
            <Link to='/help' className="mr-4 f-16 txt-blk f-m">Help</Link>
          </div>
          <div className="my-2">
            <a className="mr-2"><img src={fb} /> </a>
            <a className="mr-2"><img src={insta} /> </a>
            <a className="mr-2"><img src={twit} /> </a>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  isProvider : state.Profile.showReferral,
});

export default connect(mapStateToProps, null)(Footer);
