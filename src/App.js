import React from 'react';
import SuccessAlert from './components/success-alert';
import ErrorAlert from './components/error-alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import './index.css';

const formValid = ({ formErrors, ...rest }) => {
  let valid = true

  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isPasswordShow: false,
      alert_message: "",
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      }
    };
  }

  togglePasswordVisiblity = () => {
    const { isPasswordShown } = this.state;
    this.setState({ isPasswordShown: !isPasswordShown });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      this.setState({ alert_message: "success" });
    } else {
      this.setState({ alert_message: "error" });
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length < 3 ? "minimum of 3 characters required" : ""
        break;
      case "lastName":
        formErrors.lastName =
          value.length < 3 ? "minimum of 3 characters required" : ""
        break;
      case "email":
        formErrors.email =
          emailRegex.test(value) ? "" : "Invalid email address"
        break;
      case "password":
        formErrors.password =
          value.length < 3 ? "minimum of 8 characters required" : ""
        break;
      default:
        break;
    }

    this.setState({
      formErrors, [name]: value
    });

  }

  render() {
    const { formErrors } = this.state;
    const { isPasswordShown } = this.state;
    return (
      <div className="wrapper">
        <hr />
        {this.state.alert_message === "success" ? <SuccessAlert /> : null}
        {this.state.alert_message === "error" ? <ErrorAlert /> : null}

        <div className="form-wrapper">
          <h1>Create Account</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="firstName">
              <label htmlFor="firstName">First Name</label>
              <input
                className={formErrors.firstName.length > 0 ? "error" : null}
                placeholder="First Name"
                type="text"
                name="firstName"
                onChange={this.handleChange}
                noValidate
              />
              {formErrors.firstName.length > 0 && (
                <span className="errorMessage">{formErrors.firstName}</span>
              )}
            </div>
            <div className="lastName">
              <label htmlFor="lastName">Last Name</label>
              <input
                className={formErrors.lastName.length > 0 ? "error" : null}
                placeholder="Last Name"
                type="text"
                name="lastName"
                onChange={this.handleChange}
                noValidate
              />
              {formErrors.lastName.length > 0 && (
                <span className="errorMessage">{formErrors.lastName}</span>
              )}
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Email"
                type="email"
                name="email"
                onChange={this.handleChange}
                noValidate
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                className={formErrors.password.length > 0 ? "error" : null}
                placeholder="Password"
                type={isPasswordShown ? "text" : "password"}
                name="password"
                onChange={this.handleChange}
                noValidate
              />
                <span onClick={this.togglePasswordVisiblity}>
                {isPasswordShown ? <FontAwesomeIcon icon={faEye} className="icon" /> : <FontAwesomeIcon icon={faEyeSlash} className="icon" />}
                </span>
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>
            <div className="createAccount">
              <button type="submit">Submit</button>
              <small>Already have an account</small>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App
