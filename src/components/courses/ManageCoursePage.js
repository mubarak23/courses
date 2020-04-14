import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CourseForm from './CourseForm';
import { newCourse } from '../../../tools/mockData';
import { loadCourses, saveCourse } from '../../redux/actions/courseAction';
import { loadAuthors } from '../../redux/actions/authorAction';
import { toast } from 'react-toastify';
import Spinner from '../common/Spinner';

export function ManageCoursePage({
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
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch((error) => {
        alert(`Loading course fail ${error}`);
      });
    } else {
      setCourse({ ...props.course });
    }

    if (authors.length === 0) {
      loadAuthors().catch((error) => {
        alert(`Loading course fail ${error}`);
      });
    }
  }, [props.course]);

  function handleChange(event) {
    const { name, value } = event.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: name === 'authorId' ? parseInt(value, 10) : value,
    }));
  }

  function formIsValid() {
    const { title, authorId, category } = course;
    const errors = {};
    if (title) errors.title = 'Title is required.';
    if (authorId) errors.authorId = 'Author is required.';
    if (category) errors.category = 'Category is required.';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    //console.log(course);
    setSaving(true);
    //if (!formIsValid()) return;
    saveCourse(course)
      .then(() => {
        toast.success('Course Save');
        history.push('/courses');
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return authors.length === 0 || courses.length === 0 ? (
    <Spinner />
  ) : (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

ManageCoursePage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  //createCourse: PropTypes.func.isRequired
  course: PropTypes.object.isRequired,
  //actions: PropTypes.object.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export function getCourseBySlug(courses, slug) {
  //debugger;
  console.log(courses);
  return courses.find((course) => course.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  console.log(slug);
  //debugger;
  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;
  return {
    course,
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
