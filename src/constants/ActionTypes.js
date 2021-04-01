/* eslint-disable quotes */
/* eslint-disable import/prefer-default-export */
/*-------------------------------------------------------------------------------------
   These are the variables that determine what our central data store (`../reducers/index.js`)
   changes in our state.
----------------------------------------------------------------------------------------*/

// AUTH CONST

export const PROVIDER_SIGNUP = "PROVIDER_SIGNUP";
export const PROVIDER_INFO = "PROVIDER_INFO";
export const PROVIDER_INFO_SUCCESS = "PROVIDER_INFO_SUCCESS";
export const PROVIDER_DOCUMENT_VERIFICATION = "PROVIDER_DOCUMENT_VERIFICATION";
export const PROVIDER_DOCUMENT_VERIFICATION_SUCCESS = "PROVIDER_DOCUMENT_VERIFICATION_SUCCESS";
export const PROVIDER_CHECK_USER = "PROVIDER_CHECK_USER";
export const PROVIDER_CHECK_USER_SUCCESS = "PROVIDER_CHECK_USER_SUCCESS";
export const ERROR = "ERROR";
export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const ERROR_CLEAR = "ERROR_CLEAR";
export const TOKEN_ERROR = "TOKEN_ERROR";
export const BLOCKCHAIN_REGISTER = "BLOCKCHAIN_REGISTER";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const RECOVER_PASSWORD = "RECOVER_PASSWORD";

