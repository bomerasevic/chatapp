import React from "react";
import { NavLink } from "react-router-dom";
import userPic from "../assets/user.png";

const Contact = props => (
  <NavLink to={`${props.chatURL}`} style={{ color: "#fff" }}>
    <li className="contact">
      <div className="wrap">
        <span className={`contact-status ${props.status}`} />
        <img src={userPic} alt="" />
        <div className="meta">
          <p className="name">{props.name}</p>
          <p className="preview">Hi</p>
        </div>
      </div>
    </li>
  </NavLink>
);

export default Contact;
