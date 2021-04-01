import * as Yup from 'yup';

const forgotpasswordSchema = Yup.object({
  email: Yup.string()
    .email('E-mail is not valid!')
    .required('E-mail is required!'),
});

export default forgotpasswordSchema;
