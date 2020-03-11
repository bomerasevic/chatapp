import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Hoc from "../hoc/hoc";
import photo from "../assets/loggedUser.png";

class Profile extends React.Component {
  render() {
    if (this.props.token === null) {
      return <Redirect to="/" />;
    }
    return (
      <div className="contact-profile">
        {this.props.username !== null ? (
          <Hoc>
            <img src={photo} alt="" />
            <p>{this.props.username}</p>
          </Hoc>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.auth.username,
    token: state.auth.token
  };
};

export default connect(mapStateToProps)(Profile);
