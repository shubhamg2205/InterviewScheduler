import React, { Component } from "react";
import Upcoming from "./Upcoming";
import NewInterview from "./NewInterview";

class Dashboard extends Component {
  render() {
    return (
      <div className="px-4 py-4" style={
        {
          width:"75vw",
          height:"auto",
          // display:"flex",
          // flexWrap:"row",
          // justifyContent:"space-around",
          backgroundColor:"orange"
        }
      }>
        
        
        {this.props.current == 0 ? (
          <Upcoming
            interviews={this.props.interviews}
            usersObject={this.props.usersObject}
            editInterview={this.props.editInterview}
          />
        ) : (
          <NewInterview
            usersArray={this.props.usersArray}
            interviewsObject={this.props.interviewsObject}
            addNewInterview={this.props.addNewInterview}
          />
        )}<br />
        <button
          className="btn btn-info btn-block"
          onClick={this.props.onCurrentChange}
        >
          {this.props.current == 0
            ? "Schedule new Interview"
            : "Back to Portal"}
        </button>
      </div>
    );
  }
}

export default Dashboard;
