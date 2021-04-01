import React, { Component } from "react";

export default class DropDown extends Component {
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
    const { options, error, value, showError, onBlur, disabled, placeholder, placeholderText, name, className } = this.props

    return (
      <div
        className={["input-group" + " " + className]}
      >
        <select
          className='custom-select f-16 f-m h-40 border-0 box-shd'
          onBlur={onBlur}
          onChange={(e) => this.handleChange(e)}
          disabled={disabled == true ? true : false}
          name={name}
        >
          {placeholder ? <option value="" disabled selected={value == ''}>{placeholderText ? placeholderText : 'Select your option'}</option> : null}
          {options && options.map((data, key) => {
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
