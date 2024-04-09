import Link from 'next/link'
import Head from 'next/head'
import ContactUsForm from 'components/contact-form'
import {Box, Typography, useTheme} from '@mui/material'
import {
  INFO_EMAIL,
  PHONE_NUMBER_TO_DIAL,
  PHONE_NUMBER_TO_SHOW,
  WEBSITE_NAME_FULL_NAME,
} from 'constants/general'

function ContactUs() {
  const theme = useTheme()

  return (
    <div className="container">
      <Head>
        <title>{WEBSITE_NAME_FULL_NAME} - Contact Us</title>
      </Head>
      <div className="row">
        <h1 className="text-centre">Contact Us</h1>
        <div className="col-md-6 col-12">
          <h5>Questions about our products or an order?</h5>
          <Typography fontSize={18}>
            <Link href="/faq/" style={{color: theme.palette.primary.main}}>
              Frequently Asked Questions
            </Link>
            &nbsp;or get in touch with us by filling out the contact form.
            Alternatively, please email or call our customer support team.
          </Typography>
          <Box
            p="16px 8px"
            sx={{display: 'flex', flexDirection: 'column', gap: 3}}
          >
            <Typography color="primary" fontSize={18}>
              <Link href={`mailto:${INFO_EMAIL}`}>{INFO_EMAIL}</Link>
            </Typography>
            <Typography color="primary" fontSize={18}>
              <Link href={`tell:${PHONE_NUMBER_TO_DIAL}`}>
                {PHONE_NUMBER_TO_SHOW}
              </Link>
            </Typography>
          </Box>
          {/* <Contact /> */}
          <ContactUsForm />
        </div>
        <div className="col-md-6 col-12">
          <h5>Before contacting us please check this information</h5>
          <ul className="text-lg">
            <li>
              <Link className="disableLink" href="/privacy-policy">
                Privacy Policy
              </Link>
            </li>

            <li className="mt-1">
              <Link className="disableLink" href="/returns-policy">
                Delivery & Return Policy
              </Link>
            </li>
          </ul>
          <p>
            <strong>Postal Address</strong>
          </p>
          <p>
            Calypso Team - Linco Care Ltd.
            <br />
            Linco House
            <br />
            Manchester Road
            <br />
            Manchester,
            <br />
            M31 4BX
            <br />
            United Kingdom
            <br />
          </p>
          <p>
            <strong>Return Address</strong>
          </p>
          <p>
            Calypso - QHorizons Ltd.
            <br />
            Linco House
            <br />
            Manchester Road
            <br />
            Manchester,
            <br />
            M31 4BX
            <br />
            United Kingdom
            <br />
          </p>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
