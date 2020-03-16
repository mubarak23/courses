import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as courseAction from '../../redux/actions/courseAction';

class CoursePage extends Component {
  state = {
    course: {
      title: ''
    }
  };
  //this.handleOnChange = this.handleOnChange.bind(this);

  handleOnChange = event => {
    event.preventDefault();
    const course = { ...this.state.course, title: event.target.value };
    this.setState({ course });
  };
  handleSubmit = event => {
    event.preventDefault();
    this.props.dispatch(courseAction.createCourse(this.state.course));
    alert(this.state.course.title);
  };
  render() {
    return (
      <div>
        <h2>Courses</h2>
        <form onSubmit={this.handleSubmit}>
          <h4>Add Course</h4>
          <input
            type='text'
            onChange={this.handleOnChange}
            value={this.state.course.title}
          />
          <input type='submit' value='Save' />
        </form>
      </div>
    );
  }
}

CoursePage.PropTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    course: state.course
  };
}
export default connect(mapStateToProps)(CoursePage);
