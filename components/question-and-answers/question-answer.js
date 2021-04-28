import React from "react";

export default class QuestionAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdown: "none",
      isOpen: false,
    };
    this.openDropDown = this.openDropDown.bind(this);
  }
  openDropDown() {
    const newDropdown = this.state.dropdown === "none" ? "block" : "none";
    this.setState({
      dropdown: newDropdown,
      isOpen: !this.state.isOpen,
    });
  }
  render() {
    const { question, answer } = this.props;

    return (
      <div itemScope itemType="https://schema.org/Question" className="topic">
        <div onClick={this.openDropDown} className="open">
          <h2
            style={{ cursor: "pointer" }}
            itemProp="name"
            className="question mb-2"
          >
            {question}
          </h2>
        </div>
        <div
          itemProp="suggestedAnswer acceptedAnswer"
          itemScope
          itemType="http://schema.org/Answer"
          className={this.state.isOpen ? "show-answer" : "hide-answer"}
        >
          <p itemProp="text" className="answer">
            {answer}
          </p>
        </div>
      </div>
    );
  }
}
