import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  WithLayoutContainer, TikHistoryTable,
} from '../../component/index.jsx';
import * as actions from '../../actions';
import { formatTime, formatDate } from '../../helper/utility.js';
import { searchMapper } from '../../constants/Mapper.js';
import moment from 'moment';

let dataTable = {
  titles: searchMapper,
  data: [],
};

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: false,
      metaFlag: false,
    };
  }

  componentDidMount() {
    this.props.getMetaListInfo();
    this.props.getTemplateListInfo({ whiteList: true });
  }

  getIndexofMetaFiled = () => {
    const { metaList } = this.props;
    const finalMetaList = [];
    dataTable.titles.map((data) => {
      metaList.filter((item) => {
        if (data.id == item.name && data.isDropdownShow) {
          finalMetaList.push(data);
        }
      });
    });
    return finalMetaList;
  }

  getIndexofMetaFiledAdd = () => {
    const finalMetaList = [];
    dataTable.titles.map((data) => {
      if (!data.isDropdownShow) {
        finalMetaList.push(data);
      }
    });
    return finalMetaList;
  }

  addMetaFiled = (titleObject, value) => {
    if (value === 'plus') {
      let valueArray = [];
      valueArray = this.getIndexofMetaFiledAdd();

      const index = dataTable.titles.findIndex((x) => x.id === valueArray[0].id);
      if (dataTable.titles[index]) {
        dataTable.titles[index].isDropdownShow = !dataTable.titles[index].isDropdownShow;
      }
    } else {
      const index = dataTable.titles.findIndex((x) => x.id === titleObject.id);
      if (dataTable.titles[index]) {
        dataTable.titles[index].isDropdownShow = !dataTable.titles[index].isDropdownShow;
      }
    }
    this.setState({
      flag: true,
    });
  }

  removeSeachValue = (name, value) => {
    const { advanceSearchValue } = this.props;
    const { tags, from, to } = advanceSearchValue;
    // let finalobj = advanceSearchValue;
    let finalobj = Object.assign({}, advanceSearchValue);
    let finalAdvanceSearch = Object.assign({}, advanceSearchValue);

    finalobj['form'] = finalobj['from'];
    finalAdvanceSearch['form'] = finalAdvanceSearch['from'];
    finalobj['tag'] = finalobj['tags'];

    if (name === 'tags') {
      let finalTagValue = [];

      tags.map((item) => {
        if (item !== value) {
          finalTagValue.push(item);
        }
      });

      finalobj['tag'] = finalTagValue;
      finalAdvanceSearch['tags'] = finalTagValue;
      finalAdvanceSearch['tag'] = finalTagValue;

      delete finalobj.tags;
    } else if (name === 'form') {
      let finalFromValue = [];
      let finalFromNameValue = [];

      from.map((item) => {
        if (item.id !== value.id) {
          finalFromValue.push(item.id);
          finalFromNameValue.push(item);
        }
      });


      delete finalobj.from;
      finalobj['form'] = finalFromValue;
      finalobj['from'] = finalFromValue;
      // finalobj['form'] = finalFromValue;

      finalAdvanceSearch['form'] = finalFromNameValue;
      finalAdvanceSearch['from'] = finalFromNameValue;
      // finalAdvanceSearch['form'] = finalFromNameValue;
    } else if (name === 'to') {

      let finalToValue = [];
      let finalToNameValue = [];

      to.map((item) => {
        if (item.id !== value.id) {
          finalToValue.push(item.id);
          finalToNameValue.push(item);
        }
      });
      finalobj['to'] = finalToValue;
      finalAdvanceSearch['to'] = finalToNameValue;

    } else {
      finalobj[name] = '';
      finalAdvanceSearch[name] = '';
    }

    let finalFromData = [];
    let finalToData = [];

    if (name !== 'form' || name !== 'to') {
      finalobj.form && finalobj.form.map((item) => finalFromData.push(item.id));
      finalobj.to && finalobj.to.map((item) => finalToData.push(item.id));

      finalobj['form'] = finalFromData;
      finalobj['from'] = finalFromData;
      finalobj['to'] = finalToData;
    }

    this.props.submitAdvanceSearch(finalobj, finalAdvanceSearch);
  }
  viewDraft = () => {
    return false
  }
  render() {
    const {
      searchData, metaList, advanceSearchValue, simpleSearchValues, templateList
    } = this.props;
    console.log('advanceSearchValue',advanceSearchValue)

    const { metaFlag } = this.state;
    dataTable = {
      titles: searchMapper,
      data: [],
    };

    if (searchData && searchData.length > 0) {
      dataTable.data = searchData.map((doc, key) => {
        const { createdAt } = doc;
        return {
          ...doc,
          ...{
            date: formatDate(createdAt),
            time: formatTime(createdAt),
          },
        };
      });
    }

    if (metaList.length > 0 && dataTable.titles.filter((data) => (data.id === metaList[0].name)).length === 0 && metaFlag === false) {
      metaList.length > 0 && metaList.map((item, key) => {
        if (key === 0 && dataTable.titles.filter((data) => (data.id === metaList[0].name)).length === 0) {
          dataTable.titles.splice(1, 0, {
            id: item.name, isSort: true, text: item.name, isDropdownShow: true,
          });
        } else {
          dataTable.titles.splice(key + 1, 0, {
            id: item.name, isSort: true, text: item.name, isDropdownShow: false,
          });
        }
      });
    }


    const metaField = this.getIndexofMetaFiled();

    const {
      category, from, status, tags, template, to,
    } = (typeof advanceSearchValue !== 'undefined' && advanceSearchValue) || {};

    let templateData = '';

    if (advanceSearchValue && template && templateList.length > 0) {
      templateData = templateList.filter((temp) => temp._id === template);
    }

    return (
      <WithLayoutContainer>
        <div id="searchAll" className="wrapper wrapper-content">
          <div className="row">
            <div className="col-xl-12">
              <div id="changingContent" className="containerBox">
                <div>
                  {/* <div className="table-title">
                    <h2 className="f-b mb-4 mt-0">Search</h2>
                  </div> */}
                  <div className="table-title mb-2">
                    <h2 className="f-b mb-4 mt-0 d-inline">
                      Search :
                    </h2>
                    <div className="sTag d-inline">

                      {advanceSearchValue && status
                        && (
                          <span onClick={() => this.removeSeachValue('status', status)}>
                            {status == 'Update_Required' ? 'Update Required': status}
                            <a><i className="fa fa-times-circle" aria-hidden="true" /></a>
                          </span>
                        )}

                      {advanceSearchValue && category
                        && (
                          <span onClick={() => this.removeSeachValue('category', category)}>
                            {category}
                            <a><i className="fa fa-times-circle" aria-hidden="true" /></a>
                          </span>
                        )}

                      {advanceSearchValue && tags.length > 0
                        && tags.map((tags, keys) => {
                          return (
                            <span key={keys} onClick={() => this.removeSeachValue('tags', tags)}>
                              {tags}
                              <a><i className="fa fa-times-circle" aria-hidden="true" /></a>
                            </span>
                          )
                        })}

                      {advanceSearchValue && from.length > 0
                        && from.map((emails, keys) => {
                          return (
                            <span key={keys} onClick={() => this.removeSeachValue('form', emails)}>
                              {emails.name}
                              <a><i className="fa fa-times-circle" aria-hidden="true" /></a>
                            </span>
                          )
                        })}

                      {advanceSearchValue && to.length > 0
                        && to.map((emails, keys) => {
                          return (
                            <span key={keys} onClick={() => this.removeSeachValue('to', emails)}>
                              {emails.name}
                              <a><i className="fa fa-times-circle" aria-hidden="true" /></a>
                            </span>
                          )
                        })}

                      {templateData && templateData.length > 0 &&
                        (
                          <span onClick={() => this.removeSeachValue('template', templateData[0].template_name)}>
                            {templateData[0].template_name}
                            <a><i className="fa fa-times-circle" aria-hidden="true" /></a>
                          </span>
                        )}
                    </div>
                  </div>
                  <div className="table-responsive fixHeight">
                    <TikHistoryTable
                      dataTable={dataTable}
                      defaultSort="documentStatus"
                      search
                      metaList={metaList}
                      addMetaFiled={this.addMetaFiled}
                      metaFieldData={metaField}
                      action={false}
                      viewDraft={this.viewDraft}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </WithLayoutContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  searchData: state.Search.searchData,
  searchLoader: state.Search.searchLoader,
  metaList: state.Tik.metaList,
  advanceSearchValue: state.Search.advanceSearchValueData,
  simpleSearchValues: state.Search.simpleSearchValues,
  templateList: state.Template.templateList,
});

const mapDispatchToProps = (dispatch) => ({
  simpleAdvanceSearch: (data) => dispatch(actions.submitSimpleSearch(data)),
  getMetaListInfo: () => dispatch(actions.getMetaListInfo()),
  // submitAdvanceSearch: (data) => dispatch(actions.submitAdvanceSearch(data)),
  submitAdvanceSearch: (data, advanceSearchValueData) => dispatch(actions.submitAdvanceSearch(data, advanceSearchValueData)),
  getTemplateListInfo: (payload) => dispatch(actions.getTemplateListInfo(payload)),

});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
