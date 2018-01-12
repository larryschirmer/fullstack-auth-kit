import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMessage } from '../actions';

class Feature extends Component {
  componentWillMount() {
    this.props.fetchMessage();
  }

  render() {
    return (
      <div>
        <div>{this.props.message}</div>
      </div>
    );
  }
}

function mapStateToProps({ content: { message } }) {
  return { message };
}

export default connect(mapStateToProps, { fetchMessage })(Feature);
