import React from 'react'
import data from '../data.json'
import ReCAPTCHA from 'react-google-recaptcha'

const recaptchaRef = React.createRef()

const validEmailRegex = RegExp(
  // eslint-disable-next-line
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
)
const validateForm = errors => {
  let valid = true
  Object.values(errors).forEach(val => val.length > 0 && (valid = false))
  return valid
}
export default class Contact extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fields: {
        name: '',
        email: '',
        message: '',
        reason: 'Calypsosun.com - Product Question',
        recaptcha: '',
      },
      errors: {
        name: '',
        email: '',
        message: '',
      },
      response: [],
    }
    this.handleChange = this.handleChange.bind(this)
    this.openTicket = this.openTicket.bind(this)
    this.recaptchaChange = this.recaptchaChange.bind(this)
  }

  handleChange(e) {
    this.setState({
      fields: {...this.state.fields, [e.target.name]: e.target.value},
    })
    const {name, value} = e.target
    const errors = this.state.errors

    switch (name) {
      case 'name':
        errors.fullName =
          value.length < 5 ? 'Full Name must be 5 characters long!' : ''
        break
      case 'email':
        errors.email = validEmailRegex.test(value) ? '' : 'Email is not valid!'
        break
      case 'message':
        errors.message =
          value.length < 8 ? 'Password must be 8 characters long!' : ''
        break
      default:
        break
    }

    this.setState({errors, [name]: value})
  }
  recaptchaChange(value) {
    this.setState({
      fields: {...this.state.fields, recaptcha: value},
    })
  }

  openTicket(fields) {
    const baseUrl = data.apiUrl
    const finalUrl = baseUrl + 'web/contact-us/'
    const myBody = fields
    fetch(finalUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(myBody),
    })
      .then(r => {
        return r.json()
      })
      .then(
        result => {
          this.setState({
            response: result,
          })
          if (result.message) {
            this.setState({
              response: result.message,
            })
          }
        },
        error => {
          console.log(error.code)
          console.error(error)
          this.setState({
            response: error,
          })
        },
      )
  }

  onSubmit = e => {
    e.preventDefault()
    if (validateForm(this.state.errors)) {
      this.openTicket(this.state.fields)
    } else {
      console.error('Invalid Form')
    }
  }

  render() {
    const {response, errors} = this.state

    return (
      <form>
        <div className="form-group">
          <label>
            YOUR FULL NAME: <span className="CalypsoOrangeText">*</span>
          </label>
          <input
            className="form-control"
            name="name"
            onChange={this.handleChange}
            placeholder="Full Name"
            required
            value={this.state.fields.Name}
          />
          {errors.name.length > 0 && (
            <span className="error">{errors.name}</span>
          )}
        </div>
        <div className="form-group">
          <label>
            YOUR EMAIL:<span className="CalypsoOrangeText">*</span>
          </label>
          <input
            className="form-control"
            name="email"
            onChange={this.handleChange}
            placeholder="Email"
            required
            type="email"
            value={this.state.fields.email}
          />
          {errors.email.length > 0 && (
            <span className="error">{errors.email}</span>
          )}
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input
            className="form-control"
            name="address"
            onChange={this.handleChange}
            placeholder="City, Country"
            value={this.state.fields.address}
          />
        </div>
        <div className="form-group">
          <label>REASON FOR CONTACT:</label>
          <select
            className="form-control"
            defaultValue={this.state.fields.reason}
            name="reason"
            onChange={this.handleChange}
          >
            <option value="Product Question">Product Question</option>
            <option value="Urgent: Change Order detail or Address">
              Urgent: Change Order detail or Address
            </option>
            <option value="Wholesale, Discount, promo code query">
              Wholesale, Discount, promo code query
            </option>
            <option value="Question about order or Delivery">
              Question about order or Delivery
            </option>
            <option value="Press Contact & Media">Press Contact & Media</option>

            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>
            YOUR MESSAGE<span className="CalypsoOrangeText">*</span>
          </label>
          <textarea
            className="form-control"
            name="message"
            onChange={this.handleChange}
            placeholder="Message"
            required
            rows="6"
            value={this.state.fields.description}
          />
          {errors.message.length > 0 && (
            <span className="error">{errors.message}</span>
          )}
        </div>
        <ReCAPTCHA
          onChange={this.recaptchaChange}
          ref={recaptchaRef}
          sitekey="6LfjPaEUAAAAAPGfkx7Nxp3glAdPGbLZE3lwY5c9"
        />
        <p>
          {response.success} {response.message}
        </p>
        <button
          className="btn btn-wide "
          onClick={e => this.onSubmit(e)}
          type="submit"
        >
          Submit
        </button>
        <div className="top50" />
      </form>
    )
  }
}
