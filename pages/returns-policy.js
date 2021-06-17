import BreadCrumb from "../components/common/breadcrumb";

function TermsConditions({ page, isLoaded }) {
  const breadCrumbPath = [
    { name: "Home", url: "/" },
    { name: page.title, url: `/${page.slug}/` },
  ];
  return (
    <>
      {isLoaded ? (
        <div className="container">
          <div className="m-5 centre text-centre">
            <h1 className="text-centre">{page.title}</h1>
            <BreadCrumb breadcrumbs={breadCrumbPath} />
            <hr />
          </div>
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
  const endpoint = `page/returns-policy/`;
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
