// config? and preferences?
require('fastclick')(document.body);

// main requires
var React = require('react');
var wan = require('./data/wan');

// component requires
var Title = require('./components/title');
var ContentArea = require('./components/content-area');

// app preferences
var prefs = {
  atkBubbles : [
    {
      abil : "dex",
      prof : true,
      desc : "Attack Bonus"
    }
  ],
  spellBubbles : [
    {
      abil : "wis",
      prof : false,
      desc : "Attack Bonus"
    }
  ],
  spellDC : [
    {
      abil : "wis",
      prof : true,
      desc : "Ki DC"
    }
  ]
};

// main out
var Character = React.createClass({
  displayName : "Character",
  getInitialState : function() {
    return ({ character : wan, preferences : prefs })
  },
  editCharacter : function(data) {
    console.log("received from: ", data.path);
    console.log("     data: ", data.character);
    this.setState({ character : data.character });

    // save to firebase
  },
  editCharacterState : function(data) {
    console.log("received from: ", data.path);
    console.log("     updated: ", data.character);
    console.warn("this function has not yet been fully implemented. Nothing is saved.");

    // save to local storage only? or to firebase?
  },
  editPreferences : function(data) {
    console.log("received preferences from: ", data.path);
    console.log("     data: ", data.preferences);
    this.setState({ preferences : data.preferences });
    
    // save to local storage
  },
  render : function() {
    return (
      <div>
        <Title 
          character={this.state.character}  edit={this.editCharacter}
          preferences={this.state.preferences} editPreferences={this.editPreferences} 
        />
        <ContentArea 
          character={this.state.character} edit={this.editCharacter} 
          preferences={this.state.preferences} editPreferences={this.editPreferences} 
        />
      </div>
    );
  }
});


// render Character
React.render(<Character />, document.body);