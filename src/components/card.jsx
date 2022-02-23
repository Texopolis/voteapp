import React from "react";

export default function Card (props){
    return(
     <div className="card">
      <div className='img' style={{backgroundImage: `url(${props.img})`}}></div>
            <div className="info">
                <h2 className="name">{props.name}</h2>
                <h3 className="voteCount">Current Count: {props.voteCount}</h3>
                <button className="btn"
                        onClick= {()=>{props.vote(props.id)}}
                        >VOTE: {props.name}
                </button>
            </div>
        </div>
    
    )}