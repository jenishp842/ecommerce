import React, { Component } from "react";
import { TextInput, Button } from './index.jsx';
import { Formik } from 'formik';
import docVerifySchema from '../schema/docVerifySchema.js';
import { connect } from "react-redux";
import * as actions from "../actions";

class DocVerifyForm extends Component {

  constructor(props) {
    super(props);
    this.props.paymentUser()
  }
  componentDidUpdate(prevProps) {
    if (this.props.providerDocumentVerification) {
      this.props.history.push('/genAgreement');
    }
  }
 
  handleSubmit = (values) => {
    const duns = values.DNSNo;
    const regNo = values.regNo;
    this.props.providerDocumentVerification({ duns, organizationName: regNo });
    // this.props.history.push('/genAgreement');
  }


  render() {
    return (
      <>
        <Formik
          initialValues={{
            DNSNo: '',
            regNo: '',
          }}
          validationSchema={docVerifySchema}
          onSubmit={this.handleSubmit}>
          {({
            values,
            errors,
            touched,
            handleSubmit,
            setFieldValue,
            setFieldTouched,
          }) => {
            return (
              <>
                <form>

                  <TextInput
                    type="text"
                    name="DNSNo"
                    id={'dns'}
                    placeholder={"Enter DUNS Number"}
                    error={errors.DNSNo}
                    onChange={value => setFieldValue('DNSNo', value)}
                    value={values.DNSNo}
                    className={'form-control mt-5'}
                    showError={touched.DNSNo && errors.DNSNo}
                    onBlur={() =>
                      !touched.DNSNo && setFieldTouched('DNSNo', true, true)
                    }
                  />
                  <TextInput
                    type="text"
                    name="regNo"
                    id={'regNo'}
                    placeholder={"Organization Registered Name"}
                    error={errors.regNo}
                    className={'form-control mt-4'}
                    onChange={value => setFieldValue('regNo', value)}
                    value={values.regNo}
                    showError={touched.regNo && errors.regNo}
                    onBlur={() =>
                      !touched.regNo && setFieldTouched('regNo', true, true)
                    }
                  />

                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    buttonText={'Submit'}
                    className={'btn box-shd-hover-org btn-primary my-5 w-100 f-18 f-b'}
                  />

                </form>
              </>
            );
          }}

        </Formik>

      </>
    );
  }
}

const mapStateToProps = (state) => ({
  documentVerification: state.Auth.documentVerification,
});

const mapDispatchToProps = (dispatch) => ({
  providerDocumentVerification: (payload) => dispatch(actions.providerDocumentVerification(payload)),
  paymentUser: () => dispatch(actions.paymentUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DocVerifyForm);
