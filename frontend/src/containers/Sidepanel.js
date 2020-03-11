import React from "react";
import { Spin, Icon } from "antd";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import * as navActions from "../store/actions/nav";
import * as messageActions from "../store/actions/message";
import Contact from "../components/Contact";
import Profile from "./Profile";
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

import userId from "../assets/newID";
import userMail from "../assets/newMail";
class Sidepanel extends React.Component {
  state = {
    loginForm: true,
    username: "none"
  };

  waitForAuthDetails() {
    const component = this;
    setTimeout(function() {
      if (
        component.props.token !== null &&
        component.props.token !== undefined
      ) {
        component.props.getUserChats(
          component.props.username,
          component.props.token
        );
        return;
      } else {
        console.log("waiting for authentication details...");
        component.waitForAuthDetails();
      }
    }, 100);
  }

  componentDidMount() {
    this.waitForAuthDetails();
  }

  openAddChatPopup() {
    this.props.addChat();
  }

  changeForm = () => {
    this.setState({ loginForm: !this.state.loginForm });
  };

  authenticate = e => {
    e.preventDefault();
    if (this.state.loginForm) {
      this.props.login(userId(), "B066967303");
    } else {
      this.props.signup(userId(), userMail(), "B066967303", "B066967303");
    }
  };

  render() {
    console.log("Chats", this.props.chats);
    let activeChats = this.props.chats.map(c => {
      let contactName = c.participants[0];
      if (contactName == this.props.username) contactName = c.participants[1];
      console.log("Kontakt", contactName);
      console.log(this.props.username);
      return (
        <Contact
          key={c.id}
          name={contactName}
          status="online"
          chatURL={`/${c.id}`}
        />
      );
    });
    return (
      <div id="sidepanel">
        <a name="top"></a>
        <div id="profile">
          <div className="wrap">
            <Profile />

            <div id="expanded">
              {this.props.loading ? (
                <Spin indicator={antIcon} />
              ) : this.props.isAuthenticated ? null : (
                // <button onClick={() => this.props.logout()} className="authBtn">
                //   <span>Logout</span>
                // </button>
                <div>
                  <form method="POST" onSubmit={this.authenticate}>
                    {this.state.loginForm ? null : null}

                    <button type="submit">Start</button>
                  </form>

                  {/* <button onClick={this.changeForm}>Switch</button> */}
                </div>
              )}
            </div>
          </div>
        </div>

        <div id="contacts">
          <ul>{activeChats}</ul>
        </div>
        {/* <div id="bottom-bar">
          <button id="addChat" onClick={() => this.openAddChatPopup()}>
            <i className="fa fa-user-plus fa-fw" aria-hidden="true" />
            <span>Create chat</span>
          </button>
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    loading: state.auth.loading,
    token: state.auth.token,
    username: state.auth.username,
    chats: state.message.chats
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (userName, password) =>
      dispatch(actions.authLogin(userName, password)),
    logout: () => dispatch(actions.logout()),
    signup: (username, email, password1, password2) =>
      dispatch(actions.authSignup(username, email, password1, password2)),
    addChat: () => dispatch(navActions.openAddChatPopup()),
    getUserChats: (username, token) =>
      dispatch(messageActions.getUserChats(username, token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidepanel);
