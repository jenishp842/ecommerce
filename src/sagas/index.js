/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
import { all } from "redux-saga/effects";
import Auth from "./Auth";
import Team from "./Team";
import Role from "./Role";
import User from "./User";
import Template from "./Template";
import Profile from "./Profile";
import Tik from "./Tik";
import Reports from "./Reports";
import Search from "./Search";
import Subscription from "./Subscriptions";
import Payment from "./Payment";
import Analytics from "./Analytics";
import Help from "./Help";
import Transaction from "./Transaction";
import Notification from "./Notification";

export default function* rootSaga(getState) {
  yield all([
    Auth(),
    Team(),
    Role(),
    User(),
    Template(),
    Profile(),
    Tik(),
    Reports(),
    Search(),
    Subscription(),
    Payment(),
    Analytics(),
    Help(),
    Transaction(),
    Notification(),
  ]);
}
