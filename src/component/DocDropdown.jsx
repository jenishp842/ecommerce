import React, { useEffect } from 'react';
import {
  Formik, FieldArray,
} from 'formik';
import { Checkbox } from "../component/index.jsx";

const DocDropdown = (props) => {
  let initialValues = []
  const { metaList, handleChange, dropdownFlag, titleObject } = props;

  const getIndexofMetaFiled = () => {
    let finalMetaList = []
    titleObject.map((data) => {
      metaList.filter((item) => {
        if (data.id == item.name) {
          finalMetaList.push(data.isDropdownShow)
        }
      })
    });
    return finalMetaList
  }

  initialValues = getIndexofMetaFiled();
  return (
    <div>
      <div class="dropdown-menu f-r show"
        aria-labelledby="metaDrop">
        <Formik
          enableReinitialize
          initialValues={{ metaFiled: initialValues }}>
          {({
            values,
            setFieldValue,
          }) => (
              <>
                <FieldArray
                  name="metaFiled"
                  render={arrayHelpers => (
                    <div>
                      {metaList.map((meta, index) => {
                        return (
                          <div key={index}>
                            <Checkbox
                              type="checkbox"
                              name={`metaFiled[${index}]`}
                              id={`metaFiled[${index}]`}
                              label={meta.name}
                              checked={values.metaFiled[index]}
                              disabled={values.metaFiled.filter((item) => item == true).length == 1 && values.metaFiled[index]}
                              onChange={(value) => {
                                let a = values.metaFiled;
                                a[index] = !values.metaFiled[index]
                                setFieldValue('metaFiled', a)
                                handleChange(meta, values.metaFiled)


                              }}
                            />
                          </div>
                        )
                      })}
                    </div>
                  )}
                />
              </>
            )}
        </Formik>
      </div>
    </div>
  );
};

export default DocDropdown;