import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { signinUser } from '../../actions';

class Signin extends Component {
  handleFormSubmit({ email, password }) {
    console.log(email, password);
    this.props.signinUser({ email, password });
  }

  renderField({ input, label, type }) {
    return (
      <div className="form-group">
        <label>{label}</label>
        <input className="form-control" type={type} {...input} />
      </div>
    );
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
        <Field label="Email:" name="email" type="email" component={this.renderField} />
        <Field label="Password:" name="password" type="password" component={this.renderField} />
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">
          Sign in
        </button>
      </form>
    );
  }
}

function mapStateToProps({ auth }) {
  return { errorMessage: auth.error };
}

export default reduxForm({
  form: 'signin',
})(connect(mapStateToProps, { signinUser })(Signin));