// TEAM CONST
export const PROVIDER_GET_TEAM_MANAGEMENT_LIST = "PROVIDER_GET_TEAM_MANAGEMENT_LIST";
export const PROVIDER_GET_TEAM_MANAGEMENT_LIST_SUCCESS = "PROVIDER_GET_TEAM_MANAGEMENT_LIST_SUCCESS";
// ROLE CONST
export const PROVIDER_GET_ROLE_MANAGEMENT_LIST_SUCCESS = "PROVIDER_GET_ROLE_MANAGEMENT_LIST_SUCCESS";
export const PROVIDER_GET_ROLE_MANAGEMENT_LIST = "PROVIDER_GET_ROLE_MANAGEMENT_LIST";
export const PROVIDER_DELETE_ROLE_MANAGEMENT_LIST = "PROVIDER_DELETE_ROLE_MANAGEMENT_LIST";
export const PROVIDER_DELETE_ROLE_MANAGEMENT_LIST_SUCCESS = "PROVIDER_DELETE_ROLE_MANAGEMENT_LIST_SUCCESS";
export const PROVIDER_ADD_ROLE_MANAGEMENT_LIST = "PROVIDER_ADD_ROLE_MANAGEMENT_LIST";
export const PROVIDER_ADD_ROLE_MANAGEMENT_LIST_SUCCESS = "PROVIDER_ADD_ROLE_MANAGEMENT_LIST_SUCCESS";
export const PROVIDER_ADD_INITIALIZATION_ROLE_MANAGEMENT_LIST = "PROVIDER_ADD_INITIALIZATION_ROLE_MANAGEMENT_LIST";
export const PROVIDER_ADD_ERROR_ROLE_MANAGEMENT_LIST = "PROVIDER_ADD_ERROR_ROLE_MANAGEMENT_LIST";
export const PROVIDER_INITIALIZATION_ROLE_MANAGEMENT_LIST = "PROVIDER_INITIALIZATION_ROLE_MANAGEMENT_LIST";
export const PROVIDER_ERROR_ROLE_MANAGEMENT_LIST = "PROVIDER_ERROR_ROLE_MANAGEMENT_LIST";
export const PROVIDER_INITIALIZATION_ROLE = "PROVIDER_INITIALIZATION_ROLE";
export const PROVIDER_DELETE_INITIALIZATION_ROLE_MANAGEMENT_LIST = "PROVIDER_DELETE_INITIALIZATION_ROLE_MANAGEMENT_LIST";
export const PROVIDER_DELETE_ERROR_ROLE_MANAGEMENT_LIST = "PROVIDER_DELETE_ERROR_ROLE_MANAGEMENT_LIST";
export const PROVIDER_EDIT_ROLE_MANAGEMENT_LIST = "PROVIDER_EDIT_ROLE_MANAGEMENT_LIST";
export const PROVIDER_EDIT_ROLE_MANAGEMENT_LIST_SUCCESS = "PROVIDER_EDIT_ROLE_MANAGEMENT_LIST_SUCCESS";
export const PROVIDER_EDIT_INITIALIZATION_ROLE_MANAGEMENT_LIST = "PROVIDER_EDIT_INITIALIZATION_ROLE_MANAGEMENT_LIST";
export const PROVIDER_EDIT_ERROR_ROLE_MANAGEMENT_LIST = "PROVIDER_EDIT_ERROR_ROLE_MANAGEMENT_LIST";
export const PROVIDER_INITIALIZATION_TEAM_MANAGEMENT_LIST = "PROVIDER_INITIALIZATION_TEAM_MANAGEMENT_LIST";
export const PROVIDER_TEAM_DETAILS_TEAM_MANAGEMENT_LIST = "PROVIDER_TEAM_DETAILS_TEAM_MANAGEMENT_LIST";
export const PROVIDER_TEAM_DETAILS_TEAM_MANAGEMENT_LIST_SUCCESS = "PROVIDER_TEAM_DETAILS_TEAM_MANAGEMENT_LIST_SUCCESS";
export const PROVIDER_EDIT_TEAM_MANAGEMENT_LIST = "PROVIDER_EDIT_TEAM_MANAGEMENT_LIST";
export const PROVIDER_EDIT_TEAM_MANAGEMENT_LIST_SUCCESS = "PROVIDER_EDIT_TEAM_MANAGEMENT_LIST_SUCCESS";
export const PROVIDER_ERROR_EDIT_TEAM_MANAGEMENT_LIST = "PROVIDER_ERROR_EDIT_TEAM_MANAGEMENT_LIST";
export const PROVIDER_INITIALIZATION_EDIT_TEAM_MANAGEMENT_LIST = "PROVIDER_INITIALIZATION_EDIT_TEAM_MANAGEMENT_LIST";
export const PROVIDER_INITIALIZATION_ADD_TEAM_MANAGEMENT_LIST = "PROVIDER_INITIALIZATION_ADD_TEAM_MANAGEMENT_LIST";
export const PROVIDER_ADD_TEAM_MANAGEMENT_LIST = "PROVIDER_ADD_TEAM_MANAGEMENT_LIST";
export const PROVIDER_ADD_TEAM_MANAGEMENT_LIST_SUCCESS = "PROVIDER_ADD_TEAM_MANAGEMENT_LIST_SUCCESS";
export const PROVIDER_ERROR_ADD_TEAM_MANAGEMENT_LIST = "PROVIDER_ERROR_ADD_TEAM_MANAGEMENT_LIST";
export const PROVIDER_INITIALIZATION_TEAM = " PROVIDER_INITIALIZATION_TEAM";
export const PROVIDER_ERROR_TEAM_MANAGEMENT_LIST = " PROVIDER_ERROR_TEAM_MANAGEMENT_LIST";
export const PROVIDER_DELETE_INITIALIZATION_TEAM_MANAGEMENT_LIST = " PROVIDER_DELETE_INITIALIZATION_TEAM_MANAGEMENT_LIST";
export const PROVIDER_DELETE_TEAM_MANAGEMENT_LIST = "PROVIDER_DELETE_TEAM_MANAGEMENT_LIST";
export const PROVIDER_DELETE_TEAM_MANAGEMENT_LIST_SUCCESS = "PROVIDER_DELETE_TEAM_MANAGEMENT_LIST_SUCCESS";
export const PROVIDER_ERROR_DELETE_TEAM_MANAGEMENT_LIST_SUCCESS = " PROVIDER_ERROR_DELETE_TEAM_MANAGEMENT_LIST_SUCCESS";
export const PROVIDER_GET_TEAM_USER_MANAGEMENT_LIST = " PROVIDER_GET_TEAM_USER_MANAGEMENT_LIST";
export const PROVIDER_GET_TEAM_USER_MANAGEMENT_LIST_SUCCESS = " PROVIDER_GET_TEAM_USER_MANAGEMENT_LIST_SUCCESS";
export const PROVIDER_ERROR_TEAM_USER_MANAGEMENT_LIST = " PROVIDER_ERROR_TEAM_USER_MANAGEMENT_LIST";
// USER CONST
export const PROVIDER_GET_USER_MANAGEMENT_LIST_SUCCESS = "PROVIDER_GET_USER_MANAGEMENT_LIST_SUCCESS";
export const PROVIDER_GET_USER_MANAGEMENT_LIST = "PROVIDER_GET_USER_MANAGEMENT_LIST";
export const PROVIDER_DELETE_USER_MANAGEMENT_LIST = "PROVIDER_DELETE_USER_MANAGEMENT_LIST";
export const PROVIDER_DELETE_USER_MANAGEMENT_LIST_SUCCESS = "PROVIDER_DELETE_USER_MANAGEMENT_LIST_SUCCESS";
export const PROVIDER_ADD_USER_MANAGEMENT_LIST = "PROVIDER_ADD_USER_MANAGEMENT_LIST";
export const PROVIDER_ADD_USER_MANAGEMENT_LIST_SUCCESS = "PROVIDER_ADD_USER_MANAGEMENT_LIST_SUCCESS";
export const PROVIDER_ADD_INITIALIZATION_USER_MANAGEMENT_LIST = "PROVIDER_ADD_INITIALIZATION_USER_MANAGEMENT_LIST";
export const PROVIDER_ADD_ERROR_USER_MANAGEMENT_LIST = "PROVIDER_ADD_ERROR_USER_MANAGEMENT_LIST";
export const PROVIDER_INITIALIZATION_USER_MANAGEMENT_LIST = "PROVIDER_INITIALIZATION_USER_MANAGEMENT_LIST";
export const PROVIDER_ERROR_USER_MANAGEMENT_LIST = "PROVIDER_ERROR_USER_MANAGEMENT_LIST";
export const PROVIDER_DELETE_INITIALIZATION_USER_MANAGEMENT_LIST = "PROVIDER_DELETE_INITIALIZATION_USER_MANAGEMENT_LIST";
export const PROVIDER_DELETE_ERROR_USER_MANAGEMENT_LIST = "PROVIDER_DELETE_ERROR_USER_MANAGEMENT_LIST";
export const PROVIDER_EDIT_USER_MANAGEMENT_LIST = "PROVIDER_Edit_USER_MANAGEMENT_LIST";
export const PROVIDER_EDIT_USER_MANAGEMENT_LIST_SUCCESS = "PROVIDER_EDIT_USER_MANAGEMENT_LIST_SUCCESS";
export const FAQ_SUCCESS = "FAQ_SUCCESS";
export const FAQ = "FAQ";
export const FAQ_SEARCH_SUCCESS = "FAQ_SEARCH_SUCCESS";
export const FAQ_SEARCH = "FAQ_SEARCH";
export const IS_ACTIVE = "IS_ACTIVE";

