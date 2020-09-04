import React from "react";
import bootstrap from "bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Topbar from "./components/Topbar";
import Dashboard from "./components/Dashboard";
import "./App.css";
import { interviews, users } from "./server/data";

class App extends React.Component {
  state = {
    interviews: interviews,
    usersArray: users,
    usersObject: {},
    lastId: interviews.length + 1,
    interviewsObject: {},
    current: 0,
  };

  addNewInterview = (interview) => {
    interview.id = this.state.lastId;
    let interviews = [...this.state.interviews, interview];
    let interviewsObject = this.state.interviewsObject;
    if (!interviewsObject[interview.date])
      interviewsObject[interview.date] = [];
    interviewsObject[interview.date].push(interview);
    interviews.sort((int1, int2) => {
      if (int1.date < int2.date) return -1;
      if (int1.date == int2.date) return int1.startTime - int2.startTime;
      return 1;
    });
    this.setState({
      interviews: interviews,
      lastId: this.state.lastId + 1,
      current: 0,
    });
  };

  editInterview = (interview) => {
    let interviews = this.state.interviews.map((int) =>
      int.id == interview.id ? interview : int
    );
    this.setState({ interviews });
  };

  componentDidMount() {
    let usersObject = {},
      interviewsObject = {};
    users.forEach((user) => (usersObject[user.username] = user));
    interviews.forEach((interview) => {
      if (!interviewsObject[interview.date])
        interviewsObject[interview.date] = [];
      interviewsObject[interview.date].push(interview);
    });
    this.setState({
      usersObject,
      interviewsObject,
    });
  }

  onCurrentChange = () => {
    this.setState({
      current: (this.state.current + 1) % 2,
    });
  };

  render() {
    return (
      <div className="app">
        <Topbar />
        <div className="box">
          <div className="content-box">
            <Dashboard
              interviews={this.state.interviews}
              interviewsObject={this.state.interviewsObject}
              usersArray={this.state.usersArray}
              usersObject={this.state.usersObject}
              addNewInterview={this.addNewInterview}
              editInterview={this.editInterview}
              current={this.state.current}
              onCurrentChange={this.onCurrentChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
