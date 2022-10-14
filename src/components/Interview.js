import React, { Component } from "react";

function Interview(props) {
  return (
    <div className="py-2">
      <ul className="list-group">
        <li className="list-group-item active">
          <span>
            {props.interview.date} {props.interview.startTime} - {props.interview.endTime}
          </span>
          <button className="float-right" onClick={
            ()=>{props.editInterview(props.interview);
              
            }
          } >Edit</button>
        </li>
        <li className="list-group-item px-0 py-0">
          <table className="table table-bordered mb-0">
            {props.interview.participants.map((username) => (
              <tr>
                <td>{username}</td>
                <td>
                  {props.usersObject[username]
                    ? props.usersObject[username].contact
                    : "NULL"}
                </td>
                <td>
                  {props.usersObject[username] ? props.usersObject[username].email : "NULL"}
                </td>
                
              </tr>
            ))}
          </table>
        </li>
      </ul>
    </div>
  );
}
export default Interview;