// PROFILE
export const PROFILE_INFO_SUCCESS = "PROFILE_INFO_SUCCESS";
export const PROFILE_INFO = "PROFILE_INFO";
export const PROFILE_EDIT = "PROFILE_EDIT";
export const PROFILE_UPDATE = "PROFILE_UPDATE";
export const PROFILE_UPDATE_SUCCESS = "PROFILE_UPDATE_SUCCESS";
export const PROFILE_PIC_UPDATE = "PROFILE_PIC_UPDATE";
export const MOBILE_NUMBER_UPDATE_SUCCESS = "MOBILE_NUMBER_UPDATE_SUCCESS";
export const MOBILE_NUMBER_UPDATE = "MOBILE_NUMBER_UPDATE";
export const DASHBOARD = "DASHBOARD";
export const DASHBOARD_SUCCESS = "DASHBOARD_SUCCESS";
// TIK

export const TIK_EDIT = "TIK_EDIT";
export const CREATE_TIK = "CREATE_TIK";
export const GET_META_DATA = "GET_META_DATA";
export const GET_META_DATA_SUCCESS = "GET_META_DATA_SUUCESS";
export const RECIVER_LIST_SUCCESS = "RECIVER_LIST_SUCCESS";
export const RECIVER_LIST = "RECIVER_LIST";
export const CREATE_TIK_SUCCESS = "CREATE_TIK_SUCCESS";
export const SELECT_TEMPLATE = "SELECT_TEMPLATE";
export const SAVE_DRAFT_SUCCESS = "SAVE_DRAFT_SUCCESS";
export const SAVE_DRAFT = "SAVE_DRAFT";
export const DRAFT_DETAIL_SUCCESS = "DRAFT_DETAIL_SUCCESS";
export const DRAFT_DETAIL = "DRAFT_DETAIL";
export const IMG_LIST_EDIT = "IMG_LIST_EDIT";
export const IMAGE_EDIT = "IMAGE_EDIT";
export const RECIVER_DRAFT = "RECIVER_DRAFT";
export const RECIVER_DRAFT_EDIT = "RECIVER_DRAFT_EDIT";
export const CLEAR_DRAFT = "CLEAR_DRAFT";
export const TIK_DETAIL = "TIK_DETAIL";
export const TIK_DETAIL_SUCCESS = "TIK_DETAIL_SUCCESS";
export const ADD_META_DATA = "ADD_META_DATA";
export const ADD_TAG_DATA_TIK_INITIALIZATION = "ADD_TAG_DATA_TIK_INITIALIZATION";
export const ADD_TAG_DATA_TIK = "ADD_TAG_DATA_TIK";
export const ADD_TAG_DATA_TIK_SUCCESS = "ADD_TAG_DATA_TIK_SUCCESS";
export const ADD_TAG_DATA_IN_TIK_ERROR = "ADD_TAG_DATA_IN_TIK_ERROR";
export const ADD_EXISTING_TAG_DATA_TIK_INITIALIZATION = "ADD_EXISTING_TAG_DATA_TIK_INITIALIZATION";
export const ADD_EXISTING_TAG_DATA_TIK = "ADD_EXISTING_TAG_DATA_TIK";
export const ADD_EXISTING_TAG_DATA_TIK_SUCCESS = "ADD_EXISTING_TAG_DATA_TIK_SUCCESS";
export const DELETE_TAG_DATA_TIK_INITIALIZATION = "DELETE_TAG_DATA_TIK_INITIALIZATION";
export const DELETE_TAG_DATA_TIK = "DELETE_TAG_DATA_TIK";
export const DELETE_TAG_DATA_TIK_SUCCESS = "DELETE_TAG_DATA_TIK_SUCCESS";
export const DELETE_TAG_DATA_IN_TIK_ERROR = "DELETE_TAG_DATA_IN_TIK_ERROR";
export const ADD_EXISTING_TAG_DATA_TIK_ERROR = "ADD_EXISTING_TAG_DATA_TIK_ERROR";
export const UPDATE_TIK = "UPDATE_TIK";
export const UPDATE_TIK_SUCCESS = "UPDATE_TIK_SUCCESS";
export const VIEW_TIK_SUCCESS = "VIEW_TIK_SUCCESS";
export const VIEW_TIK = "VIEW_TIK";
export const ARCHIVE = "ARCHIVE";
export const ARCHIVE_LIST = "ARCHIVE_LIST";
export const ARCHIVE_SUCCESS = "ARCHIVE_SUCCESS";
export const TIK_LIMIT = "TIK_LIMIT";

