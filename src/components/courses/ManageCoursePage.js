import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as courseAction from '../../redux/actions/courseAction';
import * as authorAction from '../../redux/actions/authorAction';

function ManageCoursePage({ courses, authors, loadCourses, loadAuthors }) {
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

  return (
    <div>
      <h2>Manage Course </h2>
    </div>
  );
}

ManageCoursePage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  //createCourse: PropTypes.func.isRequired
  actions: PropTypes.object.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    courses: state.courses,
    authors: state.authors,
  };
}

//object way of calling mapdispatchtoProps
const mapDispatchToProps = {
  loadCourses: courseAction.loadCourses,
  loadAuthors: authorAction.loadAuthors,
};

//createCourse: course => dispatch(courseAction.createCourse(course))
//createCourse: bindActionCreators(courseAction, dispatch)
//actions: bindActionCreators(courseAction, dispatch),

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
