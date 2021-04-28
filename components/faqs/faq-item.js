import React from "react";
import data from "../../data.json";
import QuestionAnswer from "../question-and-answers/question-answer";
export default class FaqItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      dropdown: { display: "none" },
    };
    this.fetchQuestions = this.fetchQuestions.bind(this);
  }
  componentDidMount() {
    this.fetchQuestions();
  }

  fetchQuestions() {
    const baseUrl = data.apiUrl;
    console.log(this.props.category);
    const finalUrl = baseUrl + `faq/`;
    console.log(this.props);
    console.log(finalUrl);
    fetch(finalUrl)
      .then(function (response) {
        return response.json();
      })
      .then(
        (result) => {
          console.log(result);
          this.setState({
            questions: result.results,
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }
  render() {
    const { questions } = this.state;

    let faqItem = <li className="title-placeHolder" />;
    faqItem = questions.map((q) => {
      return (
        <QuestionAnswer key={q.id} question={q.question} answer={q.answer} />
      );
    });
    return (
      <div className="container">
        <h3 className="text-centre calypso-orange-text">Questions & Answers</h3>
        <div>{faqItem}</div>
        <div className="text-centre mb-3" />
      </div>
    );
  }
}
