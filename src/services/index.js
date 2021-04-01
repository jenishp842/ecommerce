/* eslint-disable eqeqeq */
/* eslint-disable quote-props */
/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable object-shorthand */
import axios from "axios";

const mainURL = "https://8ltlg0u1v8.execute-api.us-east-1.amazonaws.com";
const baseURL = "https://lkhafyvb5f.execute-api.us-east-1.amazonaws.com/provider_backend";
const RoleURL = "https://vq070j2rg1.execute-api.us-east-1.amazonaws.com";
const ProfilePic = "https://lkhafyvb5f.execute-api.us-east-1.amazonaws.com/provider_backend"
const blockchainApi = "https://fp7ykaetw1.execute-api.us-east-1.amazonaws.com/blockchain_api";
const reportsApi = "https://mj8epb1dj9.execute-api.us-east-1.amazonaws.com/provider-report";
const myPlan = "https://j5ges03z49.execute-api.us-east-1.amazonaws.com";
const payment = "https://wanm71fsvg.execute-api.us-east-1.amazonaws.com";
const analytics = "https://nquegg34ca.execute-api.us-east-1.amazonaws.com";
const faq = "https://s1j3mqin5h.execute-api.us-east-1.amazonaws.com/";
const help = "https://cors-anywhere.herokuapp.com/https://doctrace.zendesk.com/api/v2";

const JwtToken = JSON.parse(localStorage.getItem("jwtToken"));

let token;
if (JwtToken == null || JwtToken == "") {
  token = null;
} else {
  token = JwtToken.accessToken.jwtToken;
}

const user = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: token,
  },
});

const user2 = axios.create({
  baseURL: RoleURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: token,
  },
});

const user3 = axios.create({
  baseURL: mainURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: token,
  },
});

const profilePic = axios.create({
  baseURL: ProfilePic,
  headers: {
    "Content-Type": "application/json",
    Authorization: token,
  },
});

const blockchain = axios.create({
  baseURL: blockchainApi,
  headers: {
    "Content-Type": "application/json",
  },
});

const reportsAPI = axios.create({
  baseURL: reportsApi,
  headers: {
    "Content-Type": "application/json",
    Authorization: token,
  },
});

const planAPI = axios.create({
  baseURL: myPlan,
  headers: {
    "Content-Type": "application/json",
    Authorization: token,
  },
});

const paymentAPI = axios.create({
  baseURL: payment,
  headers: {
    "Content-Type": "application/json",
    Authorization: token,
  },
});
const analyticsApi = axios.create({
  baseURL: analytics,
  headers: {
    "Content-Type": "application/json",
    Authorization: token,
  },
});
const faqApi = axios.create({
  baseURL: faq,
  headers: {
    "Content-Type": "application/json",
    Authorization: token,
  },
});
const helpApi = axios.create({
  baseURL: help,
  headers: {
    "Content-Type": "application/json",
  },
});
export {
  user,
  user2,
  user3,
  profilePic,
  blockchain,
  reportsAPI,
  planAPI,
  paymentAPI,
  analyticsApi,
  faqApi,
  helpApi,
};
