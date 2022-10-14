import React, { Component } from "react";

function SelectUser({
  usersArray = [],
  disabled = [],
  selected,
  name,
  onChange,
}) {
  return (
    <div className="form-group" name={name}>
      <select name={name} className="form-control" onChange={onChange}>
        <option value=""> Select </option>
        {usersArray.map((user, index) => (
          <option
            value={user.username}
            selected={user.username == selected}
            disabled={disabled.length > index ? disabled[index] : false}
          >
            {user.name} ({user.username})
          </option>
        ))}
      </select>
    </div>
  );
}

class InterviewForm extends Component {
  state = {
    date: this.props.date ? this.props.date : "2022-03-09",
    startTime: this.props.startTime ? this.props.startTime : "03:00",
    endTime: this.props.endTime ? this.props.endTime : "05:00",
    numberOfParticipants: this.props.numberOfParticipants
      ? this.props.numberOfParticipants
      : 2,
    participants: this.props.participants ? this.props.participants : ["", ""],
    error: "",
  };

  onDateTimechange = (eve) => {
    this.setState({
      [eve.target.name]: eve.target.value,
    });
  };

  onSubmit = (eve) => {
    console.log("Yaha ayaa hu");
    eve.preventDefault();
    let interview = {
      date: this.state.date,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      numberOfParticipants: this.state.numberOfParticipants,
      participants: this.state.participants,
    };
    let obj = {};
    let err = {};
    let isError = false;
    for (let i = 0; i < this.state.numberOfParticipants; i++) {
      const user = this.state.participants[i];
      console.log(user);
      if (!obj[user] && user) {
        obj[user] = 1;
        if (this.props.interviewsObject[interview.date]) {
          this.props.interviewsObject[interview.date].forEach((int) => {
            //console.log("yaha", int);
            let overlap = !(
              int.endTime < interview.startTime ||
              int.startTime > interview.endTime
            );
            if (
              overlap &&
              int.participants &&
              int.participants.indexOf(user) !== -1
            ) {
              isError = true;
              err[i] = "This user is not available for selected slot";
            }
          });
        }
      } else {
        isError = true;
        err[i] = user ? "Duplicate User" : "Please select valid input";
      }
    }

    if (isError) {
      this.setState({
        error: err,
      });
    } else {
      this.setState({
        error: "",
      });
      this.props.onSubmit(interview);
    }
  };

  onNumberofParticipantsChange = (eve) => {
    let participants = [];
    let numberOfParticipants = Number(eve.target.value);
    for (let i = 0; i < numberOfParticipants; i++) {
      participants.push(
        i < this.state.participants.length ? this.state.participants[i] : ""
      );
    }
    console.log(participants);
    console.dir(eve);
    this.setState({
      participants: participants,
      numberOfParticipants: numberOfParticipants,
    });
  };

  onUserChange = (eve) => {
    let name = eve.target.name;
    let value = eve.target.value;
    let participants = this.state.participants;
    participants[name] = value;
    this.setState({ participants });
  };

  render() {
    let numerOption = [2, 3, 4, 5, 6, 7, 8];
    return (
      <div>
        <form className="border px-3 py-3 rounded" onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              className="form-control"
              placeholder="interview date"
              name="date"
              required
              value={this.state.date}
              onChange={this.onDateTimechange}
            />
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Start Time</label>
              <input
                type="time"
                className="form-control"
                name="startTime"
                value={this.state.startTime}
                onChange={this.onDateTimechange}
                required
              />
            </div>
            <div className="form-group col-md-6">
              <label>End Time</label>
              <input
                type="time"
                name="endTime"
                className="form-control"
                value={this.state.endTime}
                onChange={this.onDateTimechange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Number of Participants</label>
            <select
              className="form-control"
              onChange={this.onNumberofParticipantsChange}
            >
              {numerOption.map((number) => (
                <option
                  key={number}
                  value={number}
                  selected={this.state.numberOfParticipants == number}
                >
                  {number}
                </option>
              ))}
            </select>
          </div>
          {this.state.participants.map((user, index) => (
            <React.Fragment key={index}>
              {this.state.error && this.state.error[index] && (
                <span className="text-danger">{this.state.error[index]}</span>
              )}
              <SelectUser
                usersArray={this.props.usersArray}
                disabled={[]}
                selected={user}
                name={index}
                onChange={this.onUserChange}
              />
            </React.Fragment>
          ))}
          <div>
            <button className="btn btn-primary"> Submit </button>
          </div>
        </form>
      </div>
    );
  }
}

export default InterviewForm;