// TEMPLATE
export const PROVIDER_GET_TEMPLATE_MANAGEMENT_LIST = "PROVIDER_GET_TEMPLATE_MANAGEMENT_LIST";
export const PROVIDER_INITIALIZATION_TEMPLATE_MANAGEMENT_LIST = "PROVIDER_INITIALIZATION_TEMPLATE_MANAGEMENT_LIST";
export const PROVIDER_GET_TEMPLATE_MANAGEMENT_LIST_SUCCESS = "PROVIDER_GET_TEMPLATE_MANAGEMENT_LIST_SUCCESS";
export const PROVIDER_DELETE_TEMPLATE_MANAGEMENT_LIST = "PROVIDER_DELETE_TEMPLATE_MANAGEMENT_LIST";
export const PROVIDER_DELETE_TEMPLATE_MANAGEMENT_LIST_SUCCESS = "PROVIDER_DELETE_TEMPLATE_MANAGEMENT_LIST_SUCCESS";
export const PROVIDER_TEMPLATE_DETAIL_SUCCESS = "PROVIDER_TEMPLATE_DETAIL_SUCCESS";
export const PROVIDER_TEMPLATE_DETAIL = "PROVIDER_TEMPLATE_DETAIL";
export const PROVIDER_GET_RECENT_TEMPLATE_MANAGEMENT_LIST_ERROR = "PROVIDER_GET_RECENT_TEMPLATE_MANAGEMENT_LIST_ERROR";
export const PROVIDER_INITIALIZATION_RECENT_TEMPLATE_MANAGEMENT_LIST = "PROVIDER_INITIALIZATION_RECENT_TEMPLATE_MANAGEMENT_LIST";
export const PROVIDER_GET_RECENT_TEMPLATE_MANAGEMENT_LIST = "PROVIDER_GET_RECENT_TEMPLATE_MANAGEMENT_LIST";
export const PROVIDER_GET_RECENT_TEMPLATE_MANAGEMENT_LIST_SUCCESS = "PROVIDER_GET_RECENT_TEMPLATE_MANAGEMENT_LIST_SUCCESS";
export const PROVIDER_INITIALIZATION_CREATE_TEMPLATE_MANAGEMENT_LIST = "PROVIDER_INITIALIZATION_CREATE_TEMPLATE_MANAGEMENT_LIST";
export const PROVIDER_CREATE_TEMPLATE_MANAGEMENT_LIST = "PROVIDER_CREATE_TEMPLATE_MANAGEMENT_LIST";
export const PROVIDER_CREATE_TEMPLATE_MANAGEMENT_SUCCESS = "PROVIDER_CREATE_TEMPLATE_MANAGEMENT_SUCCESS";
export const PROVIDER_CREATE_TEMPLATE_MANAGEMENT_ERROR = "PROVIDER_CREATE_TEMPLATE_MANAGEMENT_ERROR";
export const PROVIDER_TEMPLATE_INITIALIZATION = "PROVIDER_TEMPLATE_INITIALIZATION";
export const PROVIDER_INITIALIZATION_DETAILS_TEMPLATE_MANAGEMENT_LIST = "PROVIDER_INITIALIZATION_DETAILS_TEMPLATE_MANAGEMENT_LIST";
export const PROVIDER_DETAILS_TEMPLATE_MANAGEMENT_LIST = "PROVIDER_DETAILS_TEMPLATE_MANAGEMENT_LIST";
export const PROVIDER_DETAILS_TEMPLATE_MANAGEMENT_SUCCESS = "PROVIDER_DETAILS_TEMPLATE_MANAGEMENT_SUCCESS";
export const PROVIDER_DETAILS_TEMPLATE_MANAGEMENT_ERROR = "PROVIDER_DETAILS_TEMPLATE_MANAGEMENT_ERROR";
export const PROVIDER_EDIT_TEMPLATE_MANAGEMENT_LIST = "PROVIDER_EDIT_TEMPLATE_MANAGEMENT_LIST";
export const PROVIDER_INITIALIZATION_SELECT_ACCEPTANCE_TEMPLATE_MANAGEMENT_LIST = "PROVIDER_INITIALIZATION_SELECT_ACCEPTANCE_TEMPLATE_MANAGEMENT_LIST";
export const PROVIDER_GET_SELECT_ACCEPTANCE_TEMPLATE_MANAGEMENT_LIST = "PROVIDER_GET_SELECT_ACCEPTANCE_TEMPLATE_MANAGEMENT_LIST";
export const PROVIDER_GET_SELECT_ACCEPTANCE_TEMPLATE_MANAGEMENT_LIST_SUCCESS = "PROVIDER_GET_SELECT_ACCEPTANCE_TEMPLATE_MANAGEMENT_LIST_SUCCESS";
export const PROVIDER_GET_SELECT_ACCEPTANCE_TEMPLATE_MANAGEMENT_LIST_ERROR = "PROVIDER_GET_SELECT_ACCEPTANCE_TEMPLATE_MANAGEMENT_LIST_ERROR";
export const PROVIDER_INITIALIZATION_DOCUMENT_MANAGEMENT_LIST = "PROVIDER_INITIALIZATION_DOCUMENT_MANAGEMENT_LIST";
export const PROVIDER_GET_DOCUMENT_MANAGEMENT_LIST = "PROVIDER_GET_DOCUMENT_MANAGEMENT_LIST";
export const PROVIDER_GET_DOCUMENT_MANAGEMENT_LIST_SUCCESS = "PROVIDER_GET_DOCUMENT_MANAGEMENT_LIST_SUCCESS";
export const PROVIDER_ERROR_DOCUMENT_MANAGEMENT_LIST = "PROVIDER_ERROR_DOCUMENT_MANAGEMENT_LIST";
export const PROVIDER_INITIALIZATION_META_DATA_DOCUMENT_MANAGEMENT_LIST = "PROVIDER_INITIALIZATION_META_DATA_DOCUMENT_MANAGEMENT_LIST";
export const PROVIDER_GET_META_DATA_DOCUMENT_MANAGEMENT_LIST = "PROVIDER_GET_META_DATA_DOCUMENT_MANAGEMENT_LIST";
export const PROVIDER_GET_META_DATA_DOCUMENT_MANAGEMENT_LIST_SUCCESS = "PROVIDER_GET_META_DATA_DOCUMENT_MANAGEMENT_LIST_SUCCESS";
export const PROVIDER_ERROR_META_DATA_DOCUMENT_MANAGEMENT_LIST = "PROVIDER_ERROR_META_DATA_DOCUMENT_MANAGEMENT_LIST";
export const PROVIDER_DELETE_DRAFT_INITIALIZATION_DATA_DOCUMENT_MANAGEMENT_LIST = "PROVIDER_DELETE_DRAFT_INITIALIZATION_DATA_DOCUMENT_MANAGEMENT_LIST";
export const PROVIDER_DRAFT_DELETE_DOCUMENT_MANAGEMENT_LIST = "PROVIDER_DRAFT_DELETE_DOCUMENT_MANAGEMENT_LIST";
export const PROVIDER__DRAFT_SUCCESS_DOCUMENT_MANAGEMENT_LIST_SUCCESS = "PROVIDER__DRAFT_SUCCESS_DOCUMENT_MANAGEMENT_LIST_SUCCESS";
export const PROVIDER_DRAFT_ERROR_DOCUMENT_MANAGEMENT_LIST = "PROVIDER_DRAFT_ERROR_DOCUMENT_MANAGEMENT_LIST";

