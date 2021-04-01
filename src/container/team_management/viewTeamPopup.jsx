/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import { Modal, TextInput, Button, DropDown, TextArea } from "../../component/index.jsx";
import { Formik } from "formik";
import { Multiselect } from 'multiselect-react-dropdown';

const style = {
  inputField: {
    borderColor: 'black',
    borderWidth: '1px'
  },
  chips: {
    background: 'black'
  },

  option: {
    background: 'none',
    color: 'black',
    borderBottomWidth: '1px',
    borderColor: 'black',
  },
}
export default class ViewTeamPopup extends Component {

  getTeamManagerName = (name) => {
    const { userList } = this.props;
    const data = userList.filter(data => data.firstName === name);

    return data
  }

  getInitialValues = (memberArray) => {
    let value = []
    memberArray.length > 0 ?
      memberArray.map((data) => {
        value.push({ name: data.firstName, id: data.id })
      })
      : null

    return value
  }

  clearForm = (resetForm) => {
    this.multiselectRef.current.resetSelectedValues();
    resetForm();
  }

  render() {
    const { closePopup, viewData, team } = this.props;
    const { successLoader } = team;
    const { name, teamManager, members, desc } = viewData;

    let selectedValue = this.getInitialValues(members);
    let getTeamManager = this.getTeamManagerName(teamManager)
    return (
      <>
        <Modal closePopup={closePopup}>
          <Formik
            initialValues={{
              teamName: name ? name : null,
              manager_name: getTeamManager.length > 0 ? getTeamManager[0]._id : null,
              description: desc
            }}
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
                    <h4 class="modal-title text-center f-24 mb-5 f-b" id="nTeamTitle">View Team</h4>
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
                          disabled={true}
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
                            disabled={true}
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

                            selectedValues={selectedValue}
                            onSelect={this.onSelect}
                            onRemove={this.onRemove}
                            displayValue="name"
                            placeholder=""
                            style={style}
                            ref={this.multiselectRef}
                            closeIcon={'cancel'}
                            disable={true}
                          />
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
                          disabled={true}
                          onBlur={() =>
                            !touched.description &&
                            setFieldTouched("description", true, true)
                          }
                        />
                      </div>
                    </div>
                    {/* <div class="d-flex">
                      <Button
                        type="button"
                        buttonText="Clear"
                        className="m-1 clear_button"
                        onClick={() => this.clearForm(resetForm)}
                      />
                      <Button
                        type="submit"
                        onClick={handleSubmit}
                        buttonText={successLoader ? <i class="fa fa-refresh fa-spin"></i> : "Edit Team"}
                        className="m-1"
                      />
                    </div> */}
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
