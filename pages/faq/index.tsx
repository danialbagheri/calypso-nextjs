import {useState} from 'react'

import Image from 'next/image'
import {CustomOutlinedInput} from 'components/shared'
import BreadCrumb from 'components/common/breadcrumb'
import FaqItems from 'components/faqs/faq-item'
import {FaqType} from 'types'
import {getFaqs} from 'services'

interface PropsType {
  faqs: FaqType[]
}

export default function Faq(props: PropsType) {
  const {faqs} = props

  const [questions, setQuestions] = useState(faqs)
  const [search, setSearch] = useState<string>('')

  const breadCrumbPath = [
    {name: 'Home', url: '/'},
    {name: 'FAQ', url: '/faq/'},
  ]

  const searchHandle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault()
    const value = e.target.value
    setSearch(value)
    const filter = value.toUpperCase().trim()
    const result = faqs.filter(faq =>
      faq.question.toUpperCase().includes(filter),
    )
    setQuestions(result)
  }

  return (
    <div itemProp="mainEntity" itemScope itemType="http://schema.org/FAQPage">
      <div className="faq-row">
        <Image
          alt="Frequently Asked Questions"
          fill
          src="/faq/faqs.jpg"
          style={{objectFit: 'cover', objectPosition: '80% 100%'}}
        />
        <h3 className="mt-4 faq-page-title text-calypso" itemProp="name">
          Frequently Asked Questions
          <br />
          <CustomOutlinedInput
            onChange={e => searchHandle(e)}
            placeholder="Search"
            sx={{'& input': {bgcolor: '#FFF'}}}
            type="text"
            value={search}
          />
        </h3>
      </div>
      <div className="container">
        <div style={{padding: 10}}>
          <BreadCrumb breadcrumbs={breadCrumbPath} />
          <FaqItems questions={questions} />
        </div>
      </div>
    </div>
  )
}

async function getAllFaqs() {
  const pageNumber = 1
  const faqResults = []

  const response = await getFaqs(pageNumber)
  faqResults.push(response?.results)
  const responseCount = response?.count
  const pageCount = Math.ceil(responseCount / 10)
  if (pageCount > 1) {
    for (let i = 2; i <= pageCount; i++) {
      const response = await getFaqs(i)
      faqResults.push(response?.results)
    }
  }

  return faqResults.flat()
}

export async function getStaticProps() {
  const faqs = await getAllFaqs()

  if (!faqs) {
    return {
      notFound: true,
      isLoaded: false,
    }
  }

  return {
    props: {faqs: faqs},
  }
}
