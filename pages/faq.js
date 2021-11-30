import { useState, useRef, useEffect } from "react";
import FaqItems from "../components/faqs/faq-item";
import Image from "next/image";
import BreadCrumb from "../components/common/breadcrumb";

export default function Faq({ faqs }) {
  const [questions, setQuestions] = useState(faqs);
  const breadCrumbPath = [
    { name: "Home", url: "/" },
    { name: "FAQ", url: "/faq/" },
  ];
  const inputElement = useRef(null);

  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, []);
  function searchQuestions(e) {
    e.preventDefault();
    // input = document.getElementById("myInput");
    let filter = e.target.value.toUpperCase();
    let result = [];
    for (let i = 0; i < faqs.length; i++) {
      if (faqs[i].question.toUpperCase().indexOf(filter) > -1) {
        result.push(faqs[i]);
      }
    }
    setQuestions(result);
  }
  return (
    <div itemProp="mainEntity" itemScope itemType="http://schema.org/FAQPage">
      <div className="faq-row">
        <Image
          src="/faq/faqs.jpg"
          alt="Frequently Asked Questions"
          layout="fill"
          objectFit="cover"
          objectPosition="80% 100%"
        />
        <h3 itemProp="name" className="mt-4 faq-page-title text-calypso">
          Frequently Asked Questions
          <br />
          <input
            className="faqSearchInput"
            onChange={(e) => searchQuestions(e)}
            placeholder="Search"
            type="text"
            ref={inputElement}
          />
        </h3>
      </div>
      <div className="container">
        <div style={{ padding: 10 }}>
          <BreadCrumb breadcrumbs={breadCrumbPath} />
          <FaqItems questions={questions} />
        </div>
      </div>
    </div>
  );
}

async function getAllPages(pageCount, url) {
  let pageNumber = 1;
  let faqResults = [];
  for (pageNumber; pageNumber <= pageCount; pageNumber++) {
    let paginatedUrl = url + `?page=${pageNumber}`;
    const res = await fetch(paginatedUrl);
    const blogs = await res.json();
    faqResults.push(blogs.results);
  }
  return faqResults;
}

export async function getStaticProps(context) {
  const baseUrl = process.env.API_URL;
  const endpoint = `faq/`;
  const finalUrl = baseUrl + endpoint;
  const res = await fetch(finalUrl);
  const faqs = await res.json();
  const pageCount = Math.ceil(faqs.count / 10);
  let faqResults = await getAllPages(pageCount, finalUrl);
  // Now we will get the staff picked articles

  if (!faqResults) {
    return {
      notFound: true,
      isLoaded: false,
    };
  }

  return {
    props: { faqs: faqResults.flat(), isLoaded: true }, // will be passed to the page component as props
  };
}
