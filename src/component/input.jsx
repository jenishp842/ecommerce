import React, { Component } from "react";


export default class TextInput extends Component {
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
        const { showError, error, type, name, id, disabled, onBlur, value, placeholder, className } = this.props
        return (
            <>
                <input
                    type={type}
                    name={name}
                    id={id}
                    className={['form-control' + " " + className]}
                    value={value}
                    disabled={disabled}
                    onChange={(e) => this.handleChange(e)}
                    onBlur={onBlur}
                    placeholder={placeholder}
                />

                {showError && <div className="formError">{error}</div>}
            </>
        );
    }
}
