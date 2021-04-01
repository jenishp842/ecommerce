/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import { Modal, TextInput, Button, DropDown, TextArea, } from "../../component/index.jsx";
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
export default class EditTeamPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      selectedItem: '',
      employeeList: []
    }
  };

  handleSubmit = (values) => {

    const { submitEditData, editData } = this.props;
    const { _id } = editData;

    let member = [];
    values.employee_name.map((data) => {
      member.push(data.id)
    })
    let finalObj = {};

    finalObj.name = values.teamName
      finalObj.teamManager = values.manager_name
      finalObj.desc = values.description
    finalObj.members = member
      finalObj.teamId = _id

    submitEditData(finalObj)
  }

  getInitialValues = (memberArray) => {
    let value = []
    memberArray.length > 0 ?
      memberArray.map((data) => {
        value.push({ name: data.firstName, id: data._id })

      })
      : null
    return value
  }


  getTeamManagerName = (name) => {
    const { userList } = this.props;
    const data = userList.filter(data => data.firstName === name);

    return data
  }
  clearForm = (resetForm, setFieldValue) => {

    resetForm({values: {teamName: '',
      manager_name:'',
      description: '',
      employee_name: ''}});
    const { members } = this.props.editData;
    setFieldValue('employee_name', this.getInitialValues(members))


  }

  render() {
    const { closePopup, editData, team } = this.props;
    const { successLoader } = team;
    const { name, teamManager, members, desc } = editData;
    let getTeamManager = this.getTeamManagerName(teamManager)

    console.log(getTeamManager, "getTeamManager")
    return (
      <>
        <Modal closePopup={closePopup}>
          <Formik
            initialValues={{
              teamName: name ? name : null,
              manager_name: getTeamManager.length > 0 ? getTeamManager[0]._id : '',
              description: desc,
              employee_name: this.getInitialValues(members) && this.getInitialValues(members)
            }}
            validationSchema={addTeamSchema}
            onSubmit={this.handleSubmit}
            enableReinitialize
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
                    <h4 class="modal-title text-center f-24 mb-5 f-b" id="nTeamTitle">Edit Team</h4>
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
                          <DropDown
                            options={this.props.userList.map((e, i) => ({ label: e.firstName, value: e._id }))}
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
                            error={errors.employee_name}
                            closeIcon={'cancel'}
                          />
                          <div className="formError"> {errors.employee_name ? errors.employee_name : null}</div>
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
                        onClick={() => this.clearForm(resetForm, setFieldValue)}
                      />
                      <Button
                        type="submit"
                        onClick={handleSubmit}
                        buttonText={successLoader ? <i class="fa fa-refresh fa-spin"></i> : "Edit Team"}
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