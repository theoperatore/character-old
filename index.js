// config? and preferences?
require('fastclick')(document.body);

// main requires
var React = require('react');
var Firebase = require('firebase');
var wan = require('./data/wan');
var blank = require('./data/blank');
var chardb = new Firebase("https://character-db.firebaseio.com/");
var snap;

// component requires
var Title = require('./components/title');
var ContentArea = require('./components/content-area');
var AppSettings = require('./components/app-settings');

var Modal = require('react-bootstrap/Modal');
var OverlayMixin = require('react-bootstrap/OverlayMixin');
var Button = require('react-bootstrap/Button');
var Input = require('react-bootstrap/Input');

// app preferences
var prefs = JSON.parse(localStorage.getItem("__character_preferences")) ||  {
  atkBubbles : [
    {
      abil : "str",
      prof : false,
      desc : "Attack Bonus"
    }
  ],
  spellBubbles : [
    {
      abil : "wis",
      prof : false,
      desc : "Spell Attack Bonus"
    }
  ],
  spellDC : [
    {
      abil : "wis",
      prof : true,
      desc : "Spell Save DC"
    }
  ]
};

// main out
var Character = React.createClass({
  displayName : "Character",
  mixins : [OverlayMixin],
  getInitialState : function() {
    return ({ 
      character : blank,
      preferences : prefs,
      needsName : false,
      name : ""
    })
  },
  componentWillMount: function () {
    // parse address and try to get character
    var hash = document.location.hash.split("#")[1] || "blank";
    var character = chardb.child(hash).once("value", function(snap) {
      if (snap.val()) {
        this.setState({ character : JSON.parse(snap.val().character) });
      }
      else {
        blank['charName'] = "Tap Me! To Create a new Character!";
        this.setState({ character : blank });
      }
    }.bind(this));
  },
  componentDidMount: function () {
    snap = new Snap({
      element : this.refs.content.getDOMNode(),
      disable : "right",
      touchToDrag : false
    });
  },
  createNewCharacter : function() {
    this.setState({ needsName : true });
    snap.close();
  },
  handleNewCharacter : function() {
    if (this.state.name == "") return;
    this.toggleNameModal();

    // new character!
    var newChar = blank;
    newChar['charName'] = this.state.name;

    // switch to new char hash!
    document.location.hash = "#" + this.state.name.toLowerCase().replace(" ", "-");

    // save new char!
    this.editCharacter({ path : "characterCreation", character : newChar });
  },
  toggleAppSettings : function() {
    if (snap.state().state === "left") {
      snap.close();
    }
    else {
      snap.open("left");
    }
  },
  toggleNameModal : function() {
    this.setState({ needsName : !this.state.needsName });
  },

  handleChange : function(e) {
    this.setState({ name : e.target.value });
  },
  renderOverlay : function() {
    if (!this.state.needsName) return (<span />);

    return (
      <Modal tittle="Set Character Name" onRequestHide={this.toggleNameModal}>
        <div className="modal-body">
          <p>{"I know it might be hard to just think of a name right here and right now, but you've most likely given it some thought beforehand. Go ahead and use the name that you've been thinking about all along..."}</p>
          <p>{"Maybe it's Bill, maybe it's Chet. I don't know. Use the name that means something to you; something that will stick with you for the long haul. Take your time. I haven't built in a way to change your name yet, so think of this name as IRREPLACEABLE."}</p>
          <p><strong>Good Luck!</strong></p>
          <Input type="text" placeholder="adventure awaits!" label="Any Character Name At All!" value={this.state.name} onChange={this.handleChange}/>
          <Input type="static" label="load your character at..." value={"http://anpetersen.me/character/#" + this.state.name.toLowerCase().replace(" ", "-")} />
        </div>
        <div className="modal-footer">
          <Button bsStyle="success" bsSize={"large"} onClick={this.handleNewCharacter}>{"Start New Adventure!"}</Button>
        </div>
      </Modal>
    );
  },
  editCharacter : function(data) {
    console.log("received from: ", data.path);
    console.log("     data: ", data.character);
    this.setState({ character : data.character });

    var out = {};
    out.character = JSON.stringify(data.character);

    // save to firebase
    chardb.child(data.character['charName'].toLowerCase().replace(" ", "-")).update(out);
  },
  editCharacterState : function(data) {
    console.log("received from: ", data.path);
    console.log("     updated: ", data.character);
    console.warn("this function has not yet been fully implemented. Nothing is saved.");

    // save to local storage only? or to firebase as well?
  },
  editPreferences : function(data) {
    console.log("received preferences from: ", data.path);
    console.log("     data: ", data.preferences);
    this.setState({ preferences : data.preferences });
    
    // save to local storage
    localStorage.setItem("__character_preferences", JSON.stringify(this.state.preferences));
  },
  render : function() {
    return (
      <div>
        <div className="snap-drawers">
          <div className="snap-drawer snap-drawer-left inverse">
            <AppSettings handleNewCharacter={this.createNewCharacter} />
          </div>
        </div>
        <div id="content" ref="content" className="snap-content">
          <Title 
            character={this.state.character}  edit={this.editCharacter}
            preferences={this.state.preferences} editPreferences={this.editPreferences}
            toggleAppSettings={this.toggleAppSettings}
          />
          <ContentArea 
            character={this.state.character} edit={this.editCharacter} 
            preferences={this.state.preferences} editPreferences={this.editPreferences} 
          />
        </div>
      </div>
    );
  }
});


// render Character
React.render(<Character />, document.body);