// REPORT
export const TIK_INITIALIZATION = "TIK_INITIALIZATION";
export const GET_TIK_TAB_DATA_TIK = "GET_TIK_TAB_DATA_TIK";
export const TIK_REPORTS = "TIK_REPORTS";
export const PROVIDER_INITIALIZATION_TIK_REPORTS_MANAGEMENT_LIST = "PROVIDER_INITIALIZATION_TIK_REPORTS_MANAGEMENT_LIST";
export const PROVIDER_TIK_REPORTS_SUCCESS_MANAGEMENT_LIST_SUCCESS = "PROVIDER_TIK_REPORTS_SUCCESS_MANAGEMENT_LIST_SUCCESS";
export const TIK_REPORTS_ERROR = "TIK_REPORTS_ERROR";
export const TOR_REPORTS = "TOR_REPORTS";
export const PROVIDER_INITIALIZATION_TOR_REPORTS_MANAGEMENT_LIST = "PROVIDER_INITIALIZATION_TOR_REPORTS_MANAGEMENT_LIST";
export const PROVIDER_TOR_REPORTS_SUCCESS_MANAGEMENT_LIST_SUCCESS = "PROVIDER_TOR_REPORTS_SUCCESS_MANAGEMENT_LIST_SUCCESS";
export const TOR_REPORTS_ERROR = "TOR_REPORTS_ERROR";
export const TOR_REPORTS_ROLE = "TOR_REPORTS_ROLE";
export const TEAM_REPORTS = "TEAM_REPORTS";
// Reports
export const TO_RECEIVER_API = "TO_RECEIVER_API";
export const TO_RECEIVER_API_SUCCESS = "TO_RECEIVER_API_SUCCESS";
export const TO_RECEIVER_API_ERROR = "TO_RECEIVER_API_ERROR";
export const FROM_PROVIDER_API = "FROM_PROVIDER_API";
export const FROM_PROVIDER_API_SUCCESS = "FROM_PROVIDER_API_SUCCESS";
export const FROM_PROVIDER_API_ERROR = "FROM_PROVIDER_API_ERROR";
export const PROVIDER_INITIALIZATION_ADVANCESEARCH = "PROVIDER_INITIALIZATION_ADVANCESEARCH";
export const PROVIDER_ADVANCESEARCH = "PROVIDER_ADVANCESEARCH";
export const PROVIDER_ADVANCESEARCH_SUCCESS = "PROVIDER_ADVANCESEARCH_SUCCESS";
export const PROVIDER_ADVANCESEARCH_ERROR = "PROVIDER_ADVANCESEARCH_ERROR";
export const ADVANCE_SEARCH_VALUES = "ADVANCE_SEARCH_VALUES";
export const PROVIDER_INITIALIZATION_SIMPLESEARCH = "PROVIDER_INITIALIZATION_SIMPLESEARCH";
export const PROVIDER_SIMPLESEARCH = "PROVIDER_SIMPLESEARCH";
export const TOR_REPORTS_ROLE_SUCCESS = "TOR_REPORTS_ROLE_SUCCESS";
export const SIMPLE_SEARCH_VALUES = "SIMPLE_SEARCH_VALUES";
export const CLEAR_SEARCH_VALUES = "CLEAR_SEARCH_VALUES";
// autoSave
export const PROVIDER_EDIT_AUTO_SAVE_TEMPLATE_MANAGEMENT_LIST = "PROVIDER_EDIT_AUTO_SAVE_TEMPLATE_MANAGEMENT_LIST";
export const PROVIDER_EDIT_AUTO_SAVE_TEMPLATE_MANAGEMENT_SUCCESS = "PROVIDER_EDIT_AUTO_SAVE_TEMPLATE_MANAGEMENT_SUCCESS";
export const PROVIDER_EDIT_AUTO_SAVE_TEMPLATE_MANAGEMENT_ERROR = "PROVIDER_EDIT_AUTO_SAVE_TEMPLATE_MANAGEMENT_ERROR";

