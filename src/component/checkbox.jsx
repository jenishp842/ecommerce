import React, { Component } from "react";

export default class Checkbox extends Component {
    constructor(props) {
        super(props);
    };
    handleChange(event) {
        const { onChange } = this.props;
        onChange(event.target.checked)
    }

    render() {
        const { label, name, id, type, checked, parentClassName, onBlur, disabled } = this.props

        return (
            <>
                <div className={['custom-control custom-checkbox' + " " + parentClassName]}>
                    <input type={type} className="custom-control-input"
                        id={id} name={name}
                        checked={checked || false}
                        onChange={(e) => this.handleChange(e)}
                        onBlur={onBlur}
                        disabled={disabled} />
                    <label className="custom-control-label f-14" for={id}>{label}</label>
                </div>
            </>
        );
    }
}