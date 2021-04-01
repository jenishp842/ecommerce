/* eslint-disable arrow-body-style */
/* eslint-disable arrow-parens */
import * as Yup from 'yup';

const searchSchema = Yup.object({
  status: Yup.string()
    .required('status is required!'),
  roleCheckbox: Yup.array().test(
    'test-atleastonetrue',
    'At least one checkbox is required',
    (roleCheckbox) => roleCheckbox.some((value) => value === true),
  ),
});

// status: '',
//   // category: '',
//   from: '',
//     to: '',
//       createDateFrom: new Date(),
//         createDateTo: new Date(),
//           template: '',

export default searchSchema;
