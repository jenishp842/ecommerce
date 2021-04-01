import React, { Component } from "react";


export default class Button extends Component {
    constructor(props) {
        super(props);
    };
    render() {
        const { buttonText, onClick, type, className, isDisabled } = this.props
        return (
            <button
                type={type}
                className={['btn box-shd-hover-org btn-primary w-100 login-btn f-b' + " " + className]}
                data-toggle="modal"
                data-target="#twoFactor"
                disabled={isDisabled}
                onClick={onClick}>
                {buttonText}
            </button>

        );
    }
}
