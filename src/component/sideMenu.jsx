/* eslint-disable no-undef */
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router";
import { navigationMapper } from "../constants/Mapper";
import { Html5Entities } from 'html-entities';
import dhistory from "../assets/img/dhistory.png";
import history from "../assets/img/history.png";
import team from "../assets/img/team.png";
import dteam from "../assets/img/dteam.png";
import integration from "../assets/img/integration.png";
import dintegration from "../assets/img/dintegration.png";
import template from "../assets/img/template.png";
import dtemplate from "../assets/img/dtemplate.png";
import reports from "../assets/img/reports.png";
import dreports from "../assets/img/dreports.png";
import dthistory from "../assets/img/dthistory.png";
import thistory from "../assets/img/thistory.png";
import header_logo from "../assets/img/logo.png";
import logom from "../assets/img/logom.png";

let collapseValue = window.location.pathname;
let htmlEntities = new Html5Entities();
const obj = [
  // {
  //   name: 'dashboard',
  //   label: 'Dashboard',
  //   img: Images.header_logo,
  //   hoverImage: Images.logom,
  // },
  {
    name: "docHistory",
    label: "Tik History",
    img: dhistory,
    hoverImage: history,
    flag: false,
    id: 0,
    path: "docHistory",
  },
  {
    name: "team",
    label: "Team",
    img: dteam,
    hoverImage: team,
    flag: false,
    id: 1,
    items: [
      {
        name: "teamM",
        label: "Team Management",
        img: null,
        hoverImage: null,
        path: "/",
      },
      {
        name: "roleM",
        label: "Role Management",
        img: null,
        hoverImage: null,
        path: "roleM",
      },
      {
        name: "userM",
        label: "Associated Users",
        img: null,
        hoverImage: null,
        path: "userM",
      },
    ],
  },
  {
    name: "template",
    label: "Template",
    img: dtemplate,
    hoverImage: template,
    flag: false,
    id: 2,
    path: "template",
  },
  {
    name: "integration",
    label: "Integration",
    img: dintegration,
    hoverImage: integration,
    flag: false,
    id: 3,
    path: "/",
    items: [
      {
        name: "analytics",
        label: htmlEntities.decode('Analytics &amp; Usage'),
        img: null,
        hoverImage: null,
        path: "analytics",
      },
      {
        name: "api-usage",
        label: "API Requests",
        img: null,
        hoverImage: null,
        path: "api-usage",
      },
    ],
  },
  {
    name: "reports",
    label: "Reports",
    img: dreports,
    hoverImage: reports,
    flag: false,
    id: 4,
    path: "/",
    items: [
      {
        name: "docReport",
        label: "Tik Report",
        img: null,
        hoverImage: null,
        path: "docReport",
      },
      {
        name: "tor_reports",
        label: "Tor Reports",
        img: null,
        hoverImage: null,
        path: "tor_reports",
      },
      {
        name: "team_reports",
        label: "Team Reports",
        img: null,
        hoverImage: null,
        path: "team_reports",
      },
    ],
  },
  {
    name: "transaction",
    label: "Transaction History",
    img: dthistory,
    hoverImage: thistory,
    flag: false,
    id: 5,
    path: "transaction",
  },
];
class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      report: false,
      role: false,
      team: false,
      user: false,
      transaction: false,
      integration: false,
    };
  }
  handleNavigation = (nav) => {
    if (nav.name && (nav.name == "team" || nav.name == "reports" || nav.name == 'integration')) {
      console.log(window.location.pathname);
      this.props.history.push(window.location.pathname);
      const index = obj.findIndex((x) => x.name === nav.name);
      if (obj[index]) {
        obj[index].flag = !obj[index].flag;
      }
    } else {
      this.props.history.push(navigationMapper[nav.name]);
    }
    collapseValue = navigationMapper[nav.name];
  };
  componentDidUpdate(prevprops) {
    if (prevprops.specialFeatures != this.props.specialFeatures) {
      this.props.specialFeatures &&
        this.props.specialFeatures.map((e) => {
          if (e.featureName == "reports") {
            this.setState({ report: true });
          }
          if (e.featureName == "role_management") {
            this.setState({ role: true });
          }
          if (e.featureName == "team_management") {
            this.setState({ team: true });
          }
          if (e.featureName == "user_management") {
            this.setState({ user: true });
          }
          if (e.featureName == "transaction_history") {
            this.setState({ transaction: true });
          }
          if (e.featureName == "api_analytics") {
            this.setState({ integration: true });
          }
        });
    }
  }
  render() {
    const {
      subUserAccess,
      otherResponsibilities,
      profile,
      isSuperProvider,
      templateRole,
      Roletemplate,
      specialFeatures,
      payment,
      rolepayment
    } = this.props;
    const { report, role, team, user, transaction, integration } = this.state;
    console.log(rolepayment, payment)
    const subUserAccessData =
      subUserAccess &&
      Object.values(subUserAccess).filter((item) => item === true);
    const otherResponsibilitiesData =
      otherResponsibilities &&
      Object.values(otherResponsibilities).filter((item) => item == true);
    const templateRoleData =
      templateRole &&
      Object.values(templateRole).filter((item) => item === true);
    const RoletemplateData =
      Roletemplate &&
      Object.values(Roletemplate).filter((item) => item === true);
    return (
      <>
        <nav
          className="navbar-default navbar-static-side nav-cst"
          role="navigation"
        >
          <div className="sidebar-collapse">
            <ul className="nav metismenu f-m" id="side-menu">
              <li className="nav-header p-0">
                <a
                  className="navbar-brand py-2 px-0"
                  onClick={() => this.props.history.push("/dashboard")}
                >
                  <img className="big img-fluid" src={header_logo} />
                  <img className="mini img-fluid" src={logom} />
                </a>
              </li>
              {obj.map((navigater, index) => (
                <>
                  <li
                    key={index}
                    className={
                      (collapseValue === navigationMapper[navigater.name] ||
                        (navigater.items &&
                          navigater.items.filter(
                            (item) =>
                              navigationMapper[item.name] == collapseValue
                          ).length > 0)) &&
                      navigater.flag
                        ? "active"
                        : ""
                    }
                  >
                    {profile.roleName === "Super Provider" || isSuperProvider ? (
                      navigater.name === "reports" && report ? (
                        <a
                          className="navigation-item"
                          onClick={() => {
                            this.handleNavigation(navigater);
                          }}
                        >
                          <img className="hover" src={navigater.hoverImage} />
                          <img className="default" src={navigater.img} />
                          <span className="nav-label">{navigater.label}</span>
                          {navigater.items && <span className="fa arrow" />}
                        </a>
                      ) : navigater.name === "transaction" && transaction  ? (
                        <a
                          className="navigation-item"
                          onClick={() => {
                            this.handleNavigation(navigater);
                          }}
                        >
                          <img className="hover" src={navigater.hoverImage} />
                          <img className="default" src={navigater.img} />
                          <span className="nav-label">{navigater.label}</span>
                          {navigater.items && <span className="fa arrow" />}
                        </a>
                      ) : navigater.name === "integration" && integration ? (
                        <a
                          className="navigation-item"
                          onClick={() => {
                            this.handleNavigation(navigater);
                          }}
                        >
                          <img className="hover" src={navigater.hoverImage} />
                          <img className="default" src={navigater.img} />
                          <span className="nav-label">{navigater.label}</span>
                          {navigater.items && <span className="fa arrow" />}
                        </a>
                      ) : (
                        navigater.name != "reports" &&
                        navigater.name != "transaction" &&
                        navigater.name != "integration" && (
                          <a
                            className="navigation-item"
                            onClick={() => {
                              this.handleNavigation(navigater);
                            }}
                          >
                            <img className="hover" src={navigater.hoverImage} />
                            <img className="default" src={navigater.img} />
                            <span className="nav-label">{navigater.label}</span>
                            {navigater.items && <span className="fa arrow" />}
                          </a>
                        )
                      )
                    ) : (navigater.name === "template" &&
                        ((templateRoleData && templateRoleData.length > 0) ||
                          (RoletemplateData && RoletemplateData.length > 0))) ||
                      (navigater.name == "team" &&
                        ((subUserAccessData && subUserAccessData.length > 0) ||
                          (otherResponsibilitiesData &&
                            otherResponsibilitiesData.length > 0))) ||
                      (navigater.name !== "team" &&
                        navigater.name !== "template" &&
                        navigater.name !== "transaction") ? (
                      <a
                        className="navigation-item"
                        onClick={() => {
                          this.handleNavigation(navigater);
                        }}
                      >
                        <img className="hover" src={navigater.hoverImage} />
                        <img className="default" src={navigater.img} />
                        <span className="nav-label">{navigater.label}</span>
                        {navigater.items && <span className="fa arrow" />}
                      </a>
                    ) :  navigater.name === "transaction" && transaction && (payment && (payment.access || rolepayment.access)) ? (
                      <a
                        className="navigation-item"
                        onClick={() => {
                          this.handleNavigation(navigater);
                        }}
                      >
                        <img className="hover" src={navigater.hoverImage} />
                        <img className="default" src={navigater.img} />
                        <span className="nav-label">{navigater.label}</span>
                        {navigater.items && <span className="fa arrow" />}
                      </a>
                    ) : (
                      ""
                    )}
                    {navigater.items && navigater.items ? (
                      <>
                        <ul
                          className={`nav nav-second-level f-14 collapse ${
                            (collapseValue ===
                              navigationMapper[navigater.name] ||
                              (navigater.items &&
                                navigater.items.filter(
                                  (item) =>
                                    navigationMapper[item.name] == collapseValue
                                ).length > 0)) &&
                            navigater.flag
                              ? "in"
                              : ""
                          }`}
                        >
                          {navigater.items.map((itemList, index) => (
                            <>
                              {profile.roleName === "Super Provider" ||
                              isSuperProvider ? (
                                role && itemList.name == "roleM" ? (
                                  <li
                                    key={index}
                                    className={`${
                                      collapseValue ==
                                      navigationMapper[itemList.name]
                                        ? "active"
                                        : ""
                                    }`}
                                    onClick={() =>
                                      this.handleNavigation(itemList)
                                    }
                                  >
                                    <a className="navigation-item">
                                      {itemList.label}
                                    </a>
                                  </li>
                                ) : team && itemList.name == "teamM" ? (
                                  <li
                                    key={index}
                                    className={`${
                                      collapseValue ==
                                      navigationMapper[itemList.name]
                                        ? "active"
                                        : ""
                                    }`}
                                    onClick={() =>
                                      this.handleNavigation(itemList)
                                    }
                                  >
                                    <a className="navigation-item">
                                      {itemList.label}
                                    </a>
                                  </li>
                                ) : user && itemList.name == "userM" ? (
                                  <li
                                    key={index}
                                    className={`${
                                      collapseValue ==
                                      navigationMapper[itemList.name]
                                        ? "active"
                                        : ""
                                    }`}
                                    onClick={() =>
                                      this.handleNavigation(itemList)
                                    }
                                  >
                                    <a className="navigation-item">
                                      {itemList.label}
                                    </a>
                                  </li>
                                ) : (
                                  itemList.name != "userM" &&
                                  itemList.name != "teamM" &&
                                  itemList.name != "roleM" && (
                                    <li
                                      key={index}
                                      className={`${
                                        collapseValue ==
                                        navigationMapper[itemList.name]
                                          ? "active"
                                          : ""
                                      }`}
                                      onClick={() =>
                                        this.handleNavigation(itemList)
                                      }
                                    >
                                      <a className="navigation-item">
                                        {itemList.label}
                                      </a>
                                    </li>
                                  )
                                )
                              ) : (itemList.name !== "roleM" &&
                                  itemList.name !== "teamM" &&
                                  itemList.name !== "userM") ||
                                ((itemList.name === "roleM" ||
                                  itemList.name === "teamM" ||
                                  itemList.name === "userM") &&
                                  ((subUserAccessData &&
                                    subUserAccessData.length > 0) ||
                                    (otherResponsibilitiesData &&
                                      otherResponsibilitiesData.length >
                                        0))) ? (
                                <li
                                  key={index}
                                  className={`${
                                    collapseValue ==
                                    navigationMapper[itemList.name]
                                      ? "active"
                                      : ""
                                  }`}
                                  onClick={() =>
                                    this.handleNavigation(itemList)
                                  }
                                >
                                  <a className="navigation-item">
                                    {itemList.label}
                                  </a>
                                </li>
                              ) : (
                                ""
                              )}
                            </>
                          ))}
                        </ul>
                      </>
                    ) : null}
                  </li>
                </>
              ))}
            </ul>
          </div>
        </nav>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isSuperProvider: state.Auth.isSuperProvider,
    profile: state.Profile,
    subUserAccess: state.Profile.role,
    otherResponsibilities: state.Profile.Rolerole,
    templateRole: state.Profile.template,
    Roletemplate: state.Profile.Roletemplate,
    specialFeatures: state.Subscription.specialFeatures,
    rolepayment: state.Profile.Rolepayment,
    payment: state.Profile.payment,
  };
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SideMenu));
