var React = require('react');
var Page = require('page');
var Firebase = require('firebase');
var root = new Firebase("https://character-db.firebaseio.com/");

var Button = require('react-bootstrap/lib/Button');
var Input = require('react-bootstrap/lib/Input');

var Index = React.createClass({
  displayName: 'LandingPage',
  getInitialState: function() {
    return ({name : "", authed : false})
  },

  componentDidMount : function() {
    var auth = root.getAuth();

    if (auth) {
      this.setState({ authed : true });
      console.log("authed:", auth);
    }
    else {
      this.setState({ authed: false });
    }

    // this should be somewhere else...
    root.onAuth(function(authData) {
      if (authData) {

        if (this.isMounted()) {
          this.setState({ authed : true });  
        }
        
      }
      else {
        if (this.isMounted()) {
          this.setState({ authed : false });  
        }
      }
    }.bind(this))
  },
  handleClick : function(location, e) {
    
    if (location === "login") {
      Page("/login");
    }
    else if (location === "logout") {
      root.unauth();
    }
    else {
      Page("/campaign/" + this.state.name);
    }

    e.preventDefault();
    e.stopPropagation();
  },
  handleChange : function(e) {
    this.setState({ name : e.target.value });
  },
  render: function () {
    return (
      <div className="container">
        <h1>{"Basic Landing Page"} <small className="text-success">{(this.state.authed ? "Logged in" : "")}</small></h1>
        <p className="lead">{"To help demonstrate how routing works with Page.js and React components"}</p>
        <Button onClick={this.handleClick.bind(this, "login")}>Login</Button>
        <Button onClick={this.handleClick.bind(this, "logout")}>Logout</Button>
        <p className="lead">{"Or! You should make a try out the campaign thingy. Just enter a campaign name"}</p>
        <Input type="text" placeholder="Adventure Awaits" value={this.state.name} onChange={this.handleChange} />
        <Button onClick={this.handleClick.bind(this, "campaign")}>Create</Button>
      </div>
    );
  }
});

module.exports = Index;