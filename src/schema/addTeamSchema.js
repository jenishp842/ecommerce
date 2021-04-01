/* eslint-disable function-paren-newline */
import * as Yup from 'yup';

const addTeamSchema = Yup.object({
  teamName: Yup.string()
    .required('Team Name is required!'),
  manager_name: Yup.string()
    .required('Manager name is required!').nullable(),
  employee_name: Yup.array()
    .required('At least one employee is required'),
  description: Yup.string()
    .required('Description is required!'),
  // employee_name: Yup.string()
  //   .required('Employee name is required!'),
  // empName: Yup.string()
  //   .required('Employee Email is required!'),
});

export default addTeamSchema;
