import * as Yup from 'yup';

const userSchema = Yup.object({
  name: Yup.string()
    .required('Name is required!'),
  email: Yup.string()
    .email('E-mail is not valid!')
    .required('E-mail is required!'),
  roleUser: Yup.string()
    .required('Role is required!'),
  // mobile: Yup.number()
  //   .typeError('Value must be a number.')
  //   .integer('Value must be a number.')
  //   .required('Required.')
  //   .min(1000000000, 'Enter valid number')
  //   .max(9999999999, 'Enter valid number'),
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

export default userSchema;
