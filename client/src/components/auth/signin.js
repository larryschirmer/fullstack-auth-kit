import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { signinUser } from '../../actions';

class Signin extends Component {
  handleFormSubmit({ email, password }) {
    console.log(email, password);
    this.props.signinUser({ email, password });
  }

  renderField({ input, label }) {
    return (
      <div className="form-group">
        <label>{label}</label>
        <input className="form-control" type="text" {...input} />
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field label="Email:" name="email" component={this.renderField} />
        <Field label="Password:" name="password" component={this.renderField} />
        <button action="submit" className="btn btn-primary">
          Sign in
        </button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'signin',
})(connect(null, { signinUser })(Signin));
