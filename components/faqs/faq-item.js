import QuestionAnswer from '../question-and-answers/question-answer'

export default function FaqItems({questions}) {
  let faqItem = <li className="title-placeHolder" />
  faqItem = questions.map(q => {
    return <QuestionAnswer answer={q.answer} key={q.id} question={q.question} />
  })
  return (
    <div className="container">
      <div>{faqItem}</div>
      <div className="text-centre mb-3" />
    </div>
  )
}
