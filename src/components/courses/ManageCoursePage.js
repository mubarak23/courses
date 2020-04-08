import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CourseForm from './CourseForm';
import { newCourse } from '../../../tools/mockData';
import { loadCourses, saveCourse } from '../../redux/actions/courseAction';
import { loadAuthors } from '../../redux/actions/authorAction';

function ManageCoursePage({
  courses,
  authors,
  loadCourses,
  loadAuthors,
  saveCourse,
  history,
  ...props
}) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch((error) => {
        alert(`Loading course fail ${error}`);
      });
    }

    if (authors.length === 0) {
      loadAuthors().catch((error) => {
        alert(`Loading course fail ${error}`);
      });
    }
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: name === 'authorId' ? parseInt(value, 10) : value,
    }));
  }

  function handleSave(event) {
    event.preventDefault();
    console.log(course);
    saveCourse(course).then(() => {
      history.push('/courses');
    });
  }

  return (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
    />
  );
}

ManageCoursePage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  //createCourse: PropTypes.func.isRequired
  course: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    course: newCourse,
    courses: state.courses,
    authors: state.authors,
  };
}

//object way of calling mapdispatchtoProps
// note loadCourses : loadCourses
const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
  saveCourse,
};

//createCourse: course => dispatch(courseAction.createCourse(course))
//createCourse: bindActionCreators(courseAction, dispatch)
//actions: bindActionCreators(courseAction, dispatch),

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
