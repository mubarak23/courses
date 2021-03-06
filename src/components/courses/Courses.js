import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CourseList from './CourseList';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import * as courseAction from '../../redux/actions/courseAction';
import * as authorAction from '../../redux/actions/authorAction';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';

class Courses extends Component {
  state = {
    redirectToAddCoursePage: false,
  };
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
  handkeDeleteCourse = async (course) => {
    toast.success('Course Deleted');
    try {
      await this.props.actions.deleteCourse(course);
    } catch (error) {
      toast.success('Delete Failed ' + error.message, { autoClose: false });
    }
  };
  render() {
    return (
      <div>
        {this.state.redirectToAddCoursePage && <Redirect to='/course' />}
        <h2>Courses</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <Fragment>
            <button
              style={{ marginBottom: 20 }}
              className='btn btn-primary add-course'
              onClick={() => this.setState({ redirectToAddCoursePage: true })}
            >
              Add Course
            </button>
            <CourseList
              onDeleteClick={this.handkeDeleteCourse}
              courses={this.props.courses}
            />
            {this.props.courses.map((course) => (
              <div key={course.title}>{course.title}</div>
            ))}
          </Fragment>
        )}
      </div>
    );
  }
}

Courses.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  //createCourse: PropTypes.func.isRequired
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map((course) => {
            return {
              ...course,
              authorName: state.authors.find((a) => a.id === course.authorId)
                .name,
            };
          }),
    authors: state.authors,
    loading: state.apiCallsInProgress > 0,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    //createCourse: course => dispatch(courseAction.createCourse(course))
    //createCourse: bindActionCreators(courseAction, dispatch)
    //actions: bindActionCreators(courseAction, dispatch),
    actions: {
      loadCourses: bindActionCreators(courseAction.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorAction.loadAuthors, dispatch),
      deleteCourse: bindActionCreators(courseAction.deleteCourse, dispatch),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Courses);
