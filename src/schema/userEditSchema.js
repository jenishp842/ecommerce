import * as Yup from 'yup';

const userEditSchema = Yup.object({
  name: Yup.string()
    .required('Name is required!'),
  roleUser: Yup.string()
    .required('Role is required!'),

  // roleCheckbox: Yup.array().required(
  //   'At least one checkbox is required',
  // ),
  // tikCheckbox: Yup.array().required(
  //   'At least one checkbox is required',
  // ),
  // paymentCheckbox: Yup.array().required(
  //   'At least one checkbox is required',
  // ),
  // templatesCheckbox: Yup.array().required(
  //   'At least one checkbox is required',
  // ),
  // inVoiceCheckbox: Yup.array().required(
  //   'At least one checkbox is required',
  // ),
});

export default userEditSchema;
