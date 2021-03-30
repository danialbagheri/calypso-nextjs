import React from "react";
// import data from "../data.json";
import ReCAPTCHA from "react-google-recaptcha";

const recaptchaRef = React.createRef();

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};
export default class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        name: "",
        email: "",
        message: "",
        subject: "Calypsosun.com - Product Question",
        recaptcha: "",
      },
      errors: {
        name: "",
        email: "",
        message: "",
      },
      response: [],
      success: null,
      ticketError: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.openTicket = this.openTicket.bind(this);
    this.recaptchaChange = this.recaptchaChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      fields: { ...this.state.fields, [e.target.name]: e.target.value },
    });
    const { name, value } = e.target;
    let errors = this.state.errors;

    switch (name) {
      case "name":
        errors.fullName =
          value.length < 5 ? "Full Name must be 5 characters long!" : "";
        break;
      case "email":
        errors.email = validEmailRegex.test(value) ? "" : "Email is not valid!";
        break;
      case "message":
        errors.message =
          value.length < 8 ? "Password must be 8 characters long!" : "";
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  }
  recaptchaChange(value) {
    this.setState({
      fields: { ...this.state.fields, recaptcha: value },
    });
  }

  openTicket(fields) {
    const baseUrl = process.env.API_URL;
    const finalUrl = baseUrl + `web/contact-us/`;
    const myBody = fields;
    fetch(finalUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(myBody),
    })
      .then((r) => {
        return r.json();
      })
      .then(
        (result) => {
          console.log(result);
          this.setState({
            response: result,
          });
          if (result.message) {
            this.setState({
              response: result.message,
              ticketError: true,
            });
          }
        },
        (error) => {
          console.error(error);
        }
      );
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (validateForm(this.state.errors)) {
      this.openTicket(this.state.fields);
    } else {
      console.error("Invalid Form");
    }
  };

  render() {
    const { response, ticketError, errors } = this.state;
    let formHasError;
    let formSuccessful;
    formSuccessful = <h2 style={{ color: "green" }}>{response.message}</h2>;
    if (response.length >= 1) {
      if (ticketError) {
        let responseList = response.map((e) => {
          return (
            <p>
              {e.code} {e.field} : {e.message}
            </p>
          );
        });
        formHasError = (
          <h2 style={{ color: "red" }}>
            Failed to Submit your message, errors are displayed below
            {responseList}
          </h2>
        );
      }
    }

    return (
      <form>
        <div className="form-group">
          <label>
            YOUR FULL NAME: <span className="CalypsoOrangeText">*</span>
          </label>
          <input
            className="form-control"
            name="name"
            placeholder="Full Name"
            value={this.state.fields.Name}
            onChange={this.handleChange}
            required
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
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.fields.email}
            onChange={this.handleChange}
            required
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
            placeholder="City, Country"
            value={this.state.fields.address}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label>REASON FOR CONTACT:</label>
          <select
            className="form-control"
            name="reason"
            defaultValue={this.state.fields.subject}
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
            placeholder="Message"
            value={this.state.fields.description}
            onChange={this.handleChange}
            rows="6"
            required
          />
          {errors.message.length > 0 && (
            <span className="error">{errors.message}</span>
          )}
        </div>
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey="6LfjPaEUAAAAAPGfkx7Nxp3glAdPGbLZE3lwY5c9"
          onChange={this.recaptchaChange}
        />
        {formSuccessful}
        {formHasError}
        <button
          className="btn btn-wide "
          type="submit"
          onClick={(e) => this.onSubmit(e)}
        >
          Submit
        </button>
        <div className="top50" />
      </form>
    );
  }
}
