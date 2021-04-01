import React, { useState, useEffect, useRef } from "react";
import * as actions from "../actions";
import { connect } from "react-redux";
import { withRouter } from 'react-router';
import user from "../assets/img/user.png";
import profile from "../assets/img/profile.png";
import logout from "../assets/img/logout.png";

const ProfileDropdown = (props) => {

  const wrapperRef = useRef(null);

  const [isDropdown, setDropdown] = useState(false);

  useEffect(() => {
    props.profile();

    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className={`profile dropdown ${isDropdown ? "show" : ""}`} ref={wrapperRef}>
        <a
          className="btn f-16 dropdown-toggle d-flex align-items-center justify-content-center pl-0"
          id="dropdownMenuLink"
          onClick={() => setDropdown(!isDropdown)}
        >
          <div className="propic mr-3" style={{ position: 'relative', height: '100px', width: '100px' }} >
            <img src={
              props.photoData != ""
                ? props.photoData
                : user
            }
              className="img-fluid"
              style={{ borderRadius: '50%', width: '57px', height: '35px', objectFit: 'cover', objectPosition: 'center' }}
            />
          </div>
          <p className="my-1 name">{props.userFirstname != undefined ? `${props.userFirstname} ${props.userLastname}` : ""}</p>
        </a>
        <div className={`dropdown-menu f-16 profile-dropdown ${isDropdown ? "show" : ""}`}>
         { props.subscriptionError ? null : <a onClick={() => props.history.push("/profile")} className="dropdown-item d-flex py-3">
            <img
              src={
                profile
              }
            />
            <p
              className="m-0 ml-2"
            >
              View Profile
            </p>
          </a>}
          <a onClick={props.logout} className="dropdown-item d-flex py-3">
            <img src={logout} />
            <p className="m-0 ml-2">Logout</p>
          </a>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  photoData: state.Profile.photoData,
  firstName: state.Profile.firstName,
  lastName: state.Profile.lastName,
  userFirstname: state.Profile.userFirstname,
  userLastname: state.Profile.userLastname,
  subscriptionError: state.Subscription.subscriptionError,
});

const mapDispatchToProps = (dispatch) => ({
  profile: (payload) => dispatch(actions.profileGetInfo(payload)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileDropdown));
