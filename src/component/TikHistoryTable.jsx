import React, { Component } from "react";
import _ from "lodash";
import Loader from "./Loader.jsx";
import {
  documentFilterColorMapper,
  documentFilter,
} from "../constants/Mapper.js";
import arch from "../assets/img/arc.png";
import sort_both from "../assets/img/sort_both.png";
import sort_asc from "../assets/img/sort_asc.png";
import sort_desc from "../assets/img/sort_desc.png";
import tag from "../assets/img/tag.png";
import unarch from "../assets/img/unarch.png";
import minus from "../assets/img/minus.svg";
import plus from "../assets/img/plus.svg";
import refresh from "../assets/img/refresh.png";
import edit from "../assets/img/edit.png";
import dlt from "../assets/img/dlt.png";

export default class TikHistoryTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: props.defaultSort,
      sortType: "asc",
      defaultIcon: sort_both,
      dropdownFlag: false,
      dropdownData: [],
    };
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  handleSorting = (titleObject) => {
    this.setState(
      {
        sort: titleObject.id,
      },
      () => {
        const { sort, sortType } = this.state;
        if (sort === titleObject.id) {
          if (sortType === "asc") {
            this.setState({
              sortType: "desc",
              defaultIcon: sort_desc,
            });
          } else {
            this.setState({
              sortType: "asc",
              defaultIcon: sort_asc,
            });
          }
        } else {
          this.setState({
            sort: titleObject.id,
            sortType: "asc",
            defaultIcon: sort_both,
          });
        }
      }
    );
  };

  plusIcon = (titleObject) => {
    this.props.addMetaFiled(titleObject, "plus");
  };

  minusIcon = (titleObject) => {
    this.props.addMetaFiled(titleObject, "minus");
  };

  render() {
    const {
      dataTable,
      addButtonOnClick,
      editButtonOnClick,
      updateButtonOnClick,
      deleteButtonOnClick,
      loader,
      metaList,
      selectedFilter,
      deleteDraftOnClick,
      viewDraft,
      metaFieldData,
      action,
      editPermission,
      search,
      archive,
      unarchive,
      isAddTag
    } = this.props;
    const { sort, sortType, defaultIcon } = this.state;
    let sortedDataTable = [];
    if (dataTable.data.length > 0) {
      if (sort == "date" || sort == "time") {
        sortedDataTable = _.sortBy(
          dataTable.data,
          (dateObj) => new Date(dateObj.createdAt)
        );
      } else {
        sortedDataTable = _.sortBy(dataTable.data, sort);
      }
      if (sortType === "desc") {
        sortedDataTable.reverse();
      }
    }
    return (
      <>
        {(loader && <Loader />) || (
          <div className="table-responsive fixHeight">
            {dataTable.titles.length > 0 && dataTable.data.length > 0 ? (
              <table className="table apit table-hover  dataTable no-footer">
                <thead>
                  <tr className="txt-blk">
                    {dataTable.titles.map((titleObject, index) => {
                      const metaData = metaFieldData.filter(
                        (item) => item.id === titleObject.id
                      );
                      return (
                        <>
                          {titleObject.isDropdownShow && (
                            <th
                              key={index}
                              className={`tik-meta-field ${
                                search ? "" : "tik-meta-field-table"
                              }`}
                            >
                              <div>
                                <a
                                  key={index}
                                  onClick={() =>
                                    titleObject.isSort
                                      ? this.handleSorting(titleObject)
                                      : ""
                                  }
                                >
                                  {titleObject.isSort && (
                                    <img
                                      className="table_sorting"
                                      src={
                                        sort === titleObject.id
                                          ? defaultIcon
                                          : sort_both
                                      }
                                    />
                                  )}

                                  {titleObject.text}
                                </a>
                                {metaData.length > 0 &&
                                metaData[0].id === titleObject.id ? (
                                  metaFieldData.length === metaList.length ? (
                                    <img
                                      src={minus}
                                      className="plus-image"
                                      onClick={() =>
                                        this.minusIcon(titleObject)
                                      }
                                    />
                                  ) : (
                                    <>
                                      {dataTable.titles[1].id ===
                                        titleObject.id ||
                                      metaFieldData[0].id === titleObject.id ? (
                                        <img
                                          src={plus}
                                          className="plus-image"
                                          onClick={() =>
                                            this.plusIcon(titleObject)
                                          }
                                        />
                                      ) : (
                                        <img
                                          src={minus}
                                          className="plus-image"
                                          onClick={() =>
                                            this.minusIcon(titleObject)
                                          }
                                        />
                                      )}
                                    </>
                                  )
                                ) : (
                                  ""
                                )}
                              </div>
                            </th>
                          )}
                        </>
                      );
                    })}
                    {action && <th> Action </th>}
                  </tr>
                </thead>
                <tbody className="txt-blk">
                  {sortedDataTable.map((data, index) => (
                    <tr key={index}>
                      {dataTable.titles.map((column, index) => (
                        <>
                          {column.isDropdownShow && (
                            <td
                              key={index}
                              onClick={() => viewDraft(data, selectedFilter)}
                              className={
                                documentFilterColorMapper[data[column.id]]
                              }
                            >
                              {data[column.id]
                                ? data[column.id] === "Update_Required"
                                  ? documentFilter[data[column.id]]
                                  : data[column.id]
                                : "-"}
                            </td>
                          )}
                        </>
                      ))}
                      {action && (
                        <td>
                          {selectedFilter &&
                          selectedFilter == "Shared with me" ? (
                            <>
                              {isAddTag ? <a
                                onClick={() => addButtonOnClick(data)}
                                className="mx-1"
                              >
                                <img
                                  className="tagi  img-fluid"
                                  src={tag}
                                />
                              </a>:null}
                          
                            </>
                          ) : selectedFilter && selectedFilter == "Drafts" ? (
                            <>
                              <a
                                onClick={(e) => {
                                  editButtonOnClick(data);
                                  e.stopPropagation();
                                }}
                                className="mx-1"
                              >
                                <img className="edit" src={edit} />
                              </a>
                              <a
                                onClick={(e) => {
                                  deleteDraftOnClick(data);
                                  e.stopPropagation();
                                }}
                                className="mx-1"
                              >
                                <img
                                  className="dlt tagi img-fluid"
                                  src={dlt}
                                />
                              </a>
                            </>
                          ) :selectedFilter && selectedFilter == "Rejected" ? (
                            <>
                              <a
                                onClick={(e) => {
                                  archive(data);
                                  e.stopPropagation();
                                }}
                                className="mx-1"
                              >
                                <img
                                  className="dlt tagi img-fluid"
                                  src={arch}
                                />
                              </a>
                              {isAddTag ? <a
                                onClick={() => addButtonOnClick(data)}
                                className="mx-1"
                              >
                                <img
                                  className="tagi img-fluid"
                                  src={tag}
                                />
                              </a>:null}
                            </>
                          ): selectedFilter && selectedFilter == "Accepted" ? (
                            <>
                              <a
                                onClick={(e) => {
                                  archive(data);
                                  e.stopPropagation();
                                }}
                                className="mx-1"
                              >
                                <img
                                  className="dlt tagi img-fluid"
                                  src={arch}
                                />
                              </a>
                              {isAddTag ? <a
                                onClick={() => addButtonOnClick(data)}
                                className="mx-1"
                              >
                                <img
                                  className="tagi img-fluid"
                                  src={tag}
                                />
                              </a>:null}
                            </>
                          ) : selectedFilter &&
                            selectedFilter == "archive-list" ? (
                            <>
                              <a
                                onClick={(e) => {
                                  unarchive(data);
                                  e.stopPropagation();
                                }}
                                className="mx-1"
                              >
                                <img
                                  className="dlt tagi img-fluid"
                                  src={unarch}
                                />
                              </a>
                            </>
                          ) : (
                            <>
                               {isAddTag ?<a
                                onClick={() => addButtonOnClick(data)}
                                className="mx-1"
                              >
                                <img
                                  className="tagi img-fluid"
                                  src={tag}
                                />
                              </a>:null}
                              <a onClick={() => archive(data)} className="mx-1">
                                <img className="tagi img-fluid" src={arch} />
                              </a>
                              {editPermission && (
                                data.documentStatus != 'Rejected' && data.documentStatus != 'Accepted' ? <a
                                  onClick={() => updateButtonOnClick(data)}
                                  className="mx-1"
                                >
                                  <img
                                    className="refresh tagi img-fluid"
                                    src={refresh}
                                  />
                                </a>:null
                              )}
                            </>
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="no-data">No Data Found</p>
            )}
          </div>
        )}
      </>
    );
  }
}
