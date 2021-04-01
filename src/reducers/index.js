/* eslint-disable quotes */
/*-------------------------------------------------------------------------------
       This is the root reducer where all reducer combine in single reducer
------------------------------------------------------------------------------------*/
import { combineReducers } from "redux";
import Auth from "./Auth";
import Team from "./Team";
import Role from "./Role";
import User from "./User";
import Template from "./Template";
import Profile from "./Profile";
import Tik from "./Tik";
import Reports from "./Reports";
import Search from "./Search";
import Subscription from "./Subscription";
import Analytics from "./Analytics";
import Payment from './Payment';
import Help from './Help';
import Transaction from './Transaction';
import Notification from "./Notification";

const appReducer = combineReducers({
  Auth,
  Team,
  Role,
  User,
  Template,
  Profile,
  Tik,
  Reports,
  Search,
  Subscription,
  Analytics,
  Payment,
  Help,
  Transaction,
  Notification,
});

export default appReducer;
