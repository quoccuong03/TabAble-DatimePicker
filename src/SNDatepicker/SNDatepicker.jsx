import React, { Component } from "react";
import DatePicker from "./datepicker";
import "./datepicker/stylesheets/datepicker.css";
import DateInput from "./DateInput/DateInput";
export default class SNDatepicker extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedDate: null };
  }
  handleChange(date) {
    this.props.onDateChange && this.props.onDateChange(date.format("L"));
    this.setState({
      selectedDate: date
    });
  }
  focus() {
    this.datePicker && this.datePicker.setFocus();
  }
  render() {
    let { className, onKeyDown, ...otherProps } = this.props;
    return (
      <DatePicker
        ref={ref => {
          this.datePicker = ref;
        }}
        {...otherProps}
        className={className}
        selected={this.state.selectedDate}
        customInput={<DateInput />}
        onKeyDown={onKeyDown}
        onChange={this.handleChange.bind(this)}
      />
    );
  }
}
SNDatepicker.defaultProps = {
  popperPlacement: "top-end",
  popperModifiers: {
    offset: {
      enabled: true,
      offset: "10px, 5px"
    }
  }
};
