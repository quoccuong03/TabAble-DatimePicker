import React, { PureComponent } from 'react';
import classNames from "classnames";
export default class DateInputPartial extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { value: this.props.value };
    }
    componentWillReceiveProps(nextProps, nextContext) {
        if (!this.props.isFocus && nextProps.isFocus)
            this.isFirstReceivedKeyNumber = false;
        if (nextProps.value !== this.state.value)
            this.setState({ value: nextProps.value });
    }
    senKeyNumber(keyNumber) {
        if (keyNumber === -1) {
            this.updateValue(0);
            return;
        }
        if (!this.isFirstReceivedKeyNumber && keyNumber !== 0) {
            this.updateValue(keyNumber);
            this.isFirstReceivedKeyNumber = true;
            return;
        }
        let currentValue = String(this.state.value);
        let newValue = Number(currentValue + keyNumber);
        switch (this.props.type) {
            case "date":
                if (newValue > 0 && newValue < 31) {
                    this.updateValue(newValue);
                    if (newValue >= 10)
                        this.props.requestFocusToNext();
                }
                else
                    this.updateValue(keyNumber);
                break;
            case "month":
                if (newValue > 0 && newValue < 13) {
                    this.updateValue(newValue);
                    if (newValue >= 10)
                        this.props.requestFocusToNext();
                }
                else
                    this.updateValue(keyNumber);
                break;
            default:
                if (newValue > 0 && newValue <= 9999) {
                    this.updateValue(newValue);
                }
                else
                    this.updateValue(keyNumber);
                break;
        }
    }
    updateValue(newValue) {
        if (newValue !== this.state.value) {
            this.setState({ value: newValue });
            this.props.onChangeValue(this.props.type, newValue);
        }
    }
    render() {
        let value = this.state.value;
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
        }
        else if (value < 10)
            value = "0" + value;
        if (this.props.type === "year")
            value = DateInputPartial.add0ToBefore(value, 4);
        return (<span ref={(ref) => { this.rootView = ref; }} className={classNames("DateInputPart-container", { "DateInputPart-container-focus": this.props.isFocus })} onClick={this.props.onClick}>
                {value}
            </span>);
    }
    static add0ToBefore(value, length) {
        let str = String(value);
        while (str.length < length) {
            str = ("0" + str);
        }
        return str;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0ZUlucHV0UGFydGlhbC5qc3giLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJEYXRlSW5wdXRQYXJ0aWFsLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssRUFBRSxFQUF1QixhQUFhLEVBQUMsTUFBTSxPQUFPLENBQUM7QUFDakUsT0FBTyxVQUFVLE1BQU0sWUFBWSxDQUFDO0FBV3BDLE1BQU0sQ0FBQyxPQUFPLHVCQUF3QixTQUFRLGFBQXVDO0lBSWpGLFlBQVksS0FBSztRQUNiLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNiLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQseUJBQXlCLENBQUMsU0FBUyxFQUFFLFdBQVc7UUFDNUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sSUFBSSxTQUFTLENBQUMsT0FBTyxDQUFDO1lBQ3pDLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxLQUFLLENBQUM7UUFDMUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztZQUNyQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFHRCxZQUFZLENBQUMsU0FBaUI7UUFDMUIsRUFBRSxDQUFDLENBQUMsU0FBUyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQixJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLE1BQU0sQ0FBQztRQUNYLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsSUFBSSxTQUFTLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwRCxJQUFJ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QUFDO1FBQ3hCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQztZQUMzQixLQUFLLEdBQUcsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztRQUVwRCxNQUFNLENBQUMsQ0FDSCxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLEdBQUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUEsQ0FBQSxDQUFDLENBQUMsQ0FDcEMsU0FBUyxDQUFDLENBQUMsVUFBVSxDQUFDLHlCQUF5QixFQUFFLEVBQUMsK0JBQStCLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDLENBQ3hHLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQzlCO2dCQUFBLENBQUMsS0FBSyxDQUNWO1lBQUEsRUFBRSxJQUFJLENBQUMsQ0FDVixDQUFDO0lBQ04sQ0FBQztJQUVELE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBc0IsRUFBRSxNQUFNO1FBQzlDLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QixPQUFPLEdBQUcsQ0FBQyxNQUFNLEdBQUcsTUFBTSxFQUFFLENBQUM7WUFDekIsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLENBQUM7UUFDRCxNQUFNLENBQUMsR0FBRyxDQUFDO0lBQ2YsQ0FBQztDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBIVE1MUHJvcHMsIFB1cmVDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gXCJjbGFzc25hbWVzXCI7XG5cbmludGVyZmFjZSBQcm9wcyB7XG4gICAgdHlwZTogXCJkYXRlXCIgfCBcIm1vbnRoXCIgfCBcInllYXJcIlxuICAgIHZhbHVlPzogbnVtYmVyXG4gICAgaXNGb2N1cz86IGJvb2xlYW5cbiAgICBvbkNsaWNrPzogVm9pZEZ1bmN0aW9uXG4gICAgb25DaGFuZ2VWYWx1ZT86ICh0eXBlOiBcImRhdGVcIiB8IFwibW9udGhcIiB8IFwieWVhclwiLCB2YWx1ZTogbnVtYmVyKSA9PiB2b2lkXG4gICAgcmVxdWVzdEZvY3VzVG9OZXh0PzogVm9pZEZ1bmN0aW9uXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhdGVJbnB1dFBhcnRpYWwgZXh0ZW5kcyBQdXJlQ29tcG9uZW50PFByb3BzLCB7IHZhbHVlOiBudW1iZXIgfT4ge1xuICAgIHJvb3RWaWV3OiBIVE1MRWxlbWVudDtcbiAgICBpc0ZpcnN0UmVjZWl2ZWRLZXlOdW1iZXI6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7dmFsdWU6IHRoaXMucHJvcHMudmFsdWV9O1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzLCBuZXh0Q29udGV4dCkge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMuaXNGb2N1cyAmJiBuZXh0UHJvcHMuaXNGb2N1cylcbiAgICAgICAgICAgIHRoaXMuaXNGaXJzdFJlY2VpdmVkS2V5TnVtYmVyID0gZmFsc2U7XG4gICAgICAgIGlmIChuZXh0UHJvcHMudmFsdWUgIT09IHRoaXMuc3RhdGUudmFsdWUpXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogbmV4dFByb3BzLnZhbHVlfSk7XG4gICAgfVxuXG5cbiAgICBzZW5LZXlOdW1iZXIoa2V5TnVtYmVyOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKGtleU51bWJlciA9PT0gLTEpIHsgLy8gQkFDS1NQQUNFIHByZXNzXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlKDApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5pc0ZpcnN0UmVjZWl2ZWRLZXlOdW1iZXIgJiYga2V5TnVtYmVyICE9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlKGtleU51bWJlcik7XG4gICAgICAgICAgICB0aGlzLmlzRmlyc3RSZWNlaXZlZEtleU51bWJlciA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgY3VycmVudFZhbHVlOiBzdHJpbmcgPSBTdHJpbmcodGhpcy5zdGF0ZS52YWx1ZSk7XG4gICAgICAgIGxldCBuZXdWYWx1ZSA9IE51bWJlcihjdXJyZW50VmFsdWUgKyBrZXlOdW1iZXIpO1xuICAgICAgICBzd2l0Y2ggKHRoaXMucHJvcHMudHlwZSkge1xuICAgICAgICAgICAgY2FzZSBcImRhdGVcIjpcbiAgICAgICAgICAgICAgICBpZiAobmV3VmFsdWUgPiAwICYmIG5ld1ZhbHVlIDwgMzEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVWYWx1ZShuZXdWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXdWYWx1ZSA+PSAxMClcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMucmVxdWVzdEZvY3VzVG9OZXh0KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVmFsdWUoa2V5TnVtYmVyKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJtb250aFwiOlxuICAgICAgICAgICAgICAgIGlmIChuZXdWYWx1ZSA+IDAgJiYgbmV3VmFsdWUgPCAxMykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlKG5ld1ZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5ld1ZhbHVlID49IDEwKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5yZXF1ZXN0Rm9jdXNUb05leHQoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2VcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVWYWx1ZShrZXlOdW1iZXIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBpZiAobmV3VmFsdWUgPiAwICYmIG5ld1ZhbHVlIDw9IDk5OTkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVWYWx1ZShuZXdWYWx1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVmFsdWUoa2V5TnVtYmVyKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZVZhbHVlKG5ld1ZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSB0aGlzLnN0YXRlLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogbmV3VmFsdWV9KTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2VWYWx1ZSh0aGlzLnByb3BzLnR5cGUsIG5ld1ZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgbGV0IHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgPSB0aGlzLnN0YXRlLnZhbHVlO1xuICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA8IDApIHtcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5wcm9wcy50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcImRhdGVcIjpcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBcImRkXCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJtb250aFwiOlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IFwibW1cIjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBcInl5eXlcIjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPCAxMClcbiAgICAgICAgICAgIHZhbHVlID0gXCIwXCIgKyB2YWx1ZTtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMudHlwZSA9PT0gXCJ5ZWFyXCIpXG4gICAgICAgICAgICB2YWx1ZSA9IERhdGVJbnB1dFBhcnRpYWwuYWRkMFRvQmVmb3JlKHZhbHVlLCA0KTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHNwYW4gcmVmPXsocmVmKSA9PiB7dGhpcy5yb290VmlldyA9IHJlZn19XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJEYXRlSW5wdXRQYXJ0LWNvbnRhaW5lclwiLCB7XCJEYXRlSW5wdXRQYXJ0LWNvbnRhaW5lci1mb2N1c1wiOiB0aGlzLnByb3BzLmlzRm9jdXN9KX1cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMucHJvcHMub25DbGlja30+XG4gICAgICAgICAgICAgICAge3ZhbHVlfVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHN0YXRpYyBhZGQwVG9CZWZvcmUodmFsdWU6IG51bWJlciB8IHN0cmluZywgbGVuZ3RoKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IHN0ciA9IFN0cmluZyh2YWx1ZSk7XG4gICAgICAgIHdoaWxlIChzdHIubGVuZ3RoIDwgbGVuZ3RoKSB7XG4gICAgICAgICAgICBzdHIgPSAoXCIwXCIgKyBzdHIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxufVxuXG4iXX0=