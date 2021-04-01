import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { WithLayoutContainer, Button } from '../../component/index.jsx';
import * as actions from '../../actions';
import Loader from '../../component/Loader.jsx'
import { toast } from 'react-toastify';
import { convertTemplateDataFromData } from '../../helper/utility.js';
import temp1 from "../../assets/img/temp1.png";
import search from "../../assets/img/search.png";

const SelectAcceptanceTemp = (props) => {
  const { location, templateUpdate } = props;
  const { state } = location;
  const { finalObj, editFlag } = state;

  const [selectTempId, selectAcceptanceTemp] = useState('');
  const [searchValue, handleSearchOnChangeValue] = useState('');

  const { selectedTemplate, selectedTemplateLoader, successLoader } = props;

  if (templateUpdate === true) {
    props.history.push('template');
  }
  if(props.error){
    props.history.push('/template')
    props.errorClear()
  }
  useEffect(
    () => {
      props.getSelectAcceptanceTempInfo(searchValue);

      if (editFlag) {
        selectAcceptanceTemp(finalObj.acceptance_form);
      }
    },
    {},
  );
  const previousButton = () => {
    const { location } = props;
    const { state } = location;
    const { finalObj, editFlag } = state;

    if (editFlag) {
      props.history.push('editTemp', { finalObj, selectTemp: true });
    } else {
      props.history.push('createTemp', { finalObj, selectTemp: true });
    }
  }

  const handleSubmit = () => {
    let temp1 = finalObj;
    if (selectTempId !== '') {
      temp1.acceptance_form = selectTempId;

      const finalData = convertTemplateDataFromData(temp1);

      if (editFlag) {
        props.editTemplate(finalData);
      } else {
        props.createTemplate(finalData);
      }

      if (templateUpdate === true) {
        this.props.history.push('template');
      }
      // props.history.push('template');
    } else {
      toast.error('Select document to continue');
    }
  }

  const handleSearch = () => {
    props.getSelectAcceptanceTempInfo(searchValue);
  }
  return (
    <WithLayoutContainer>
      <div id="userMgnt" className="wrapper wrapper-content">
        <div className="row">
          <div className="col-xl-12">
            <div className="containerBox pb-2">
              <div className=" ">
                <div className="table-title d-flex justify-content-between align-items-center mb-4">
                  <h2 className="f-b m-0">{editFlag == true ? 'Edit Template' : 'Create Template'}</h2>
                </div>
                <form role="search" className="search navbar-form-custom form-inline" action="#">
                  <div className="form-group dropdown">
                    <img className="searchImg" src={search} />
                    <input type="text" placeholder="Search Template..." class="form-control pl-5" value={searchValue} name="top-search" id="top-search" onChange={(e) => handleSearchOnChangeValue(e.target.value)} />
                  </div>
                  <a type="submit" className="btn btn-primary f-18 ml-2 f-m px-4" onClick={() => handleSearch()}>
                    Search
                    </a>
                </form>

                {selectedTemplateLoader &&
                  <Loader /> ||
                  <div className="fixHeight" style={{ maxHeight: 'calc(100vh - 360px)', marginTop: 20 }}>
                    <div className="selectTemplate">
                      <div className="card-deck">
                        {selectedTemplate.length > 0 ?
                          selectedTemplate.map((item, index) => {
                            return (
                              <div key={index} className={`card border-0  ${selectTempId === item._id ? 'selected' : ''} `} onClick={() => selectAcceptanceTemp(item._id)}>
                                <img className='card-img-top' src={temp1} alt="Card image cap" />
                                <div className="card-footer border-0 pl-0">
                                  <strong className="txt-blk f-18 ">{item.template_name}</strong>
                                </div>

                              </div>
                            )
                          })
                          : <div className="no-data"> No data </div>}
                      </div>
                    </div>
                  </div>}
                <div class="offset-lg-2 offset-md-2 col-lg-8 col-md-8 d-flex mt-2">

                  <Button
                    type="button"
                    buttonText="Previous"
                    className="m-1 clear_button"
                    onClick={() => previousButton()}
                  />
                  <Button
                    type="button"
                    buttonText={successLoader ? <i class="fa fa-refresh fa-spin"></i> : 'Submit'}
                    className="m-1"
                    onClick={() => handleSubmit()}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WithLayoutContainer>
  );
};

const mapStateToProps = (state) => ({
  templateList: state.Template.templateList,
  selectedTemplate: state.Template.selectedTemplate,
  selectedTemplateLoader: state.Template.selectedTemplateLoader,
  successLoader: state.Template.successLoader,
  templateUpdate: state.Template.templateUpdate,
  error: state.Auth.error
});


const mapDispatchToProps = (dispatch) => ({
  getSelectAcceptanceTempInfo: (searchValue) => dispatch(actions.getSelectAcceptanceTempInfo(searchValue)),
  createTemplate: (data) => dispatch(actions.createTemplate(data)),
  editTemplate: (data) => dispatch(actions.editTemplate(data)),
  errorClear: () => dispatch(actions.errorClear()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectAcceptanceTemp);