// SUBSCRIPTION
export const GET_SUBSCRIPTION = "GET_SUBSCRIPTION";
export const GET_SUBSCRIPTION_SUCCESS = "GET_SUBSCRIPTION_SUCCESS";
export const SUBSCRIPTION_SELECTION_SUCCESS = "SUBSCRIPTION_SELECTION_SUCCESS";
export const SUBSCRIPTION_SELECTION = "SUBSCRIPTION_SELECTION";
export const GET_MYPLAN_SUCCESS = "GET_MYPLAN_SUCCESS";
export const GET_MYPLAN = "GET_MYPLAN";
export const SUBSCRIPTION_UPDATE_SELECTION = "SUBSCRIPTION_UPDATE_SELECTION";
export const GET_INVOICE_DETAIL = "GET_INVOICE_DETAIL";
export const GET_INVOICE_DETAIL_SUCCESS = "GET_INVOICE_DETAIL_SUCCESS";
export const SUBSCRIPTION_ERROR = "SUBSCRIPTION_ERROR";
export const SUBSCRIPTION_ERROR_FALSE = "SUBSCRIPTION_ERROR_FALSE";
export const SUBSCRIPTION_PAYABLE_SUCCESS = "SUBSCRIPTION_PAYABLE_SUCCESS";
export const SUBSCRIPTION_PAYABLE = "SUBSCRIPTION_PAYABLE";
export const PAYABLE_AMOUNT = "PAYABLE_AMOUNT";
export const NEW_SUBSCRIPTION = "NEW_SUBSCRIPTION";
export const PROMO_SUCCESS = "PROMO_SUCCESS";
export const PROMO = "PROMO";

