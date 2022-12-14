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
          backgroundColor:"white"
        }
      }>
        
        
        {this.props.current == 0 ? (
          <Upcoming
            interviews={this.props.interviews}
            usersObject={this.props.usersObject}
            editInterview={this.props.editInterview}
            deleteInterview={this.props.deleteInterview}
          />         
        ) : (
          <NewInterview
            usersArray={this.props.usersArray}
            interviewsObject={this.props.interviewsObject}
            onSubmit={this.props.onSubmit}
            addNewInterview={this.props.addNewInterview}
          />
        )}<br />
       
        <button
          className="btn btn-info btn-block"
          
          onClick={this.props.onCurrentChange}
          style={
            {
              width:"auto",
              margin:"0 auto",
              
            }
          }
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
