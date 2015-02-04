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
  getInitialState : function() {
    return ({ character : wan })
  },
  editCharacter : function(data) {
    console.log("received from: ", data.path);
    console.log("     data: ", data.character);
    this.setState({ character : data.character });
  },
  render : function() {
    return (
      <div>
        <Title character={this.state.character}  edit={this.editCharacter} />
        <ContentArea character={this.state.character} edit={this.editCharacter} />
      </div>
    );
  }
});


// render Character
React.render(<Character />, document.body);