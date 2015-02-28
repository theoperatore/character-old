var React = require('react');
var Page = require('page');
var Firebase = require('firebase');
var ref = new Firebase('https://character-db.firebaseio.com');
var Button = require('react-bootstrap/lib/Button');
var ButtonGroup = require('react-bootstrap/lib/ButtonGroup');
var ListGroup = require('react-bootstrap/lib/ListGroup');
var ListGroupItem = require('react-bootstrap/lib/ListGroupItem');

var AppSettings = React.createClass({
  getInitialState : function() {
    var state = {};

    state.profile = "";
    state.chars = [];

    return (state);
  },
  componentWillMount : function() {
    var auth = ref.getAuth();

    if (auth && this.props.profile !== undefined) {
      ref.child('users').child(auth.uid).once('value', function(snap) {
        var user = snap.val();
        var state = {};

        state.profile = user['profile_name'];
        state.chars = (user['characters']) ? Object.keys(user['characters']) : [];

        this.setState(state);
      }.bind(this))
    }
  },
  signout : function() {
    if (ref.getAuth()) {
      ref.unauth();
      Page('/login');
    }
    else {
      Page('/login');
    }
  },
  handleCharLoad : function(idx) {
    this.props.toggle();
    Page('/character/' + this.state.profile + "/" + this.state.chars[idx]);
  },
  goToLogin : function() {
    Page('/login');
  },
  render : function() {

    var chars = [];
    this.state.chars.forEach(function(ch, i) {
      chars.push(
        <ListGroupItem key={i} onClick={this.handleCharLoad.bind(this, i)}>{ch}</ListGroupItem>
      )
    }, this);

    chars.push(
      <ListGroupItem bsStyle="success" header={"New Character"} key={"newCharacter"} onClick={this.props.handleNewCharacter}></ListGroupItem>
    );

    return (
      <div className="container-fluid">
        <h3>{"Character App Settings"}</h3>
        <ButtonGroup>
          <Button bsStyle="default" onClick={this.signout}>{(ref.getAuth() === null ? "Sign In" : "Sign Out")}</Button>
          <Button bsStyle="default" onClick={this.goToLogin}>{"Load Character"}</Button>
        </ButtonGroup>
        <div className={"charList"}>
          <ListGroup>
            {chars}
          </ListGroup>
        </div>
      </div>
    );
  }
})

module.exports = AppSettings;