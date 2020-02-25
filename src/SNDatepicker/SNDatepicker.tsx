import React, { Component, HTMLProps } from 'react';
import DatePicker from "./datepicker"
import './datepicker/stylesheets/datepicker.css';
import DateInput from "./DateInput/DateInput";
import { Moment } from "moment";

interface Props {
  className?: string
  onKeyDown?: (event: KeyboardEvent) => boolean
  onDateChange?: (valueMMDDYYY: string) => void
  popperPlacement?: any
  popperModifiers?: any
}

export default class SNDatepicker extends Component<Props, { selectedDate }> {
  private datePicker: DatePicker;

  static defaultProps = {
    popperPlacement: "top-end",
    popperModifiers: {
      offset: {
        enabled: true,
        offset: '10px, 5px'
      }
    }
  };

  constructor(props) {
    super(props);
    this.state = { selectedDate: null };
  }

  private handleChange(date: Moment) {
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
        ref={(ref) => { this.datePicker = ref }}
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
