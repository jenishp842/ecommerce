import * as Yup from 'yup';

const authenticationFormSchema = Yup.object({
  otp: Yup.number()
    .typeError('Value must be a number.')
    .integer('Value must be a number.')
    .required('Required.'),
});

export default authenticationFormSchema;
