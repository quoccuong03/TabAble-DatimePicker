import React, { Component } from "react";
import "./DateInput.scss";
import DateInputPartial from "./DateInputPartial";
import { KEY_CODE } from "../../constants";
import moment from "moment";
import * as _ from "lodash";
import classNames from "classnames";
export default class DateInput extends Component {
  constructor(props) {
    super(props);
    this.inputParts = {};
    this.firstDate = {};
    this.state = { focusIndex: 0 }; // focusIndex = 1 | 2 | 3. if other => no focus
  }
  componentDidMount() {
    this.rootView.focus();
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.value !== this.props.value || !_.isEqual(this.state, nextState)
    );
  }
  focus() {
    this.rootView.focus();
  }
  //region event
  onFocus(event) {
    if (this.state.focusIndex < 1) {
      this.setState({ focusIndex: 1 });
      // this.props.setOpen(true);
    }
  }
  onBlur(event) {
    this.setState({ focusIndex: 0 });
  }
  onDateInputPartClick(index) {
    if (this.state.focusIndex !== index) this.setState({ focusIndex: index });
    if (index === 4) this.props.setOpen(true);
  }
  onChangeValueDateInputPart(type, value) {
    if (this.props.valueDate) {
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
      if (
        this.firstDate.date > 0 &&
        this.firstDate.month > 0 &&
        this.firstDate.year != undefined
      ) {
        let newValueDate = moment();
        newValueDate
          .year(this.firstDate.year)
          .month(this.firstDate.month - 1)
          .date(this.firstDate.date);
        this.firstDate = {};
        this.props.onChangeValueDate(newValueDate);
      }
    }
  }
  //endregion
  //region Key event
  onKeyDown(event) {
    if (this.captureInputNumberKeyEvent(event)) return;
    switch (event.keyCode) {
      case KEY_CODE.TAB:
        if (this.focusContinuePart(event.shiftKey)) {
          event.preventDefault();
          return;
        } else {
          if (this.props.isOpen()) this.props.setOpen(false);
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
  captureInputNumberKeyEvent(event) {
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
  focusContinuePart(isPrevPart) {
    if (isPrevPart) {
      if (this.state.focusIndex <= 1) return false;
      this.setState({ focusIndex: this.state.focusIndex - 1 });
      return true;
    }
    if (this.state.focusIndex > 3) return false;
    this.setState({ focusIndex: this.state.focusIndex + 1 });
    return true;
  }
  //endregion
  render() {
    return (
      <div
        tabIndex={0}
        className={classNames(
          "DateInput-container noselect",
          this.props.className
        )}
        ref={ref => {
          this.rootView = ref;
        }}
        onKeyDown={this.onKeyDown.bind(this)}
        onBlur={this.onBlur.bind(this)}
        onFocus={this.onFocus.bind(this)}
      >
        <DateInputPartial
          isFocus={this.state.focusIndex === 1}
          ref={ref => {
            this.inputParts[1] = ref;
          }}
          type="month"
          value={this.getMonth(this.props.valueDate)}
          onChangeValue={this.onChangeValueDateInputPart.bind(this)}
          requestFocusToNext={this.focusContinuePart.bind(this)}
          onClick={this.onDateInputPartClick.bind(this, 1)}
        />
        /
        <DateInputPartial
          isFocus={this.state.focusIndex === 2}
          ref={ref => {
            this.inputParts[2] = ref;
          }}
          type="date"
          value={this.getDate(this.props.valueDate)}
          onChangeValue={this.onChangeValueDateInputPart.bind(this)}
          requestFocusToNext={this.focusContinuePart.bind(this)}
          onClick={this.onDateInputPartClick.bind(this, 2)}
        />
        /
        <DateInputPartial
          isFocus={this.state.focusIndex === 3}
          ref={ref => {
            this.inputParts[3] = ref;
          }}
          type="year"
          value={this.getYear(this.props.valueDate)}
          onChangeValue={this.onChangeValueDateInputPart.bind(this)}
          onClick={this.onDateInputPartClick.bind(this, 3)}
        />
        <span style={{ flex: 1 }} />
        <span
          ref={ref => {
            this.dropDownElement = ref;
          }}
          onClick={this.onDateInputPartClick.bind(this, 4)}
          className={classNames("material-icons", {
            "DateInputPart-dropdown-focus": this.state.focusIndex === 4
          })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
          >
            <path d="M5 8l4 4 4-4z" />
          </svg>
        </span>
      </div>
    );
  }
  // region utils
  getMonth(date) {
    // if (this.firstDate.month)
    //     return this.firstDate.month;
    // else if (date)
    //     return date.month() + 1;
    // else return -1;
    if (date) return date.month() + 1;
    else return this.firstDate.month === undefined ? -1 : this.firstDate.month;
  }
  getDate(date) {
    // if (this.firstDate.date)
    //     return this.firstDate.date;
    // else if (date)
    //     return date.date();
    // else return -1;
    if (date) return date.date();
    else return this.firstDate.date === undefined ? -1 : this.firstDate.date;
  }
  getYear(date) {
    // if (this.firstDate.year)
    //     return this.firstDate.year;
    // else if (date)
    //     return date.year();
    // else return -1;
    if (date) return date.year();
    else return this.firstDate.year === undefined ? -1 : this.firstDate.year;
  }
}
