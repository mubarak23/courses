import React, { Component } from "react";

class CoursePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      course: {
        title: ""
      }
    }
  }
  handleOnChange(event) {
    event.preventDefault();
    const course = { ...this.state.course, title: event.target.value};
    this.setState({ course })
  }
  render() {
    return (
      <div>
        <h2>Courses</h2>
        <form>
          <h4>Add Course</h4>
          <input type="text" onChange={this.handleOnChange} value={this.state.course.title} />
          <input type="submit" value="Save" />
        </form>
      </div>
    );
  }
}

export default CoursePage;
