import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { signupUser } from '../../actions';
import { connect } from 'react-redux';

class Signup extends Component {
  handleFormSubmit({ email, password, passwordConfirm }) {
    console.log(email, password, passwordConfirm);
    this.props.signupUser({ email, password });
  }

  renderField({ input, label, type, meta: { error, touched } }) {
    return (
      <div className="form-group">
        <label>{label}</label>
        <input className="form-control" type={type} {...input} />
        {touched && error ? error : ''}
      </div>
    );
  }

  renderInput(label, name, type) {
    return <Field label={label} name={name} type={type} component={this.renderField} />;
  }

  renderAlert() {
    const { errorMessage } = this.props;
    if (errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        {this.renderInput('Email:', 'email', 'email')}
        {this.renderInput('Password:', 'password', 'password')}
        {this.renderInput('Confirm Password:', 'passwordConfirm', 'password')}
        {this.renderAlert()}
        <button action="submit" className="btn ntn-primary">
          Sign up!
        </button>
      </form>
    );
  }
}

function validate({ email, password, passwordConfirm }) {
  const errors = {};

  if (!email) errors.email = 'please enter an email';
  if (!password) errors.password = 'please enter an password';
  if (!passwordConfirm) errors.passwordConfirm = 'please enter an password confirmation';

  if (password !== passwordConfirm) errors.password = 'passwords must match';

  return errors;
}

function mapStateToProps({ auth: { error } }) {
  return { errorMessage: error };
}

export default reduxForm({
  validate,
  form: 'signup',
})(connect(mapStateToProps, { signupUser })(Signup));
