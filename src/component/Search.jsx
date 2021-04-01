/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable no-dupe-class-members */
/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Formik } from 'formik';
import {
  SearchForm, TextInput,
} from './index.jsx';
import * as actions from '../actions';

class AdvanceSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFlag: false,
      searchValue: '',
    };
    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  handleSearchFlag = () => {
    this.setState({
      searchFlag: !this.state.searchFlag,
    });
  }

  handleClickOutside(event) {
    if (this.wrapperRef && this.wrapperRef.current && !this.wrapperRef.current.contains(event.target)) {
      this.setState({
        searchFlag: false,
        advanceSearch: false,
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleAdvanceSearch = async (values, advanceSearchValueData) => {
    console.log('search',values)
    await this.props.submitAdvanceSearch(values, advanceSearchValueData);
    return true;
  }

  advanceSearch = async (values, advanceSearchValueData) => {
    this.setState({
      searchFlag: false,
    });

    this.handleAdvanceSearch(values, advanceSearchValueData)
      .then((res) => {
        this.props.history.push('/search');
        return true;
      })
      .catch((err) => console.log(`There was an error:${err}`));
  }

  componentDidMount() {
    const { searchValue } = this.state;
    document.addEventListener('mousedown', this.handleClickOutside);
    this.props.toReceiverAPI(searchValue);
    this.props.toProviderAPI(searchValue);
    this.props.getTemplateListInfo({ whiteList: true });
  }
  componentDidUpdate(prevprops) {
    if (prevprops.specialFeatures != this.props.specialFeatures) {
      this.props.specialFeatures &&
        this.props.specialFeatures.map((e) => {
          if (e.featureName == "advance_tik_search") {
            this.setState({ advanceSearch: true });
          }
        });
    }
  }
  componentWillUnmount() {
    if (window.location.pathname !== '/search') {
      this.props.clearSearchValue();
    }
  }

  handleSimpleSearch = async (values) => {
    await this.props.submitSimpleSearch(values);
    return true;
  }

  clearAdvanceSearchValue = () => {
    this.props.clearSearchValue();
  }
  handleSearch = () => {
    const { searchValue } = this.state;
    if(searchValue != ''){
      this.handleSimpleSearch(searchValue)
      .then((res) => {
        this.props.history.push('/search');
        return true;
      })
      .catch((err) => console.log(`There was an error:${err}`));
  }
    }
  

  render() {
    const { searchFlag, searchValue } = this.state;
    const {
      toReceiverData, fromProviderData, templateList, advanceSearchValue, simpleSearchValues,
    } = this.props;
    return (
      <>
        <form role="search" className="search navbar-form-custom form-inline" ref={this.wrapperRef}  onSubmit={(e) => e.preventDefault()}>
          <div className="form-group dropdown">
            {true && <a className="filter dropdown-toggle" id="searchDrop" onClick={() => this.handleSearchFlag()}><i className="fa fa-chevron-down" /></a>}
            <div>
              <Formik
                initialValues={{
                  searchValue: searchValue || simpleSearchValues,
                }}
              >
                {({
                  values,
                  setFieldValue,
                }) => (
                    <>
                      <TextInput
                        type="text"
                        name="top-search"
                        id="top-search"
                        placeholder="Search Tik..."
                        onChange={(value) => {
                          setFieldValue('searchValue', value);
                            this.setState({
                              searchValue: value,
                            });
                        }}
                        className="form-control dull"
                        value={values.searchValue}
                      />
                    </>
                  )}
              </Formik>
            </div>
            <div className="search-wrapper">
              {searchFlag
                ? <SearchForm advanceSearchValue={advanceSearchValue} advanceSearch={this.advanceSearch} toReceiverData={toReceiverData} fromProviderData={fromProviderData} templateList={templateList} clearAdvanceSearchValue={this.clearAdvanceSearchValue} /> : ''}
            </div>
          </div>
          <a className="btn btn-primary f-18 ml-2 search-btn" onClick={() => this.handleSearch()}>
            <i className="fa fa-search" />
          </a>
        </form>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  toReceiverData: state.Search.toReceiverData,
  fromProviderData: state.Search.toProviderData,
  templateList: state.Template.templateList,
  searchData: state.Search.searchData,
  advanceSearchValue: state.Search.advanceSearchValue,
  simpleSearchValues: state.Search.simpleSearchValues,
  specialFeatures: state.Subscription.specialFeatures,
});
const mapDispatchToProps = (dispatch) => ({
  getTemplateListInfo: (payload) => dispatch(actions.getTemplateListInfo(payload)),
  toReceiverAPI: () => dispatch(actions.toReceiverAPI()),
  toProviderAPI: () => dispatch(actions.toProviderAPI()),
  submitAdvanceSearch: (data, advanceSearchValueData) => dispatch(actions.submitAdvanceSearch(data, advanceSearchValueData)),
  submitSimpleSearch: (data) => dispatch(actions.submitSimpleSearch(data)),
  clearSearchValue: () => dispatch(actions.clearSearchValue()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdvanceSearch));
