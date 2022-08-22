import * as React from 'react'

import {Formik, Form, useField} from 'formik'
import * as Yup from 'yup'
import ReCAPTCHA from 'react-google-recaptcha'
import data from '../data.json'

const recaptchaRef = React.createRef()

const MyTextInput = ({label, ...props}) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props)
  return (
    <div className="form-group">
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </div>
  )
}

const MyTextAreaInput = ({label, ...props}) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props)

  return (
    <div className="form-group">
      <label htmlFor={props.id || props.name}>
        {label}
        <span className="CalypsoOrangeText">*</span>
      </label>
      <textarea className="form-control" {...field} {...props} rows="6" />
      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </div>
  )
}

const MyCheckbox = ({children, ...props}) => {
  const [field, meta] = useField({...props, type: 'checkbox'})
  return (
    <div className="form-check">
      <input className="form-check-input" type="checkbox" {...field} {...props} />
      <label className="form-check-label">{children}</label>
      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </div>
  )
}

const MySelect = ({label, ...props}) => {
  const [field, meta] = useField(props)
  return (
    <div className="form-group">
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </div>
  )
}

function submitContactForm(values, {setSubmitting, setFieldError, setStatus}) {
  setSubmitting(true)
  const baseUrl = data.apiUrl
  const finalUrl = baseUrl + `web/contact-us/`
  fetch(finalUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  })
    .then(r => {
      if (r.status != 201) {
        setStatus('There was a problem')
        return r.json()
      } else {
        return r.json()
      }
    })
    .then(result => {
      setFieldError(result)
      setResponse(result)
    })
    .catch(error => {
      setStatus(
        'There is a network connection problem, please try again later or send us an email to info@calypsosun.com',
      )
      console.error(error)
    })
}

// And now we can use these
const ContactUsForm = () => {
  const [response, setResponse] = React.useState('')

  return (
    <>
      <Formik
        initialValues={{
          name: '',
          address: '',
          email: '',
          // mailChimp: false,
          reason: 'Product Question',
          message: '',
          recaptcha: '',
        }}
        validationSchema={Yup.object({
          name: Yup.string().max(35, 'Must be 35 characters or less').required('Required'),
          address: Yup.string().min(5, 'Must be 5 characters or More').required('Required'),
          email: Yup.string().email('Invalid email address').required('Required'),
          // mailChimp: Yup.boolean(),
          reason: Yup.string()
            .oneOf(
              [
                'Product Question',
                'Urgent: Change Order detail or Address',
                'Wholesale, Discount, promo code query',
                'Question about order or Delivery',
                'Press Contact & Media',
                'Other',
              ],
              'Invalid Reason Type',
            )
            .required('Required'),
          message: Yup.string().min(5, 'Must be 5 characters or More').required('Required'),
          recaptcha: Yup.string().required(),
        })}
        onSubmit={(values, {setSubmitting, setFieldError, setStatus}) =>
          submitContactForm(values, {setSubmitting, setFieldError, setStatus})
        }
      >
        {({isSubmitting, status, setFieldValue}) => (
          <Form>
            <MyTextInput className="form-control" label="Your full name" name="name" type="text" placeholder="Jane" />

            <MyTextInput
              className="form-control"
              label="Address (city,country)"
              name="address"
              type="text"
              placeholder="Manchester, United Kingdom"
            />

            <MyTextInput
              className="form-control"
              label="Email Address"
              name="email"
              type="email"
              placeholder="jane@email.com"
            />

            <MySelect label="Reason for contact" name="reason" className="form-control">
              <option value="Product Question">Product Question</option>
              <option value="Urgent: Change Order detail or Address">Urgent: Change Order detail or Address</option>
              <option value="Wholesale, Discount, promo code query">Wholesale, Discount, promo code query</option>
              <option value="Question about order or Delivery">Question about order or Delivery</option>
              <option value="Press Contact & Media">Press Contact & Media</option>

              <option value="Other">Other</option>
            </MySelect>
            <MyTextAreaInput
              className="form-control"
              label="Your message"
              name="message"
              type="text"
              placeholder="Dear Calypso team..."
            />

            {/* <MyCheckbox name="mailChimp" className="form-check-input">
                I would like to sign up to Calypso (Linco Care) newsletter.
              </MyCheckbox> */}
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey="6LfjPaEUAAAAAPGfkx7Nxp3glAdPGbLZE3lwY5c9"
              onChange={value => {
                // setFieldValue("recaptcha", value);
                setFieldValue('recaptcha', recaptchaRef.current.getValue())
              }}
            />
            <div className="form-group mt-2">
              <p className="text-danger">{status}</p>
              <button
                type="submit"
                className="btn btn-wide"
                // disabled={isSubmitting}
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
      {response.success == 'Success' ? (
        <p className="text-success">Successfully submitted</p>
      ) : (
        <p className="text-danger">{response.message}</p>
      )}
    </>
  )
}

export default ContactUsForm
