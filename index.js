// config?
require('fastclick')(document.body);

// main requires
var React = require('react');
var wan = require('./data/wan');

// component requires
var Title = require('./components/title');
var ContentArea = require('./components/content-area');

// main out
var Character = React.createClass({
  displayName : "Character",
  render : function() {
    return (
      <div>
        <Title character={wan} />
        <ContentArea character={wan} />
      </div>
    );
  }
});


// render Character
React.render(<Character />, document.body);