// config?
require('fastclick')(document.body);

// main requires
var React = require('react');
var wan = require('./data/wan');

// component requires
var TitleBar = require('./components/title-bar');
var ContentArea = require('./components/content-area');

// main out
var Character = React.createClass({
  displayName : "Character",
  render : function() {
    return (
      <div>
        <TitleBar character={wan} />
        <ContentArea character={wan} />
      </div>
    );
  }
});


// render Character
React.render(<Character />, document.body);