import React, { Component } from "react";
import { Link } from "react-router-dom";
import header_logo from '../assets/img/logo.png';


class Header extends Component {
  render() {
    const { isLoginPage, isSingUpPage } = this.props;
    return (
      <>
        <div className="container-fluid">
          <div className="row">
            <div className="col p-0">
              <nav className="navbar beforel navbar-expand-md py-1">
                <Link className="navbar-brand" to='/signin'>
                  <img src={header_logo} />
                </Link>
                {isLoginPage &&
                  <Link to="/signup" className="btn btn-primary f-m">
                    SignUp
                </Link>}
                {isSingUpPage && <Link to="/signin" className="btn btn-primary f-m">
                  Login
                   </Link>
                }
                {/* {withLogin &&
                  <ProfileDropdown />
                } */}

              </nav>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Header;
