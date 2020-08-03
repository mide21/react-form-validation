import React from 'react';
import SuccessAlert from './components/success-alert';
import ErrorAlert from './components/error-alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import './index.css';
import axios from 'axios';

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
      loading: false,
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

    const { firstName, lastName, email, password } = this.state;

    axios
      .post(
        "https://jsonplaceholder.typicode.com/posts",
        {
          user: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
          }
        }
      )
      .then(response => {
        console.log(response)
        if (formValid(this.state)) {
          this.setState({ alert_message: "success", loading: false });
        } else {
          this.setState({ alert_message: "error", loading: false });
        }
      })
      .catch(error => {
        console.log(error);
        alert(error);
        this.setState({
          loading: false
        });
      });
  };

  onLoad = () => {
    this.setState({
      loading: true
    })
  }

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
          value.length < 8 ? "minimum of 8 characters required" : ""
        break;
      default:
        break;
    }

    this.setState({
      formErrors, [name]: value
    });

  }

  render() {
    const { formErrors, isPasswordShown, loading, alert_message } = this.state;
    return (
      <div className="wrapper">
        <hr />
        {alert_message === "success" ? <SuccessAlert /> : null}
        {alert_message === "error" ? <ErrorAlert /> : null}

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
              <button type="submit" onClick={this.onLoad} disabled={loading}>
                { loading && <i className="fa fa-refresh fa-spin" style={{ marginRight: "7px" }} /> }
                { loading && <span>Submitting...</span> }
                { !loading && <span>Submit</span> }
              </button>
              <small>Already have an account</small>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App
