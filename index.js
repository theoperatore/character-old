// main requires
var React = require('react');
//var blank = require('./data/blankchar');
var ralf = require('./data/ralf');


// component requires
var TitleBar = require('./components/title-bar');
var ContentArea = require('./components/content-area');

// main out
var Character = React.createClass({
  displayName : "Character",
  render : function() {
    return (
      <div>
        <TitleBar character={ralf} />
        <ContentArea character={ralf} />
      </div>
    );
  }
});


// render Character
React.render(<Character />, document.body);