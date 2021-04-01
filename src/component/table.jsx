import React, { Component } from "react";
import _ from 'lodash'
import Loader from "../component/Loader.jsx";
import sort_both from "../assets/img/sort_both.png";
import sort_asc from "../assets/img/sort_asc.png";
import sort_desc from "../assets/img/sort_desc.png";
import refresh from "../assets/img/refresh.png";
import edit from "../assets/img/edit.png";
import tag from "../assets/img/tag.png";
import dlt from "../assets/img/dlt.png";

export default class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: props.defaultSort,
      sortType: 'asc',
      defaultIcon: sort_both
    }
  };

  handleSorting = (titleObject) => {
    this.setState({
      sort: titleObject.id
    }, () => {

      const { sort, sortType } = this.state;
      if (sort === titleObject.id) {
        if (sortType === 'asc') {
          this.setState({
            sortType: 'desc',
            defaultIcon: sort_desc
          })
        } else {
          this.setState({
            sortType: 'asc',
            defaultIcon: sort_asc
          })
        }
      } else {
        this.setState({
          sort: titleObject.id,
          sortType: 'asc',
          defaultIcon: sort_both

        })
      }
    })

  }

  render() {

    const { dataTable, actions, addButtonOnClick, editButtonOnClick, updateButtonOnClick, deleteButtonOnClick, viewPopup, loader, updatePermission, deletePermission } = this.props;
    const { sort, sortType, defaultIcon } = this.state;
    let sortedDataTable = [];

    if (dataTable.data.length > 0) {
      if (sort == 'date' || sort == 'time') {
        sortedDataTable = _.sortBy(dataTable.data, function (dateObj) {
          return new Date(dateObj.createdAt);
        });
      } else {
        sortedDataTable = _.sortBy(dataTable.data, sort)
      }

      if (sortType === 'desc') {
        sortedDataTable.reverse()
      }
    }
    return (
      <div className="table-responsive fixHeight">
        {loader &&
          <Loader />
          ||
          (dataTable.titles.length > 0 && dataTable.data.length > 0) ?
          <table className="table apit table-hover  dataTable no-footer">
            <thead>
              <tr className="txt-blk">
                {dataTable.titles.map((titleObject, index) =>
                  <th className="sorting"
                    key={index}
                    onClick={() => titleObject.isSort ? this.handleSorting(titleObject) : ''}>
                    {titleObject.isSort &&
                      <img className="table_sorting"
                        src={sort === titleObject.id ? defaultIcon : sort_both} />}
                    {titleObject.text}
                  </th>)}
                {actions && (actions.edit && updatePermission || actions.delete && deletePermission) && <th> Action </th>}
              </tr>
            </thead>
            <tbody className="txt-blk">
              {sortedDataTable.map((data, index) =>
                <tr key={index}>
                  {dataTable.titles.map((column, index) =>
                    <td key={index} onClick={() => viewPopup(data)}>{data[column.id]}</td>
                  )}
                  <td className="action-data">
                    {actions && <>
                      {actions.update &&
                        <a onClick={updateButtonOnClick}
                          className="mx-1">
                          <img className="refresh" src={refresh} />
                        </a>}
                      {actions.edit && updatePermission &&
                        <a onClick={(e) => {
                          editButtonOnClick(data);
                          e.stopPropagation()
                        }}
                          className="mx-1">
                          <img className="edit" src={edit} />
                        </a>}
                    </>
                    }
                    {actions && actions.add ? <a onClick={addButtonOnClick} className="mx-1"><img className="tagi" src={tag} /></a> : null}
                    {actions && actions.delete && deletePermission ? <a onClick={(e) => { deleteButtonOnClick(data); e.stopPropagation() }} className="mx-1"><img className="dlt" src={dlt} /></a> : null}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          : <p className="no-data">No Data Found</p>
        }
      </div>

    );
  }
}