var React = require('react');
var Page = require('page');
var Firebase = require('firebase');
var root = new Firebase("https://character-db.firebaseio.com/");

var Input = require('react-bootstrap/lib/Input');
var Panel = require('react-bootstrap/lib/Panel');
var Button = require('react-bootstrap/lib/Button');
var ListGroup = require('react-bootstrap/lib/ListGroup');
var ListGroupItem = require('react-bootstrap/lib/ListGroupItem');

var Login = React.createClass({
  displayName: 'Login',
  getInitialState : function() {
    return ({ 
      profileName : "",
      email: "",
      pass: "",
      authed : false,
      chars : []
    });
  },
  componentWillMount: function () {
    var auth = root.getAuth();

    console.log("received characterName:", this.props.characterName);

    if (auth) {

      // if authenticated, load characters and profile name
      root.child('users').child(auth.uid).once("value", function(snap) {
        if (snap.val()) {
          var state = {};

          state.profileName = snap.val()['profile_name'];
          state.chars = (snap.val()['characters']) ? Object.keys(snap.val()['characters']) : [];

          this.setState(state);
        }
      }.bind(this));

      this.setState({ authed : true });
    }
    else {
      this.setState({ authed: false });
    }
  },
  handleClick : function(e) {
    e.stopPropagation();
    e.preventDefault();

    Page("/character/" + (this.state.name || "butts!").toLowerCase().replace(" ", "-"));
  },
  handleInput : function(cmp, e) {
    var state = {};
    state[cmp] = e.target.value;
    this.setState(state);
  },
  handleSignIn : function() {
    var user = {};

    if (this.state.email === "" || this.state.pass === "") return;

    user.email = this.state.email;
    user.password = this.state.pass;

    // do the signing in
    root.authWithPassword(user, this.authHandler);
  },
  authHandler : function(err, authData) {
    if (err) {
      console.log("auth failed!", err);
      alert('authentication failed! -- ' + err.message);
    }
    else {
      console.log("Auth success!");
      this.setState({ authed : true });

      root.child("users").child(authData.uid).once("value", function(snap) {
        var state = {};
        var user;

        if (snap.val()) {
          user = snap.val();
          
          // user already made a character, route to app
          if (this.props.characterName) {
            Page("/character/" + user['profile_name'] + "/" + this.props.characterName);
          }

          // user stays here and picks a name
          else {
            if (user.characters) {
              state.chars = Object.keys(user.characters);
            }

            state.profileName = user['profile_name'];
            this.setState(state);
          }
        }
        else {
          console.log("no snapshot received?", snap);
        }
      }.bind(this));
    }
  },
  handleCharLoad : function(idx) {
    console.log("user wants to load", idx, this.state.chars[idx]);
    console.log("should route to character/" + this.state.profileName + "/" + this.state.chars[idx]);

    var url = "/character/" + this.state.profileName + "/";

    if (idx === 'new') {
      Page(url + "new");
    }
    else {
      Page(url+this.state.chars[idx]);
    }
  },
  render: function () {
    var chars = [];
    this.state.chars.forEach(function(ch, i) {
      chars.push(
        <ListGroupItem key={i} onClick={this.handleCharLoad.bind(this, i)}>{ch}</ListGroupItem>
      )
    }, this);

    if (this.state.authed) {
      chars.push(
        <ListGroupItem key={"newCharacterListItem"} bsStyle="success" header="Create New Character" onClick={this.handleCharLoad.bind(this, "new")}></ListGroupItem>
      )
    }

    return (
      <div className="container">
        <h1>{'Login'} <small className="text-success">{(this.state.authed ? "Logged in" : "")}</small></h1>
        <p className="lead">{"This is Mystic Hat's stand-in login page"}</p>
        <p>{"You've made it to the login page! Routing has worked! Sign in!"} <a href="/">{"Back"}</a></p>
        <Input type="email"  placeholder="email" onChange={this.handleInput.bind(this, "email")} value={this.state.email}/>
        <Input type="password" placeholder="password"  onChange={this.handleInput.bind(this, "pass")} value={this.state.pass}/>
        <Button onClick={this.handleSignIn}>{"Sign In"}</Button>
        <div className={"charList"}>
          <ListGroup className={(chars.length === 0 ? "hide " : "")}>
            {chars}
          </ListGroup>
        </div>
        <p><small>{"Or "}<a href={"/signup/" + (this.props.characterName || "")}>Sign up</a></small></p>
      </div>
    );
  }
});

module.exports = Login;