// PAYMENT
export const PAYMENT_USER = "PAYMENT_USER";
export const CUSTOMER_PAYMENT_DETAIL = "CUSTOMER_PAYMENT_DETAIL";
export const CUSTOMER_PAYMENT_DETAIL_SUCCESS = "CUSTOMER_PAYMENT_DETAIL_SUCCESS";
export const CARD_PAYMENT = "CARD_PAYMENT";
export const CARD_PAYMENT_SUCCESS = "CARD_PAYMENT_SUCCESS";
export const CARD_REMOVE = "CARD_REMOVE";
export const CARD_REMOVE_SUCCESS = "CARD_REMOVE_SUCCESS";
export const CARD_ERROR = "CARD_ERROR";

// ANALYTICS
export const GENERATE_KEY = "GENERATE_KEY";
export const GENERATE_KEY_SUCCESS = "GENERATE_KEY_SUCCESS";
export const LOG_LIST_SUCCESS = "LOG_LIST_SUCCESS";
export const LOG_LIST = "LOG_LIST";
export const LOG_LIST_DETAIL_SUCCESS = "LOG_LIST_DETAIL_SUCCESS";
export const LOG_LIST_DETAIL = "LOG_LIST_DETAIL";
export const LOG_REPORT = "LOG_REPORT";
export const LOG_REPORT_SUCCESS = "LOG_REPORT_SUCCESS";

// HELP
export const TICKET_LIST = "TICKET_LIST";
export const TICKET_LIST_SUCCESS = "TICKET_LIST_SUCCESS";
export const TICKET_SUBMIT_SUCCESS = "TICKET_SUBMIT_SUCCESS";
export const TICKET_SUBMIT = "TICKET_SUBMIT";

// TRANSACTION
export const TRANSACTION_LIST_SUBMIT = "TRANSACTION_LIST_SUBMIT";
export const TRANSACTION_LIST = "TRANSACTION_LIST";
export const TRANSACTION_DETAIL_SUCCESS = "TRANSACTION_DETAIL_SUCCESS";
export const TRANSACTION_DETAIL = "TRANSACTION_DETAIL";

// NOTIFICATION

export const NOTIFICATION_SUCCESS = "NOTIFICATION_SUCCESS";
export const NOTIFICATION = "NOTIFICATION";
export const SOCKET_NOTIFICATION_SUCCESS = "SOCKET_NOTIFICATION_SUCCESS";
export const SOCKET_NOTIFICATION = "SOCKET_NOTIFICATION";
export const FCM_UPDATE = "FCM_UPDATE";