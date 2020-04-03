import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseAction from '../../redux/actions/courseAction';

class Courses extends Component {
  componentDidMount() {
    this.props.actions.loadCourses().catch(error => {
      alert(`Loading course fail ${error}`);
    });
  }
  render() {
    return (
      <div>
        <h2>Courses</h2>

        {this.props.courses.map(course => (
          <div key={course.title}>{course.title}</div>
        ))}
      </div>
    );
  }
}

Courses.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(Courses);
