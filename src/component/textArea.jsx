import React, { Component } from "react";


export default class TextArea extends Component {
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
    const { showError, error, row, name, id, disabled, onBlur, value, placeholder, className } = this.props
    return (
      <div>
        <textarea class="form-control f-16 f-m"
          rows={row}
          name={name}
          id={id}
          className={['form-control f-16 f-m' + " " + className]}
          value={value}
          disabled={disabled}
          onChange={(e) => this.handleChange(e)}
          onBlur={onBlur}
          placeholder={placeholder}>
        </textarea>
        {/* <input
          type={type}
          name={name}
          id={id}
          className={['form-control' + " " + className]}
          value={value}
          disabled={disabled}
          onChange={(e) => this.handleChange(e)}
          onBlur={onBlur}
          placeholder={placeholder}
        /> */}

        {showError && <div className="formError">{error}</div>}
      </div>
    );
  }
}

{/* <textarea class="form-control f-16 f-m" rows="3">adams@dayrep.com
                                
                                </textarea> */}