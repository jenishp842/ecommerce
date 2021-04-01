import React, { Component } from "react";
import { Multiselect } from 'multiselect-react-dropdown';

export default class MultiSelectDropdown extends Component {
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
    const { options, error, value, onSelect, onRemove, style, ref, showError, onBlur, disabled, placeholder, name } = this.props
    return (

      <div className="input-group">
        <Multiselect
          options={options}
          selectedValues={selectedValue}
          onSelect={onSelect}
          onRemove={this.onRemove}
          displayValue="name"
          placeholder="Select Employee"
          style={style}
          ref={ref}
          closeIcon={'cancel'}
          disabled={disabled == true ? true : false}
        />
        {showError && <div className="formError">{error}</div>}
      </div>
    );
  }
}
