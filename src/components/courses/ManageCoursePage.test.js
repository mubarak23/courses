import React from 'react';
import { mount } from 'enzyme';
import { courses, newCourse, authors } from '../../../tools/mockData';
import { ManageCoursePage } from './ManageCoursePage';

function render(args) {
  const defaultProps = {
    authors,
    courses,
    history: {},
    saveCourse: jest.fn(),
    loadCourse: jest.fn(),
    loadAuthors: jest.fn(),
    course: newCourse,
    match: {},
  };
  const props = { ...defaultProps, ...args };
  return mount(<ManageCoursePage {...props} />);
}

it('set error when attempting to save an empty title field', () => {
  const wrapper = render();
  wrapper.find('form').simulate('submit');
  const error = wrapper.find('.alert').first();
  expect(error.text()).toBe('Title is required.');
});
