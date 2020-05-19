
import React from "react";
import moment from "moment";

class RedactorSpecRow extends React.Component {
  state = {
    redactorEnabled: false
  };

  handleEnableRedactor = () => {
    this.setState({
      redactorEnabled: !this.state.redactorEnabled,
    });
  }

  componentDidMount() {
    if (this.props.spec) {
      this.setState({ redactorEnabled: this.props.spec.status === "enabled" ? true : false });
    }
  }

  render() {
    const { spec } = this.props;

    return (
      <div className="flex flex-auto ActiveDownstreamVersionRow--wrapper" key={spec.name}>
        <div className="flex-column flex1">
          <div className="flex flex1 alignItems--center u-marginBottom--small">
            <span className={`status-indicator u-marginBottom--10 ${this.state.redactorEnabled ? "enabled" : "disabled"}`} />
            <p className="u-fontSize--large u-lineHeight--normal u-fontWeight--bold u-color--tuna u-marginRight--10">{spec.name}</p>
            <span className="u-fontSize--small u-color--dustyGray u-fontWeight--medium u-lineHeight--normal u-marginTop--5"> Last updated on {moment(spec.updatedOn).format("MM/DD/YY @ hh:mm a")} </span>
          </div>
          <p className="u-fontSize--small u-fontWeight--medium u-lineHeight--normal u-color--nevada u-marginLeft--10"> {spec.details} </p>
        </div>
        <div className="flex alignItems--center">
          <span className="u-fontSize--normal u-fontWeight--medium u-color--royalBlue u-textDecoration--underlineOnHover u-marginRight--20">Edit redactor</span>
          <span className="u-fontSize--normal u-fontWeight--medium u-color--chestnut u-textDecoration--underlineOnHover u-marginRight--20">Delete</span>
          <div className={`Checkbox--switch ${this.state.redactorEnabled ? "is-checked" : "is-notChecked"}`}>
            <input
              type="checkbox"
              className="Checkbox-toggle"
              name="isRedactorEnabled"
              checked={this.state.redactorEnabled}
              onChange={(e) => { this.handleEnableRedactor(e) }}
            />
          </div>
        </div>

      </div>
    )
  }
}

export default RedactorSpecRow;
