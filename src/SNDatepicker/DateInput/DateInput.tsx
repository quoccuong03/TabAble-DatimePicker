import React, {Component, HTMLProps, KeyboardEventHandler, PureComponent} from 'react';
import '../styles.css';
import DateInputPartial from "./DateInputPartial";
import {KEY_CODE} from "../../../constants";
import moment, {Moment} from "moment";
import * as _ from "lodash";
import classNames from 'classnames';

interface Props {
    className?: string
    value?: string
    valueDate?: Moment
    setOpen?: (isOpen: boolean) => void
    isOpen?: () => boolean
    onKeyDown?: (event) => void
    onChangeValueDate?: (date: Moment) => void // TODO su dung de pass change value from input to datepicker
}

export default class DateInput extends Component<Props, { focusIndex: number }> {
    private inputParts = {};
    private dropDownElement;
    private rootView: HTMLDivElement;
    private firstDate: { date?: number, month?: number, year?: number } = {};

    constructor(props) {
        super(props);
        this.state = {focusIndex: 0}; // focusIndex = 1 | 2 | 3. if other => no focus
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.value !== this.props.value || !_.isEqual(this.state, nextState)
    }

    focus() {
        this.rootView.focus();
    }

    //region event
    private onFocus(event) {
        if (this.state.focusIndex < 1) {
            this.setState({focusIndex: 1});
            // this.props.setOpen(true);
        }
    }

    private onBlur(event) {
        this.setState({focusIndex: 0});
    }

    private onDateInputPartClick(index: number) {
        if (this.state.focusIndex !== index)
            this.setState({focusIndex: index});
        if (index === 4)
            this.props.setOpen(true)
    }

    private onChangeValueDateInputPart(type: "date" | "month" | "year", value: number) {
        if (this.props.valueDate) { //value !== 0 &&
            let newValueDate = this.props.valueDate.clone();
            switch (type) {
                case "date":
                    newValueDate.date(value);
                    break;
                case "month":
                    newValueDate.month(value - 1);
                    break;
                default:
                    newValueDate.year(value);
                    break;
            }
            this.props.onChangeValueDate(newValueDate);
        } else {
            switch (type) {
                case "date":
                    this.firstDate.date = value;
                    break;
                case "month":
                    this.firstDate.month = value;
                    break;
                default:
                    this.firstDate.year = value;
                    break;
            }
            if (this.firstDate.date > 0 && this.firstDate.month > 0 && this.firstDate.year != undefined) {
                let newValueDate = moment();
                newValueDate.year(this.firstDate.year).month(this.firstDate.month - 1).date(this.firstDate.date);
                this.firstDate = {};
                this.props.onChangeValueDate(newValueDate);
            }
        }
    }

    //endregion

    //region Key event
    private onKeyDown(event: KeyboardEvent) {
        if (this.captureInputNumberKeyEvent(event))
            return;

        switch (event.keyCode) {
            case KEY_CODE.TAB:
                if (this.focusContinuePart(event.shiftKey)) {
                    event.preventDefault();
                    return;
                } else {
                    if (this.props.isOpen())
                        this.props.setOpen(false);
                    break;
                    // return;
                }
            case KEY_CODE.ENTER:
                if (!this.props.isOpen()) {
                    this.props.setOpen(true);
                    event.preventDefault();
                    return;
                }
                break;
            default:
                break;
        }
        if (this.props.isOpen() || event.keyCode === KEY_CODE.TAB)
            this.props.onKeyDown(event);
    }

    private captureInputNumberKeyEvent(event: KeyboardEvent): boolean {
        if (event.keyCode === KEY_CODE.BACKSPACE) {
            let inputPart = this.inputParts[this.state.focusIndex];
            if (inputPart) {
                inputPart.senKeyNumber(-1);
                return true;
            }
        }
        switch (event.key) {
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                let inputPart = this.inputParts[this.state.focusIndex];
                if (inputPart) {
                    inputPart.senKeyNumber(Number(event.key));
                    return true;
                }
                return false;
            default:
                return false;
        }
    }

    private focusContinuePart(isPrevPart): boolean {
        if (isPrevPart) {
            if (this.state.focusIndex <= 1)
                return false;
            this.setState({focusIndex: this.state.focusIndex - 1});
            return true;
        }
        if (this.state.focusIndex > 3)
            return false;
        this.setState({focusIndex: this.state.focusIndex + 1});
        return true;
    }

    //endregion

    render() {
        return (
            <div tabIndex={0} className={classNames("DateInput-container noselect", this.props.className)}
                 ref={(ref) => {this.rootView = ref}}
                 onKeyDown={this.onKeyDown.bind(this)}
                 onBlur={this.onBlur.bind(this)}
                 onFocus={this.onFocus.bind(this)}>
                <DateInputPartial isFocus={this.state.focusIndex === 1} ref={(ref) => {this.inputParts[1] = ref}}
                                  type="month"
                                  value={this.getMonth(this.props.valueDate)}
                                  onChangeValue={this.onChangeValueDateInputPart.bind(this)}
                                  requestFocusToNext={this.focusContinuePart.bind(this)}
                                  onClick={this.onDateInputPartClick.bind(this, 1)}/>
                /
                <DateInputPartial isFocus={this.state.focusIndex === 2} ref={(ref) => {this.inputParts[2] = ref}}
                                  type="date"
                                  value={this.getDate(this.props.valueDate)}
                                  onChangeValue={this.onChangeValueDateInputPart.bind(this)}
                                  requestFocusToNext={this.focusContinuePart.bind(this)}
                                  onClick={this.onDateInputPartClick.bind(this, 2)}/>
                /
                <DateInputPartial isFocus={this.state.focusIndex === 3} ref={(ref) => {this.inputParts[3] = ref}}
                                  type="year"
                                  value={this.getYear(this.props.valueDate)}
                                  onChangeValue={this.onChangeValueDateInputPart.bind(this)}
                                  onClick={this.onDateInputPartClick.bind(this, 3)}/>
                <span style={{flex: 1}}/>
                <i ref={(ref) => {this.dropDownElement = ref}}
                   onClick={this.onDateInputPartClick.bind(this, 4)}
                   className={classNames("material-icons", {"DateInputPart-dropdown-focus": this.state.focusIndex === 4})}>
                    arrow_drop_down
                </i>
            </div>
        );
    }

    // region utils
    getMonth(date?: Moment): number {
        // if (this.firstDate.month)
        //     return this.firstDate.month;
        // else if (date)
        //     return date.month() + 1;
        // else return -1;

        if (date)
            return date.month() + 1;
        else
            return this.firstDate.month === undefined ? -1 : this.firstDate.month;
    }

    getDate(date?: Moment) {
        // if (this.firstDate.date)
        //     return this.firstDate.date;
        // else if (date)
        //     return date.date();
        // else return -1;

        if (date)
            return date.date();
        else
            return this.firstDate.date === undefined ? -1 : this.firstDate.date;
    }

    getYear(date?: Moment) {
        // if (this.firstDate.year)
        //     return this.firstDate.year;
        // else if (date)
        //     return date.year();
        // else return -1;

        if (date)
            return date.year();
        else
            return this.firstDate.year === undefined ? -1 : this.firstDate.year;
    }

    //endregion
}
