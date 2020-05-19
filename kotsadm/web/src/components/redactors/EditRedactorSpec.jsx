import React, { Component } from "react";
import { compose, withApollo } from "react-apollo";
import { withRouter, Link } from "react-router-dom"
import Helmet from "react-helmet";
import AceEditor from "react-ace";
import "brace/mode/text";
import "brace/mode/yaml";
import "brace/theme/chrome";

const spec = {
  id: "1",
  name: "my-demo-redactor",
  createdAt: "2020-05-10T21:17:37.002Z",
  updatedOn: "2020-05-18T22:17:37.002Z",
  details: "Redact all AWS secrets",
  status: "enabled",
  yaml: `apiVersion: troubleshoot.replicated.com/v1beta1
kind: Redactor
metadata:
  name: my-application-name
spec:
  redactors:
  - name: example replacement
    values:
    - abc123`
}

class RedactorSpecsList extends Component {
  state = {
    redactorEnabled: false,
    specYaml: "",
    isEditingRedactorName: false,
    redactorName: ""
  };

  handleEnableRedactor = () => {
    this.setState({
      redactorEnabled: !this.state.redactorEnabled,
    });
  }

  componentDidMount() {
    //TODO get redactor spec for id
    if (this.props.match.params.id) {
      this.setState({ redactorEnabled: spec.status === "enabled" ? true : false, specYaml: spec.yaml, redactorName: spec.name });
    } else {
      this.setState({ redactorEnabled: false, specYaml: "", redactorName: "New redactor" });
    }
  }

  onSpecChange = (value) => {
    this.setState({ specYaml: value });
  }

  onSaveRedactor = () => {
    console.log("save redactor")
  }

  toggleEditRedactorName = () => {
    const isEditingRedactorName = !this.state.isEditingRedactorName;
    if (isEditingRedactorName) {
      this.tempName = this.state.redactorName;
    }
    this.setState({ isEditingRedactorName });
  }

  handleFormChange = (field, e) => {
    let nextState = {};
    nextState[field] = e.target.value;
    this.setState(nextState);
  }

  onEditRedactorName = () => {
    console.log("editing name")
    const sameRedactorName = this.state.redactorName === this.tempName;
    this.tempName = "";

    if (sameRedactorName) {
      this.setState({ isEditingRedactorName: false });
      return;
    }
  }

  render() {
    return (
      <div className="container flex-column flex1 u-overflow--auto u-paddingTop--30 u-paddingBottom--20 justifyContent--center alignItems--center">
        <Helmet>
          <title>Redactor Specs</title>
        </Helmet>
        <div className="RedactorSpecs--wrapper flex1 flex-column u-width--full">
          <Link to="/redactor/specs" className="replicated-link u-fontSize--normal">
            <span className="icon clickable backArrow-icon u-marginRight--10" style={{ verticalAlign: "0" }} />
                Back to redactors
            </Link>
          <div className="flex flex-auto alignItems--flexStart justifyContent--spaceBetween u-marginTop--10">
            {this.state.isEditingRedactorName ?
              <div className="flex flex-auto u-paddingTop--more u-paddingBottom--more">
                <div className="flex">
                  <input
                    type="text"
                    className="Input"
                    placeholder="Redactor Name"
                    value={this.state.redactorName}
                    onChange={(e) => { this.handleFormChange("redactorName", e); }}
                  />
                  <button className="btn primary blue flex-auto u-marginLeft--5" onClick={() => this.onEditRedactorName()}>Done</button>
                </div>
              </div> :
              <div className="flex flex1 alignItems--center">
                <p className="u-fontWeight--bold u-color--tuna u-fontSize--jumbo u-lineHeight--normal u-marginRight--10"> {this.state.redactorName} </p>
                <span className="replicated-link u-fontSize--normal" onClick={this.toggleEditRedactorName}> Edit </span>
              </div>

            }
            <div className="flex justifyContent--flexEnd">
              <div className="toggle flex flex1">
                <div className="flex flex1">
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
                <div className="flex flex1 u-marginLeft--5">
                  <p className="u-fontWeight--medium u-color--tundora u-fontSize--large alignSelf--center">{this.state.redactorEnabled ? "Enabled" : "Disabled"}</p>
                </div>
              </div>
            </div>
          </div>
          <p className="u-fontSize--normal u-color--dustyGray u-fontWeight--medium u-lineHeight--normal u-marginTop--small">For more information about creating redactor specs,
          <a href="" target="_blank" rel="noopener noreferrer" className="replicated-link"> check out our docs</a>.</p>
          <div className="flex1 u-marginTop--30 u-border--gray">
            <AceEditor
              ref={(input) => this.refAceEditor = input}
              mode="yaml"
              theme="chrome"
              className="flex1 flex"
              value={this.state.specYaml}
              height="100%"
              width="100%"
              markers={this.state.activeMarkers}
              editorProps={{
                $blockScrolling: Infinity,
                useSoftTabs: true,
                tabSize: 2,
              }}
              onChange={(value) => this.onSpecChange(value)}
              setOptions={{
                scrollPastEnd: false,
                showGutter: true,
              }}
            />
          </div>
          <div className="flex u-marginTop--20 justifyContent--spaceBetween">
            <div className="flex">
              <Link to="/redactor/specs" className="btn secondary"> Cancel </Link>
            </div>
            <div className="flex">
              <button type="button" className="btn primary blue" onClick={this.onSaveRedactor}> Save redactor </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  withApollo,
  withRouter,
)(RedactorSpecsList);
