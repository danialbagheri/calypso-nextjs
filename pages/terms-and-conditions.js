function TermsConditions({ page, isLoaded }) {
  return (
    <>
      {isLoaded ? (
        <div className="container">
          <div dangerouslySetInnerHTML={{ __html: page.html }} />
        </div>
      ) : (
        <p>Nothing found</p>
      )}
    </>
  );
}

export async function getStaticProps(context) {
  const baseUrl = process.env.API_URL;
  const endpoint = `page/terms-and-conditions/`;
  const finalUrl = baseUrl + endpoint;
  const res = await fetch(finalUrl);
  const page = await res.json();

  // Now we will get the staff picked articles

  if (!page) {
    return {
      notFound: true,
      isLoaded: false,
    };
  }

  return {
    props: { page: page, isLoaded: true }, // will be passed to the page component as props
  };
}

export default TermsConditions;
