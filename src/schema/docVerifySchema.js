import * as Yup from 'yup';

const docVerifySchema = Yup.object({
  DNSNo: Yup.string()
    .required('Required!'),
  regNo: Yup.string()
    .required('Required!'),
});

export default docVerifySchema;
