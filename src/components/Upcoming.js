import React, { Component } from "react";
import Interview from "./Interview";

export class Upcoming extends Component {
  render() {
    return (
      <div>
        {this.props.interviews.map((interview, index) => (
          <Interview
            key={index}
            interview={interview}
            usersObject={this.props.usersObject}
            editInterview={this.props.editInterview}
          />
        ))}
      </div>
    );
  }
}

export default Upcoming;
