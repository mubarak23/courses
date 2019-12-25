import React, { Component } from "react";

class CoursePage extends Component {
  state = {
    course: {
      title: ""
    }
  };
  //this.handleOnChange = this.handleOnChange.bind(this);

  handleOnChange = event => {
    event.preventDefault();
    const course = { ...this.state.course, title: event.target.value };
    this.setState({ course });
  };
  handleSubmit = event => {
    event.preventDefault();
    alert(this.state.course.title);
  };
  render() {
    return (
      <div>
        <h2>Courses</h2>
        <form onSubmit={this.handleSubmit}>
          <h4>Add Course</h4>
          <input
            type="text"
            onChange={this.handleOnChange}
            value={this.state.course.title}
          />
          <input type="submit" value="Save" />
        </form>
      </div>
    );
  }
}

export default CoursePage;
