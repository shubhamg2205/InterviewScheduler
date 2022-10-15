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
    db:firebase.firestore();
    this.editInterview=this.editInterview.bind(this);
    this.deleteInterview=this.deleteInterview.bind(this);
  }

  async componentDidMount() {
    let userObj2={};
    let interviewsObject2 = {};
    let users = [],
      interviews = [];
      firebase
      .firestore()
      .collection("Users")
      .get()
      .then(  (snapshot)=>  {
        snapshot.forEach((doc)=> {
          users.push(doc.data());
        //  console.log(doc.data());
        });
        
       users.forEach( (user)=> {
      console.log(user);
      userObj2[user.username]=user;
      });
      //console.log(userObj2);
      this.setState((state) => {
        return {
          ...state,
          ["usersObject"]: userObj2,
           ["usersArray"]: users,
           
        };
      });
      });
      firebase
      .firestore()
      .collection("Interviews")
      .get()
      .then((snapshot) => {
        snapshot.forEach(async function(doc) {
          interviews.push(doc.data());
        });
        interviews.forEach((interview)=> {
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
            ['lastId']:interviews.length
          };
        });
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
    firebase.
    firestore().
    collection('Interviews').
    add(interview).then((docRef)=>{
       console.log("hellow");
    });
    this.setState({
      interviews: interviews,
      lastId: this.state.lastId + 1,
      current: 0,
    });
  };

  editInterview = (interview) => {
    // const idx=this.state.interviews.indexOf(interview);
    // console.log(idx);
    // const docRef=firebase.firestore().
    // collection('Interviews').
    // doc(this.state.interviews[idx].id);

    // console.log(docRef);
    // docRef.delete().then(()=>{
    //   console.log("deleted");
    // });
    
     
    this.setState({
      
      current :1
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
    //console.log(this.state.interviews)
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
            
              
            
          </div>
        </div>
      </div>
    );
  }
}

export default App;
