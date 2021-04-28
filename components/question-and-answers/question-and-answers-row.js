import { useState } from "react";
import QuestionAnswer from "./question-answer";

export default function QuestionAndAnswerRow({ faq }) {
  const [isLoaded, setLoaded] = useState(faq.length > 0 ? true : false);
  const [questions, setQuestions] = useState(faq);

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
