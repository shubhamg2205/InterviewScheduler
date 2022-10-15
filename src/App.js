import React from "react";
import bootstrap from "bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Topbar from "./components/Topbar";
import Dashboard from "./components/Dashboard";
import "./App.css";
// import { interviews, users } from "./server/data";
import NewInterview from "./components/NewInterview";
import firebase from "./firebase";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      interviews: [],
      usersArray: [],
      usersObject: {},
      lastId: 0,
      interviewsObject: {},
      current: 0,
    };
  }
  async componentDidMount() {
    let users = [],
      interviews = [];
    const usersdb = firebase
      .firestore()
      .collection("Users")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          users.push(doc.data());
        });
        this.setState({ usersArray: users });
      });
    //console.log(users);
    
    this.setState((state) => {
      return {
        ...state,
        ["usersObject"]: { ...state.usersObject, ["users[0].name"]: users[0] },
      };
    });

    firebase
      .firestore()
      .collection("Interviews")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          interviews.push(doc.data());
        });
      });

    let interviewsObject2 = {};

    interviews.forEach((interview) => {
      if (!interviewsObject2[interview.date]) {
        interviewsObject2[interview.date] = [];
      }
      interviewsObject2[interview.date].push(interview);
      
    });

    this.setState((state) => {
      return {
        ...state,
        ["interviewsObject"]: interviewsObject2,
        ["interviews"]: interviews,
      };
    });
  }

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
    this.state.current = 1;

    this.setState({
      interviews: this.interviews,
    });
  };
  deleteInterview = (interview) => {
    const { interviews } = this.state;
    const x = interviews.indexOf(interview);
    interviews.splice(x, 1);
    this.setState({
      interviews: interviews,
    });
  };

  onCurrentChange = () => {
    this.setState({
      current: (this.state.current + 1) % 2,
    });
  };

  render() {
    console.log(this.state.usersObject);
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
              deleteInterview={this.deleteInterview}
              current={this.state.current}
              onCurrentChange={this.onCurrentChange}
            />
            {this.state.usersObject.shubhamg2205 && (
              <div>{JSON.stringify(this.state.usersObject)}</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
