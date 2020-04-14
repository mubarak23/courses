import * as courseAction from './courseAction';
import * as types from './actionType';
import { courses, newCourse, authors } from '../../../tools/mockData';

describe('createCourseSuccess', () => {
  it('should create a CREATE_COURSE_SUCCESS action', () => {
    const course = courses[0];
    const expectedAction = {
      type: types.CREATE_COURSE_SUCCESS,
      course,
    };

    //the act
    const action = courseAction.createCourseSuccess(course);
    //make assertion
    expect(action).toEqual(expectedAction);
    
  });
});
