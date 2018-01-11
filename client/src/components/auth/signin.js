import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class Signin extends Component {
  handleFormSubmit({ email, password }) {
    console.log(email, password);
  }

  renderField({ input, label, meta }) {
    const { touched, error } = meta;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

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
})(Signin);
