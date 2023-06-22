import {useState} from 'react'
import QuestionAnswer from './question-answer'

export default function QuestionAndAnswerRow({faq}) {
  const [isLoaded] = useState(faq.length > 0)
  const [questions] = useState(faq)
  const [shownQuestions, setShownQuestions] = useState(faq.slice(0, 4))

  let faqItem = <li className="title-placeHolder" />
  const questionsList = shownQuestions.map(q => {
    return <QuestionAnswer answer={q.answer} key={q.id} question={q.question} />
  })
  faqItem = isLoaded ? (
    questionsList
  ) : (
    <p>There is no Question & Answer to show</p>
  )
  function LoadMore(e) {
    e.preventDefault()
    setShownQuestions(questions)
    e.target.nextElementSibling.style.display = 'none'
    e.target.style.display = 'none'
  }
  return (
    <div className="container">
      <h3 className="text-centre calypso-orange-text">Questions & Answers</h3>
      <div>{faqItem}</div>
      <div className="text-centre mb-3">
        <p>Have more questions?</p>
        <a className="btn btn-outline-calypso" onClick={e => LoadMore(e)}>
          See more
        </a>
        <span className="vertical-separator" id="verticalHide"></span>
        {/* eslint-disable-next-line */}
        <a className="btn btn-outline-calypso" href="/faq">
          Check other Q&A
        </a>
      </div>
    </div>
  )
}
