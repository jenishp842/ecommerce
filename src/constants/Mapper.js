/* eslint-disable import/extensions */
import acceptance from "../assets/img/Acceptance.png";
import Permit from "../assets/img/Permit.png";
import Transcript from "../assets/img/Transcript.png";
import Diploma from "../assets/img/Diploma.png";
import Note from "../assets/img/Note.png";
import Receipt from "../assets/img/Receipt.png";
import Prescription from "../assets/img/Prescription.png";
import Membership from "../assets/img/Membership.png";
import Ticket from "../assets/img/Ticket.png";
import Privilege from "../assets/img/Privilege.png";
import Achievement from "../assets/img/Achievement.png";
import certificate from "../assets/img/certificate.png";
import License from "../assets/img/License.png"
import white_bg  from "../assets/img/plain-white-background.jpg"

export const teamListMapper = {
  members: 'Total User',
  name: 'Team Name',
  teamManager: 'Manager Name',
  online: 'Online',
};

export const roleObject = {
  create: 'create',
  view: 'view',
  access: 'access',
  update: 'update',
};

export const roleListMapper = {
  totalUser: 'Total User',
  roleName: 'Role Name',
  teamManager: 'Manager Name',
  createdAt: 'Created At',
  createdBy: 'Created By',
};

export const userListMapper = {
  email: 'Email',
  firstName: 'Name',
  role: 'Role',
};

export const roleAccessMapper = {
  role: ['create', 'delete', 'update', 'view'],
  document: ['create', 'update', 'view'],
  template: ['create', 'delete', 'update', 'view'],
  invoice: ['view'],
  payment: ['access'],
};

export const roleListingTitle = [
  {
    id: 'sr_no',
    isSort: true,
    text: 'Sr. No',
  },
  {
    id: 'roleName',
    isSort: true,
    text: 'Role Name',
  },
  {
    id: 'createdBY',
    isSort: true,
    text: 'Created By',
  },
  {
    id: 'totalUser',
    isSort: true,
    text: 'Total User',
  },
  {
    id: 'date',
    isSort: true,
    text: 'Date',
  },
  {
    id: 'time',
    isSort: true,
    text: 'Time',
  },
];

export const teamListingTitle = [
  {
    id: 'sr_no',
    isSort: true,
    text: 'Sr. No',
  },
  {
    id: 'name',
    isSort: true,
    text: 'Team Name',
  },
  {
    id: 'teamManager',
    isSort: true,
    text: 'Manager Name',
  },
  {
    id: 'totalUser',
    isSort: true,
    text: 'Total User',
  },
  {
    id: 'date',
    isSort: true,
    text: 'Date',
  },
  {
    id: 'time',
    isSort: true,
    text: 'Time',
  },
];

export const userListingTitle = [
  {
    id: 'sr_no',
    isSort: true,
    text: 'Sr. No',
  },
  {
    id: 'firstName',
    isSort: true,
    text: 'Name',
  },
  {
    id: 'email',
    isSort: true,
    text: 'Email Address',
  },
  {
    id: 'createdBY',
    isSort: true,
    text: 'Created By',
  },
  {
    id: 'role',
    isSort: true,
    text: 'Role',
  },
  {
    id: 'date',
    isSort: true,
    text: 'Date',
  },
  {
    id: 'time',
    isSort: true,
    text: 'Time',
  },
];

export const navigationMapper = {
  docHistory: 'docHistory',
  teamM: 'teamMgnt',
  roleM: 'roleMgnt',
  userM: 'userMgnt',
  template: 'template',
  team: 'team',
  integration: 'integration',
  analytics: 'analytics',
  'api-usage': 'api-usage',
  docReport: 'docReport',
  tik_report: 'tik-report',
  tor_reports: 'tor-report',
  team_reports: 'team-report',
  transaction: 'transaction',
};

export const TemplateListingTitle = [
  {
    id: 'sr_no',
    isSort: true,
    text: 'Sr. No',
  },
  {
    id: 'template_name',
    isSort: true,
    text: 'Name',
  },
  {
    id: 'template_type',
    isSort: true,
    text: 'Type',
  },
  {
    id: 'attributeSize',
    isSort: true,
    text: 'No. of attribute',
  },
  {
    id: 'date',
    isSort: true,
    text: 'Date',
  },
  {
    id: 'time',
    isSort: true,
    text: 'Time',
  },
];

export const AnalystListingTitle = [
  {
    id: 'sr_no',
    isSort: true,
    text: 'Sr. No',
  },
  {
    id: 'request',
    isSort: true,
    text: 'Request',
  },
  {
    id: 'date',
    isSort: true,
    text: 'Date',
  },
  {
    id: 'time',
    isSort: true,
    text: 'Time',
  },
];

export const TransactionHistory = [
  {
    id: 'sr_no',
    isSort: true,
    text: 'Sr. No',
  },
  {
    id: 'subscription_date',
    isSort: true,
    text: 'Subscription Date',
  },
  {
    id: 'subscription_time',
    isSort: true,
    text: 'Subscription Time',
  },
  {
    id: 'subscription_plan',
    isSort: true,
    text: 'Subscription Plan',
  },
  {
    id: 'amount',
    isSort: true,
    text: 'Amount',
  },
];

export const documentMapper = [
  {
    id: 'documentStatus',
    isSort: true,
    text: 'Status',
    isDropdownShow: true,
  },
  {
    id: 'type',
    isSort: true,
    text: 'Category',
    isDropdownShow: true,
  },
  // {
  //   id: 'meta_field',
  //   text: 'Meta Field',
  // },
  {
    id: 'date',
    isSort: true,
    text: 'Date',
    isDropdownShow: true,
  },
  {
    id: 'time',
    isSort: true,
    text: 'Time',
    isDropdownShow: true,
  },
];

export const searchMapper = [
  {
    id: 'documentStatus',
    isSort: true,
    text: 'Status',
    isDropdownShow: true,
  },
  {
    id: 'type',
    isSort: true,
    text: 'Category',
    isDropdownShow: true,
  },
  {
    id: 'date',
    isSort: true,
    text: 'Date',
    isDropdownShow: true,
  },
  {
    id: 'time',
    isSort: true,
    text: 'Time',
    isDropdownShow: true,
  },
];

export const documentFilter = {
  all: 'All',
  Accepted: 'Accepted Tiks',
  Update_Required: 'Update Required',
  Rejected: 'Rejected Tiks',
  Pending: 'Pending Tiks',
  'Shared with me': 'Shared with me',
  Drafts: 'Drafts',
  'archive-list': 'Archived Tiks',
};

export const documentFilterColorMapper = {
  Accepted: 'acceptdoc',
  Update_Required: 'updatetdoc',
  Rejected: 'rejectdoc',
  Pending: 'pendingdoc',
  'Shared with me': 'sharedoc',
  Drafts: 'draftdoc',
  'Archived Tiks': 'Archived Tiks',
};

export const imageMapperTemplate = {
  '': white_bg,
  'Acceptance Tik': acceptance,
  'e-Certificate': certificate,
  'e-Achievement': Achievement,
  'e-Privilege': Privilege,
  'e-Ticket': Ticket,
  'e-Membership': Membership,
  'e-Prescription': Prescription,
  'e-Receipt': Receipt,
  'e-Note': Note,
  'e-Diploma': Diploma,
  'e-Transcript': Transcript,
  'e-Permit': Permit,
  'e-License': License,
};
