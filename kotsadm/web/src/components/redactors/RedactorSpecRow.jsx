
import React from "react";
import moment from "moment";
import { Link } from "react-router-dom"

class RedactorredactorRow extends React.Component {
  state = {
    redactorEnabled: false
  };

  handleEnableRedactor = () => {
    this.setState({
      redactorEnabled: !this.state.redactorEnabled,
    });
  }

  componentDidMount() {
    if (this.props.redactor) {
      this.setState({ redactorEnabled: this.props.redactor.status === "enabled" ? true : false });
    }
  }

  handleDeleteClick = redactor => {
    this.props.toggleConfirmDeleteModal(redactor);
  }

  render() {
    const { redactor } = this.props;

    return (
      <div className="flex flex-auto ActiveDownstreamVersionRow--wrapper" key={redactor.name}>
        <div className="flex-column flex1">
          <div className="flex flex1 alignItems--center u-marginBottom--small">
            <span className={`status-indicator u-marginBottom--10 ${this.state.redactorEnabled ? "enabled" : "disabled"}`} />
            <p className="u-fontSize--large u-lineHeight--normal u-fontWeight--bold u-color--tuna u-marginRight--10">{redactor.name}</p>
            <span className="u-fontSize--small u-color--dustyGray u-fontWeight--medium u-lineHeight--normal u-marginTop--5"> Last updated on {moment(redactor.updatedOn).format("MM/DD/YY @ hh:mm a")} </span>
          </div>
          <p className="u-fontSize--small u-fontWeight--medium u-lineHeight--normal u-color--nevada u-marginLeft--10"> {redactor.details} </p>
        </div>
        <div className="flex alignItems--center">
          <Link to={`/redactor/redactors/${redactor.id}`} className="u-fontSize--normal u-fontWeight--medium u-color--royalBlue u-textDecoration--underlineOnHover u-marginRight--20">Edit redactor</Link>
          <span className="u-fontSize--normal u-fontWeight--medium u-color--chestnut u-textDecoration--underlineOnHover u-marginRight--20" onClick={() => this.handleDeleteClick(redactor)}>Delete</span>
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

export default RedactorredactorRow;
