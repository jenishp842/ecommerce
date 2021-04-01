/* eslint-disable arrow-body-style */
/* eslint-disable arrow-parens */
import * as Yup from 'yup';

const rolesSchema = Yup.object({
  roleName: Yup.string()
    .required('Role name is required!'),
  roleCheckbox: Yup.array().test(
    'test-atleastonetrue',
    'At least one checkbox is required',
    (roleCheckbox) => roleCheckbox.some((value) => value === true),
  ),
});

export default rolesSchema;
