import React, { Component } from "react";

export default class MultiSelectDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null
    }
  };

  handleChange(event) {
    const { onChange } = this.props;
    onChange(event.target.value)
  }

  render() {
    const { options, error, value, showError, onBlur, disabled, placeholder, name } = this.props
    return (
      <div className="input-group">
        <select className="custom-select f-16 f-m p-2"
          multiple
          searchable="Search here.."
          onBlur={onBlur}
          onChange={(e) => this.handleChange(e)}
          disabled={disabled == true ? true : false}
          name={name}
        >
          {placeholder ? <option value="" disabled selected={value == ''}>Select your option</option> : null}
          {options.map((data, key) => {
            return (
              <option value={data.value} selected={data.value == value ? true : false} key={key}>{data.label}</option>
            )
          })}
        </select>
        {showError && <div className="formError">{error}</div>}
      </div>
    );
  }
}
