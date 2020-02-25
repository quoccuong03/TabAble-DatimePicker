import React, {Component, HTMLProps, PureComponent} from 'react';
import classNames from "classnames";

interface Props {
    type: "date" | "month" | "year"
    value?: number
    isFocus?: boolean
    onClick?: VoidFunction
    onChangeValue?: (type: "date" | "month" | "year", value: number) => void
    requestFocusToNext?: VoidFunction
}

export default class DateInputPartial extends PureComponent<Props, { value: number }> {
    rootView: HTMLElement;
    isFirstReceivedKeyNumber: boolean;

    constructor(props) {
        super(props);
        this.state = {value: this.props.value};
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (!this.props.isFocus && nextProps.isFocus)
            this.isFirstReceivedKeyNumber = false;
        if (nextProps.value !== this.state.value)
            this.setState({value: nextProps.value});
    }


    senKeyNumber(keyNumber: number) {
        if (keyNumber === -1) { // BACKSPACE press
            this.updateValue(0);
            return;
        }
        if (!this.isFirstReceivedKeyNumber && keyNumber !== 0) {
            this.updateValue(keyNumber);
            this.isFirstReceivedKeyNumber = true;
            return;
        }

        let currentValue: string = String(this.state.value);
        let newValue = Number(currentValue + keyNumber);
        switch (this.props.type) {
            case "date":
                if (newValue > 0 && newValue < 31) {
                    this.updateValue(newValue);
                    if (newValue >= 10)
                        this.props.requestFocusToNext();
                } else
                    this.updateValue(keyNumber);
                break;
            case "month":
                if (newValue > 0 && newValue < 13) {
                    this.updateValue(newValue);
                    if (newValue >= 10)
                        this.props.requestFocusToNext();
                } else
                    this.updateValue(keyNumber);
                break;
            default:
                if (newValue > 0 && newValue <= 9999) {
                    this.updateValue(newValue);
                } else
                    this.updateValue(keyNumber);
                break;
        }
    }

    updateValue(newValue: number) {
        if (newValue !== this.state.value) {
            this.setState({value: newValue});
            this.props.onChangeValue(this.props.type, newValue);
        }
    }

    render() {
        let value: string | number = this.state.value;
        if (value === undefined || value < 0) {
            switch (this.props.type) {
                case "date":
                    value = "dd";
                    break;
                case "month":
                    value = "mm";
                    break;
                default:
                    value = "yyyy";
                    break;
            }
        } else if (value < 10)
            value = "0" + value;
        if (this.props.type === "year")
            value = DateInputPartial.add0ToBefore(value, 4);

        return (
            <span ref={(ref) => {this.rootView = ref}}
                  className={classNames("DateInputPart-container", {"DateInputPart-container-focus": this.props.isFocus})}
                  onClick={this.props.onClick}>
                {value}
            </span>
        );
    }

    static add0ToBefore(value: number | string, length): string {
        let str = String(value);
        while (str.length < length) {
            str = ("0" + str);
        }
        return str;
    }
}

