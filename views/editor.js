var React = require('react');
var Page = require('page');

var Button = require('react-bootstrap/lib/Button');

var Editor = React.createClass({
  displayName: 'Editor',
  handleClick : function(e) {
    e.stopPropagation();
    e.preventDefault();

    Page("/");
  },
  render: function () {
    return (
      <div className="container">
        <h1>{this.props.campaignName || "Editor"}</h1>
        <p className="lead">{"For when you want to make custom campaigns!"}</p>
        <p>{"There's nothing here now, but there will be...someday...."}</p>
        <Button onClick={this.handleClick}>{"Back"}</Button>
      </div>
    );
  }
});

module.exports = Editor;