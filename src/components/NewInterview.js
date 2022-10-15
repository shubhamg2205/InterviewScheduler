import React, { Component } from "react";
import InterviewForm from "./InterviewForm";

class NewInterview extends Component {
  onSubmit = (interview) => {
    interview.createdAt = new Date();
    this.props.addNewInterview(interview);
  };

  render() {
   // console.log(this.props.interviewsObject);
    return (
      <div>
        <InterviewForm
          usersArray={this.props.usersArray}
          interviewsObject={this.props.interviewsObject}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

export default NewInterview;
