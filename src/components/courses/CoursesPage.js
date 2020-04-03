import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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

    //this.props.dispatch(courseAction.createCourse(this.state.course));
    //this.props.createCourse(this.state.course);
    this.props.actions.createCourse(this.state.course);
    //alert(this.state.course.title);
    console.log(this.state.course);
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

        {this.props.courses.map(course => (
          <div key={course.title}>{course.title}</div>
        ))}
      </div>
    );
  }
}

CoursePage.propTypes = {
  courses: PropTypes.array.isRequired,
  //createCourse: PropTypes.func.isRequired
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    courses: state.courses
  };
}

function mapDispatchToProps(dispatch) {
  return {
    //createCourse: course => dispatch(courseAction.createCourse(course))
    //createCourse: bindActionCreators(courseAction, dispatch)
    actions: bindActionCreators(courseAction, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);
