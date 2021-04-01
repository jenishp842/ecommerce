/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import Axios from 'axios';

export const staticLabel = {
  reports: {
    title: 'Tik Report',
    tikReportsTab: [
      { label: '30 Days', value: '30day' },
      { label: '90 Days', value: '90day' },
      { label: '1 Year', value: '1year' },
      { label: 'All', value: 'all' },
    ],
    reportFrom: 'From',
    reportTo: 'To',
    totalNumberTik: 'Total number of tiks',
    averageTik: 'Average tik per day',
    totalNumberDay: 'Total number of days',
    percentageChange: 'Percentage of change',
    downloadCSV: 'Download as CSV',
    tikReportsTitle: 'Number of Tiks',
    XAxiosTitle: 'Time Elapsed',
  },
  addTag: {
    title: 'Tags',
    addTag: 'Add Tags',
    existingTags: 'Existing Tags',
    placeHolder: 'Enter Tags',
    button: 'Submit',
  },
  search: {
    labelStatus: 'Status',
    labelCategory: 'Category',
    labelTags: 'Tags',
    labelFrom: 'From',
    labelTo: 'To',
    labelCreationDate: 'Creation Date',
    labelTemplate: 'Template',
    status: [
      { label: 'Accepted', value: 'Accepted' },
      { label: 'Update', value: 'Update_Required' },
      { label: 'Rejected', value: 'Rejected' },
      { label: 'Pending', value: 'Pending' },
      { label: 'Shared', value: 'Shared' },
      { label: 'Drafts', value: 'Drafts' },
    ],
    category: [
      { label: 'Acceptance Tik', value: 'Acceptance Tik' },
      { label: 'e-Certificate', value: 'e-Certificate' },
      { label: 'e-Achievement', value: 'e-Achievement' },
      { label: 'e-Privilege', value: 'e-Privilege' },
      { label: 'e-Ticket', value: 'e-Ticket' },
      { label: 'e-Membership', value: 'e-Membership' },
      { label: 'e-Prescription', value: 'e-Prescription' },
      { label: 'e-Receipt', value: 'e-Receipt' },
      { label: 'e-Note', value: 'e-Note' },
      { label: 'e-Diploma', value: 'e-Diploma' },
      { label: 'e-Transcript', value: 'e-Transcript' },
      { label: 'e-Permit', value: 'e-Permit' },
      { label: 'e-License', value: 'e-License' },
    ],
  },
};
