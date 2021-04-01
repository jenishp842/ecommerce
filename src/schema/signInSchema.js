import * as Yup from 'yup';

const signInSchema = Yup.object({
  email: Yup.string()
    .email('E-mail is not valid!')
    .required('E-mail is required!'),
  password: Yup.string()
    .required('Password is required!'),
});

export default signInSchema;
