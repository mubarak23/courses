import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CourseList from './CourseList';
import { bindActionCreators } from 'redux';
import * as courseAction from '../../redux/actions/courseAction';
import * as authorAction from '../../redux/actions/authorAction';

class Posts extends Component {
  componentDidMount() {
    const { courses, authors, actions } = this.props;
    if (courses.length === 0) {
      actions.loadCourses().catch((error) => {
        alert(`Loading course fail ${error}`);
      });
    }

    if (authors.length === 0) {
      actions.loadAuthors().catch((error) => {
        alert(`Loading course fail ${error}`);
      });
    }
  }
  render() {
    return (
      <div>
        <h2>Courses</h2>
        <CourseList courses={this.props.courses} />
        {this.props.courses.map((course) => (
          <div key={course.title}>
            {course.title}
            <p>{course.postbody}</p>
          </div>
        ))}
      </div>
    );
  }
}

Posts.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  //createCourse: PropTypes.func.isRequired
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    courses: state.courses,
    authors: state.authors,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    //createCourse: course => dispatch(courseAction.createCourse(course))
    //createCourse: bindActionCreators(courseAction, dispatch)
    //actions: bindActionCreators(courseAction, dispatch),
    actions: {
      loadCourses: bindActionCreators(courseAction.loadPosts, dispatch),
      loadAuthors: bindActionCreators(authorAction.loadAuthors, dispatch),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Posts);
