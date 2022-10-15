import React, { Component } from "react";

function Interview(props) {
  return (
    <div className="py-2" style={
      {
        width:"30vw",
        
      }
    }>
      
        <p className="list-group-item active" style={{
          margin:0,
          display:"flex",
          flexDirection:"row",
          flexWrap:"wrap",
          overflow:"break-around",
          justifyContent:"space-between"
        }}>
          <span>
            {props.interview.date} {props.interview.startTime} - {props.interview.endTime}
          </span>
         
          <button className="float-right" onClick={
            (event)=>{props.editInterview(props.interview);}
          }>
          <img alt="edit" src="https://cdn-icons-png.flaticon.com/128/1828/1828911.png" width="25px">
          </img>
          </button>
          
        </p>
        <p className="list-group-item px-0 py-0" style={{
          
          display:"flex",
          flexDirection:"row",
          flexWrap:"nowrap",
          justifyContent:"space-around",
          
        }}>
           <div style={{
            margin:0,
            display:"flex",
            flexDirection:"row",
            flexWrap:"wrap",
            justifyContent:"space-around"
          }}>
            {props.interview.participants.map((username) => (
              <div  style={{
                margin:0,
                width:"30vw",
                display:"flex",
            flexDirection:"row",
            flexWrap:"wrap",
            justifyContent:"space-around"
              }}
              >
                <span>{username}</span>
                <span>
                  {props.usersObject[username]
                    ? props.usersObject[username].contact
                    : "NULL"}
                </span>
                <span>
                  {props.usersObject[username] ? props.usersObject[username].email : "NULL"}
                </span>
                
              </div>
            ))}
            </div>
          </p>
        
      </div>
   
  );
}
export default Interview;
