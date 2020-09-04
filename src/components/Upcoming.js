import React, { Component } from "react";

function Interview({ interview, usersObject }) {
  return (
    <div className="py-2">
      <ul className="list-group">
        <li className="list-group-item active">
          <span>
            {interview.date} {interview.startTime} - {interview.endTime}
          </span>
          <span className="float-right">Edit</span>
        </li>
        <li className="list-group-item px-0 py-0">
          <table className="table table-bordered mb-0">
            {interview.participants.map((username) => (
              <tr>
                <td>{username}</td>
                <td>
                  {usersObject[username]
                    ? usersObject[username].contact
                    : "NULL"}
                </td>
                <td>
                  {usersObject[username] ? usersObject[username].email : "NULL"}
                </td>
                <td>
                  <a
                    href={
                      usersObject[username]
                        ? usersObject[username].resume
                        : "NULL"
                    }
                    target="_blank"
                  >
                    Resume Link
                  </a>
                </td>
              </tr>
            ))}
          </table>
        </li>
      </ul>
    </div>
  );
}

export class Upcoming extends Component {
  render() {
    return (
      <div>
        {this.props.interviews.map((interview, index) => (
          <Interview
            key={index}
            interview={interview}
            usersObject={this.props.usersObject}
          />
        ))}
      </div>
    );
  }
}

export default Upcoming;
