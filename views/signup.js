var React = require('react');
var Firebase = require('firebase');
var userdb = new Firebase('https://character-db.firebaseio.com/users');
var profdb = new Firebase('https://character-db.firebaseio.com/profiles');
var Page = require('page');

var Input = require('react-bootstrap/lib/Input');
var Button = require('react-bootstrap/lib/Button');
var Panel = require('react-bootstrap/lib/Panel');
var Alert = require('react-bootstrap/lib/Alert');

var Signup = React.createClass({
  displayName: 'Signup',
  getInitialState : function() {
    var state = {};

    state.name = "";
    state.email = "";
    state.email2 = "";
    state.password = "";
    state.password2 = "";
    state.errmsg = "";
    state.working = false;
    state.hasChecked = false;
    state.uniqueerror = false;
    state.emailerror = false;
    state.passworderror = false;

    return (state);
  },
  handleChange : function(cmp,e) {
    var node = {};
    node[cmp] = e.target.value;
    this.setState(node);
  },
  signup : function() {
    var user = {};

    // if this profile isn't unique, stop
    if (this.state.uniqueerror) return;

    // check for same emails
    if (this.state.email !== this.state.email2) {
      this.setState({ emailerror : true, errmsg : "email addresses doesn't match!" });
      return;
    }

    // check for same password
    if (this.state.password !== this.state.password2) {
      this.setState({ passworderror : true, errmsg : "passwords doesn't match!" });
      return;
    }

    this.setState({ working : true });

    user.email = this.state.email;
    user.password = this.state.password;

    // try to sign up
    userdb.createUser(user, this.handleCreateUser);

  },
  handleCreateUser : function(err, auth) {
    var login = {};

    if (err) {
      switch (err.code) {
        case "EMAIL_TAKEN":
          this.setState({ working : false, emailerror : true, errmsg : "That email address is already in use"});
          break;
        case "INVALID_EMAIL":
          this.setState({ working : false, emailerror : true, errmsg : "Looks like you have an invalid email address?"});
          break;
        default:
          console.log("Unhandled Error: ", err.message);
          this.setState({ working : false, emailerror : true, errmsg : "Looks like there are some problems..." + err.message});
      }
    }
    else {
      console.log("CREATE USER SUCCESS!");

      login.email = this.state.email;
      login.password = this.state.password;

      userdb.authWithPassword(login, this.handleAuth);
    }
  },
  handleAuth : function(err, auth) {
    var characterName = this.props.characterName || "";
    var user = {};

    if (err) {
      console.log("login failed!", err.message);
      Page('/login/' + characterName);
    }
    else {

      // save user info
      user['provider'] = auth.provider;
      user['profile_name'] = this.state.name.replace(" ", "-");
      user['signup_date'] = +new Date;

      userdb.child(auth.uid).set(user);
      profdb.child(user['profile_name']).set(auth.uid);

      Page('/character/' + this.state.name.replace(" ", "-") + "/" + characterName);
    }
  },
  checkProfileName : function() {
    if (this.state.name === "") return;
    profdb.child(this.state.name).once("value", this.handleProfileCheck);
  },
  handleProfileCheck : function(snap) {
    if (snap.val()) {
      this.setState({ hasChecked : true, uniqueerror : true, errmsg : "That name is already taken... " });
    }
    else {
      this.setState({ hasChecked : true, uniqueerror : false });
      console.log("profile ok");
    }
  },
  render: function () {
    var validname = (this.state.uniqueerror) ? "error" : "success";
    var validemail = (this.state.emailerror) ? "error" : "success";
    var validpass = (this.state.passworderror) ? "error" : "success";

    var alert = "";

    if (this.state.uniqueerror ||
        this.state.emailerror  ||
        this.state.passworderror)
    {
      alert = (
        <Alert bsStyle="warning">
          <h4>{"Oh No!"}</h4>
          <p>{this.state.errmsg}</p>
        </Alert>
      );
    }

    validname = (this.state.hasChecked) ? validname : null;

    return (
      <div className="container" style={{ width : "650px", margin: "0 auto" }}>
        <h1>{"Yeah! Sign up!"}</h1>
        <p className="lead">{"Create an account so that you can save your characters and campaigns and have fun time always beach party."}</p>
        <Panel disabled={this.state.working ? true : false}>
          {alert}
          <Input onBlur={this.checkProfileName} bsStyle={this.state.name === "" ? null : validname} hasFeedback type="text" addonBefore={"#"} value={this.state.name} onChange={this.handleChange.bind(this, "name")} placeholder={"unique profile name"} label={"Unique profile name"} help={"cannot contain punctuation, and all spaces are replaced with hyphens automatically"} />
          <Input value={this.state.email} onChange={this.handleChange.bind(this, "email")} bsStyle={this.state.email === "" ? null : validemail} hasFeedback type="text" addonBefore={"@"} placeholder={"email address"} />
          <Input value={this.state.email2} onChange={this.handleChange.bind(this, "email2")} type="text" addonBefore={"@"} placeholder={"confirm email address"} />
          <Input value={this.state.password} onChange={this.handleChange.bind(this, "password")} bsStyle={this.state.password === "" ? null : validpass} type="password" addonBefore={"*"} placeholder={"password"} />
          <Input value={this.state.password2} onChange={this.handleChange.bind(this, "password2")} type="password" addonBefore={"*"} placeholder={"confirm password"} />
          <Button onClick={this.signup} bsStyle="success">{this.state.working ?  "Creating..." : "Sign-up"}</Button>
        </Panel>
      </div>
    );
  }
});

module.exports = Signup;