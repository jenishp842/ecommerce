import * as Yup from 'yup';

const createTemplateSchema = Yup.object().shape({
  template_name: Yup.string()
    .required('Required!'),
  template_type: Yup.string()
    .required('Required!'),
  attribute: Yup.array()
    .of(
      Yup.object().shape({
        attribute_name: Yup.string()
          .required('Required!'),
        attribute_dropdown: Yup.string()
          .required('Required!'),
        // include_in_thumbnail: Yup.bool().required([true], ' required'),
      }).nullable().required(),
    ),
});

export default createTemplateSchema;
