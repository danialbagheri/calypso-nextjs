import {Box} from '@mui/material'

import BreadCrumb from 'components/common/breadcrumb'
import {getReturnPolicy} from 'services'

function TermsConditions({page, isLoaded}) {
  const breadCrumbPath = [
    {name: 'Home', url: '/'},
    {name: page.title, url: `/${page.slug}/`},
  ]
  return (
    <>
      {isLoaded ? (
        <div className="container">
          <div className="m-5 centre text-centre">
            <h1 className="text-centre">{page.title}</h1>
            <BreadCrumb breadcrumbs={breadCrumbPath} />
            <hr />
          </div>
          <div className="mt-3 mb-4">
            <div dangerouslySetInnerHTML={{__html: page.html}} />
          </div>
        </div>
      ) : (
        <Box sx={{maxWidth: 1200, p: 10}}>
          <p>Nothing found</p>
        </Box>
      )}
    </>
  )
}

export async function getStaticProps() {
  const page = await getReturnPolicy()

  // Now we will get the staff picked articles

  if (!page) {
    return {
      notFound: true,
      isLoaded: false,
    }
  }

  return {
    props: {page: page, isLoaded: true}, // will be passed to the page component as props
  }
}

export default TermsConditions
