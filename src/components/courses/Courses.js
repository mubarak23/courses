import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CourseList from './CourseList';
import { bindActionCreators } from 'redux';
import * as courseAction from '../../redux/actions/courseAction';
import * as authorAction from '../../redux/actions/authorAction';

class Courses extends Component {
  componentDidMount() {
    this.props.actions.loadCourses().catch(error => {
      alert(`Loading course fail ${error}`);
    });

    this.props.actions.loadAuthors().catch(error => {
      alert(`Loading course fail ${error}`);
    });
  }
  render() {
    return (
      <div>
        <h2>Courses</h2>
        <CourseList courses={this.props.courses} />
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
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map(course => {
            return {
              ...course,
              authorName: state.authors.find(a => a.id === course.authorId).name
            };
          }),
    authors: state.authors
  };
}

function mapDispatchToProps(dispatch) {
  return {
    //createCourse: course => dispatch(courseAction.createCourse(course))
    //createCourse: bindActionCreators(courseAction, dispatch)
    //actions: bindActionCreators(courseAction, dispatch),
    actions: {
      loadCourses: bindActionCreators(courseAction.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorAction.loadAuthors, dispatch)
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Courses);
