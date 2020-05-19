import React, { Component } from "react";
import { compose, withApollo } from "react-apollo";
import { withRouter, Link } from "react-router-dom"
import Helmet from "react-helmet";
import dayjs from "dayjs";
import Select from "react-select";

import RedactorSpecRow from "./RedactorSpecRow";
import DeleteRedactorSpec from "../modals/DeleteRedactorSpec";

const redactorSpecs = [
  {
    id: "1",
    name: "my-demo-redactor",
    createdAt: "2020-05-10T21:17:37.002Z",
    updatedOn: "2020-05-18T22:17:37.002Z",
    details: "Redact all AWS secrets",
    status: "enabled"
  },
  {
    id: "2",
    name: "my-other-redactor",
    createdAt: "2020-05-11T21:20:37.002Z",
    updatedOn: "2020-05-16T19:17:30.002Z",
    details: "Redact ip address’s from 10.0.0.0 - 10.255.255.255",
    status: "disabled"
  },
]

class RedactorSpecsList extends Component {
  state = {
    sortedRedactorSpecs: [],
    selectedOption: {
      value: "createdAt",
      label: "Sort by: Created At"
    },
    deleteRedactorSpecModal: false,
    redactorToDelete: {}

  };

  handleSortChange = selectedOption => {
    this.setState({ selectedOption }, () => {
      this.sortRedactorSpecs(this.state.selectedOption.value);
    });
  }

  componentDidMount() {
    if (this.state.selectedOption) {
      this.sortRedactorSpecs(this.state.selectedOption.value);
    }
  }

  sortRedactorSpecs = value => {
    if (value === "createdAt") {
      this.setState({ sortedRedactorSpecs: redactorSpecs.sort((a, b) => dayjs(b.createdAt) - dayjs(a.createdAt)) });
    } else {
      this.setState({ sortedRedactorSpecs: redactorSpecs.sort((a, b) => dayjs(b.updatedOn) - dayjs(a.updatedOn)) });
    }
  }

  toggleConfirmDeleteModal = redactor => {
    if (this.state.deleteRedactorSpecModal) {
      this.setState({ deleteRedactorSpecModal: false, redactorToDelete: "", deleteErr: false, deleteErrorMsg: "" });
    } else {
      this.setState({ deleteRedactorSpecModal: true, redactorToDelete: redactor, deleteErr: false, deleteErrorMsg: "" });
    }
  };

  handleDeleteRedactor = redactor => {
    console.log("deleting", redactor)
  }


  render() {
    const { sortedRedactorSpecs, selectedOption, deleteRedactorSpecModal } = this.state;

    const selectOptions = [
      {
        value: "createdAt",
        label: "Sort by: Created At"
      },
      {
        value: "updatedOn",
        label: "Sort by: Updated on"
      }
    ]

    return (
      <div className="container flex-column flex1 u-overflow--auto u-paddingTop--30 u-paddingBottom--20 justifyContent--center alignItems--center">
        <Helmet>
          <title>Redactor Specs</title>
        </Helmet>
        <div className="RedactorSpecs--wrapper flex1 flex-column u-width--full">
          <div className="flex flex-auto alignItems--flexStart justifyContent--spaceBetween">
            <div className="flex flex1">
              <p className="u-fontWeight--bold u-color--tuna u-fontSize--larger u-lineHeight--normal u-marginRight--10"> Redactor specs </p>
              <div style={{ width: "220px" }}>
                <Select
                  className="replicated-select-container"
                  classNamePrefix="replicated-select"
                  options={selectOptions}
                  value={selectedOption}
                  getOptionValue={(option) => option.label}
                  isOptionSelected={(option) => { option.value === selectedOption }}
                  onChange={this.handleSortChange}
                />
              </div>
            </div>
            <div className="flex justifyContent--flexEnd">
              <Link to="/redactor/specs/new" className="btn primary blue"> Create new redactor </Link>
            </div>
          </div>
          <p className="u-fontSize--normal u-color--dustyGray u-fontWeight--medium u-lineHeight--normal u-marginTop--small u-marginBottom--30">Define custom rules for sensitive values you need to be redacted when gathering a support bundle. This might inlude things like Secrets or IP addresses. For help with creating custom redactor specs,
          <a href="" target="_blank" rel="noopener noreferrer" className="replicated-link"> check out our docs</a>.</p>
          {sortedRedactorSpecs?.map((redactor) => (
            <RedactorSpecRow
              key={`redactor-${redactor.id}`}
              redactor={redactor}
              toggleConfirmDeleteModal={this.toggleConfirmDeleteModal}
            />
          ))}
        </div>
        {deleteRedactorSpecModal &&
          <DeleteRedactorSpec
            deleteRedactorSpecModal={deleteRedactorSpecModal}
            toggleConfirmDeleteModal={this.toggleConfirmDeleteModal}
            handleDeleteRedactor={this.handleDeleteRedactor}
            redactorToDelete={this.state.redactorToDelete}
            deleteErr={this.state.deleteErr}
            deleteErrorMsg={this.state.deleteErrorMsg}
          />
        }
      </div>
    );
  }
}

export default compose(
  withApollo,
  withRouter,
)(RedactorSpecsList);
