import React from "react";
import data from "../../data.json";
import QuestionAnswer from "../faqs/questionAnswer";

export default class QuestionAndAnswerRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
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
    const finalUrl = baseUrl + `faq/${this.props.productSlug}/`;
    fetch(finalUrl)
      .then(function (response) {
        return response.json();
      })
      .then(
        (result) => {
          if (result.count >= 1) {
            this.setState({
              isLoaded: true,
              questions: result.results,
            });
          } else {
            this.setState({ isLoaded: false });
          }
        },
        (error) => {
          this.setState({ isLoaded: false });
          console.log(error);
        }
      );
  }
  render() {
    const { questions, isLoaded } = this.state;

    let faqItem = <li className="title-placeHolder" />;
    const questionsList = questions.slice(0, 5).map((q) => {
      return (
        <QuestionAnswer key={q.id} question={q.question} answer={q.answer} />
      );
    });
    faqItem = isLoaded ? (
      questionsList
    ) : (
      <p>There is no Question & Answer to show</p>
    );
    return (
      <div className="container">
        <h3 className="text-centre calypso-orange-text">Questions & Answers</h3>
        <div>{faqItem}</div>
        <div className="text-centre mb-3">
          <p>Have more questions?</p>
          <a className="btn btn-outline-calypso" href="/faq">
            Check other Q&A
          </a>
        </div>
      </div>
    );
  }
}
