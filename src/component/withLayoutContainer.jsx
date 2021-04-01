import React, { Component } from "react";
import { SideMenu, LoginHeader, Footer } from "./index.jsx";
import { withRouter } from "react-router";

class WithLayoutContainer extends Component {
  render() {
    const { subUserAccess, otherResponsibilities } = this.props;
    return (
      <>
        <div id="wrapper">
          <SideMenu subUserAccess={subUserAccess} otherResponsibilities={otherResponsibilities} />
          <div id="page-wrapper" className={this.props.location.pathname == '/dashboard' ? "" : "oh"}>
            <LoginHeader />
            {this.props.children}
            <Footer style={this.props.style} />
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(WithLayoutContainer);
