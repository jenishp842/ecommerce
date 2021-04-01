/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import { Modal, TextInput, Button, DropDown, TextArea } from "../../component/index.jsx";
import { Formik } from "formik";
import addTeamSchema from "../../schema/addTeamSchema.js";
import { Multiselect } from 'multiselect-react-dropdown';

const style = {
  inputField: {
    borderColor: 'black',
    borderWidth: '1px'
  },
  chips: {
    background: '#9f9a9a'
  },
  optionContainer: {
    background: '##f5f0f0'
  },
  option: {
    background: 'none',
    color: 'black',
    borderBottomWidth: '1px',
    borderColor: 'black',
  },
}
export default class AddTeamPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      selectedItem: '',
      employeeList: [],
    };
    this.multiselectRef = React.createRef();
  };

  handleSubmit = (values) => {
    let finalObj = {};

    let member = [];
    values.employee_name.map((data) => {
      member.push(data.id)
    })

    finalObj.name = values.teamName
      finalObj.teamManager = values.manager_name
      finalObj.desc = values.description
      finalObj.members = member

      this.props.submitData(finalObj)
  }

  clearForm = (resetForm) => {
    resetForm();
    this.multiselectRef.current.resetSelectedValues();
  }

  render() {
    const { closePopup, team } = this.props;
    const { successLoader } = team;

    return (
      <>
        <Modal closePopup={closePopup}>
          <Formik
            initialValues={{
              teamName: '',
              manager_name: '',
              description: '',
              employee_name: [],
            }}
            validationSchema={addTeamSchema}
            onSubmit={this.handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleSubmit,
              setFieldValue,
              setFieldTouched,
              resetForm
            }) => {
              return (
                <>
                  <div class="modal-body pt-0 plr-5 pb-5">
                    <h4 class="modal-title text-center f-24 mb-5 f-b" id="nTeamTitle">Create Team</h4>
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label justify-content-start f-18 f-m">Team Name</label>
                      <div class="col-sm-8">
                        <TextInput
                          type="text"
                          name="teamName"
                          id={""}
                          placeholder={"Enter Team Name"}
                          onChange={(value) =>
                            setFieldValue("teamName", value)
                          }
                          error={errors.teamName}
                          value={values.teamName}
                          showError={
                            touched.teamName && errors.teamName
                          }
                          onBlur={() =>
                            !touched.teamName &&
                            setFieldTouched("teamName", true, true)
                          }
                        />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label justify-content-start f-18 f-m">Manager Name</label>
                      <div class="col-sm-8">
                        <div class="input-group">
                          <DropDown options={this.props.userList.map((e, i) => ({ label: e.firstName, value: e._id }))}
                            onChange={(value) =>
                              setFieldValue("manager_name", value)
                            }
                            placeholder={true}
                            error={errors.manager_name}
                            value={values.manager_name}
                            showError={
                              touched.manager_name && errors.manager_name
                            }
                            onBlur={() =>
                              !touched.manager_name &&
                              setFieldTouched("manager_name", true, true)
                            } />
                        </div>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label justify-content-start f-18 f-m">Add Employee</label>
                      <div class="col-sm-8">
                        <div class="input-group">
                          <Multiselect
                            options={this.props.userList.map((e, i) => ({ name: e.firstName, id: e._id }))}
                            selectedValues={values.employee_name}
                            onSelect={(selectedList) => {
                              setFieldValue("employee_name", selectedList);
                            }}
                            onRemove={(selectedList) => {
                              setFieldValue("employee_name", selectedList);
                            }}
                            displayValue="name"
                            placeholder="Select Employee"
                            style={style}
                            closeIcon={'cancel'}
                            ref={this.multiselectRef}
                          />
                          <div className="formError"> {errors.employee_name}</div>
                        </div>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label justify-content-start f-18 f-m">Description</label>
                      <div class="col-sm-8">
                        <TextArea
                          name="description"
                          id={""}
                          placeholder={''}
                          onChange={(value) =>
                            setFieldValue("description", value)
                          }
                          error={errors.description}
                          value={values.description}
                          showError={
                            touched.description && errors.description
                          }
                          onBlur={() =>
                            !touched.description &&
                            setFieldTouched("description", true, true)
                          }
                        />
                      </div>
                    </div>
                    <div class="d-flex">
                      <Button
                        type="button"
                        buttonText="Clear"
                        className="m-1 clear_button"
                        onClick={() => this.clearForm(resetForm)}
                      />
                      <Button
                        type="submit"
                        onClick={handleSubmit}
                        buttonText={successLoader ? <i class="fa fa-refresh fa-spin"></i> : "Create Team"}
                        className="m-1"
                      />
                    </div>
                  </div>
                </>
              );
            }}
          </Formik>
        </Modal>

      </>

    );
  }
}
