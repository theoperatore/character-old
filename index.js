// config? and preferences?
require('fastclick')(document.body);

// main requires
var React = require('react');
var Firebase = require('firebase');
var Immutable = require('immutable');
//var wan = require('./data/wan');
var blank = require('./data/blank');
var chardb = new Firebase("https://character-db.firebaseio.com/");
var snap;

// component requires
var Title = require('./components/title');
var ContentArea = require('./components/content-area');
var AppSettings = require('./components/app-settings');
var Affix = require('./components/affix');

var Modal = require('react-bootstrap/lib/Modal');
var Alert = require('react-bootstrap/lib/Alert');
var OverlayMixin = require('react-bootstrap/lib/OverlayMixin');
var Button = require('react-bootstrap/lib/Button');
var Input = require('react-bootstrap/lib/Input');
var Nav = require('react-bootstrap/lib/Nav');
var NavItem = require('react-bootstrap/lib/NavItem');
var Glyphicon = require('react-bootstrap/lib/Glyphicon');

React.initializeTouchEvents(true);

// initial character status and app preferences
var initStatus = {};
var initPrefs;

initStatus.hitdice = {};
initStatus.hitpoints ={};
initStatus.hitdice.curr = 1;
initStatus.hitpoints.curr = 100;
initStatus.hitpoints.temp = 0;

initPrefs = {
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

// app preferences / status
var prefs = JSON.parse(localStorage.getItem("__character_preferences")) || initPrefs;
var status = JSON.parse(localStorage.getItem("__character_status")) || initStatus;

// main out
var Character = React.createClass({
  displayName : "Character",
  mixins : [OverlayMixin],
  getInitialState : function() {
    var state = {};

    state.character = new Immutable.fromJS(blank);
    state.preferences = new Immutable.fromJS(prefs);
    //state.status = status;
    state.activeNav = 0;
    state.needsName = false;
    state.name = "";
    state.dead = false;
    state.deadCount = 0;
    state.deadMsg = "";
    state.deadAlert = false;
    
    return (state);
  },
  componentWillMount: function () {
    // parse address and try to get character
    var hash = document.location.hash.split("#")[1] || "blank";
    var character;
    var loadedprefs; 

    chardb.child(hash).once("value", function(snap) {
      if (snap.val()) {
        character = JSON.parse(snap.val().character);

        console.log("loading character: ", character['charName'], "...");

        if (snap.val().preferences) {
          console.log("using database preferences");
          loadedprefs = JSON.parse(snap.val().preferences);
        }
        else {
          loadedprefs = prefs;
          console.log("using default / localStorage prefs");
        }        

        // quick fix for augmenting character data structure already in the db
        character['charResistances'] = character['charResistances'] ? character['charResistances'] : [];
        character['charHitPoints']['hitDiceCurrent'] = character['charHitPoints']['hitDiceCurrent'] !== undefined ? character['charHitPoints']['hitDiceCurrent'] : character['charInfo']['level'];
        character['charPassivePerception']['bonus'] = character['charPassivePerception']['bonus'] === undefined ? 0 : character['charPassivePerception']['bonus'];

        // spell slots quick fix
        if (character['charSpells'][1]['used'] === undefined) {
          for (var i = 1; i < 10; i++) {
            character['charSpells'][i]['used'] = 0;
          }
        }

        // spell quick fix for prepared
        if (character['charSpells'][0]['spells'][0] && character['charSpells'][0]['spells'][0]['prepared'] === undefined) {
          for (var i = 0; i < 10; i++) {
            for (var j = 0; j < character['charSpells'][i]['spells'].length; j++) {
              character['charSpells'][i]['spells'][j]['prepared'] = false;
            }
          }
        }

        // class charges quick fix
        if (character['charClassCharges'][0] && character['charClassCharges'][0]['used'] === undefined) {
          for (var i = 0; i < character['charClassCharges'].length; i++) {
            character['charClassCharges'][i]['used'] = 0;
            character['charClassCharges'][i]['display'] = character['charClassCharges']['name'];
          }
        }

        // class charges quick fix 2 -- diff display names
        if (character['charClassCharges'][0]['display'] === undefined) {
          for (var i = 0; i < character['charClassCharges'].length; i++) {
            character['charClassCharges'][i]['display'] = character['charClassCharges'][i]['name'];
          } 
        }

        // convert character skills to array with names as elements
        // and confirm that skills have bonus property
        if (character['charSkills'].length === undefined) {
          var skills = [];
          Object.keys(character['charSkills']).forEach(function(key) {
            var sk = character['charSkills'][key];
            sk.name = key;
            sk.bonus = sk.bonus === undefined ? 0 : sk.bonus;

            skills.push(sk);
          });

          skills.sort(function(a, b) {
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1

            return 0;
          });
          //console.log(skills);
          character['charSkills'] = skills;
        }
        

        document.title = character['charName'];
        var out = this.state.character.mergeDeep(character);
        loadedprefs = this.state.preferences.mergeDeep(loadedprefs);

        this.setState({ character : out,  preferences : loadedprefs });
      }
      else {
        blank['charName'] = "Tap Me! To Create a new Character!";
        character = this.state.character.mergeDeep(blank);
        document.title = "New Character";
        this.setState({ character : character });
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

  //************************* DEBUG *****************************************//
  componentDidUpdate: function (prevProps, prevState) {
    window.character = this.state.character;
  },
  //************************* DEBUG *****************************************//
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

  cancelDeadHide : function() {
    var msg = "";

    if (this.state.deadCount < 3) {
      msg = "Sorry, but your character is dead..."; 
    }
    else if (this.state.deadCount >= 3 && this.state.deadCount <= 5) {
      msg = "I'm really sorry...but there's no will for your character to live...";
    }
    else if (this.state.deadCount > 5 && this.state.deadCount <= 8) {
      msg = "maybe if you made a really good roll and prayed to your deity?";
    }
    else if (this.state.deadCount > 8 && this.state.deadCount <= 11) {
      msg = "but that would probably require a critical...and even then I don't think any spell can bring back anyone from the dead.";
    }
    else if (this.state.deadCount > 11 && this.state.deadCount <= 14) {
      msg = "you must really want " + this.state.character['charName'] + " back.";
    }
    else if (this.state.deadCount > 14 && this.state.deadCount <= 30) {
      msg = "Sorry, but your character is dead...";
    }
    else if (this.state.deadCount > 30) {
      msg = "The Hippo is truly sorry for your loss...all stories must eventually end no matter the length!";
    }

    this.setState({ deadCount : this.state.deadCount + 1, deadMsg : msg, deadAlert : true });
    return;
  },
  handleAlertDismiss : function() {
    this.setState({ deadAlert : false });
  },
  onDeadNewCharacter : function() {
    this.setState({ dead : false, deadCount : 0, deadMsg : "" });
  },
  renderOverlay : function() {
    if (this.state.dead === true) {

      var alert;

      if (this.state.deadAlert) {
        alert = (
          <Alert bsStyle="danger" onDismiss={this.handleAlertDismiss} dismissAfter={3000}>
            <p>{this.state.deadMsg}</p>
          </Alert>
        );
      }
    
      return (
        <Modal title={"And so " + this.state.character['charName'] + "'s future ceased to exist..."} onRequestHide={this.cancelDeadHide}>
          <div className="modal-body">
            {alert}
            <p></p>
          </div>
          <div className="modal-footer">
            <Button bsStyle="success" bsSize={"large"} onClick={this.cancelDeadHide}>Close</Button>
            <Button bsStyle="danger" bsSize={"xsmall"} onClick={this.onDeadNewCharacter}>{"Create new Character"}</Button>
          </div>
        </Modal>
      );
    }

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
  setNav : function(key) {
    if (key === 7) {
      document.body.scrollTop = 0;
    }
    else {
      this.setState({ activeNav : key });  
    }
  },
  editCharacter : function(data) {
    console.log("received from: ", data.path);
    //console.log("         data:");
    //console.log(data.character);

    this.setState({ character : data.character });
    //this.setState({ character : data.character });

    var date = +new Date;
    var out = {};
    out.character = JSON.stringify(data.character.toJS());
    out['last_edited'] = date;
    out['date_created'] = (data.path === "characterCreation") ? date : "for all time";

    // save to firebase
    chardb.child(data.character.get('charName').toLowerCase().replace(" ", "-")).update(out, function(err) {
      if (!err) {
        console.log("save success: ", data.path);
      }
      else {
        console.error(err);
      }
    });

    //if (data.character['charHitPoints']['deathSaves']['failures'] >= 3) {
    //  var dead_date = +new Date;
    //  console.log("CHARACTER DIED!", dead_date);
    //  this.setState({ dead : true });

    //  chardb.child(data.character['charName'].toLowerCase().replace(" ", "-")).update({ "date_of_death" : date });
    //}
  },
  editCharacterStatus : function(data) {
    console.log("received status from: ", data.path);
    console.log("             updated:");
    console.log(data.status);
    console.warn("this function has not yet been fully implemented. Nothing is saved. Does this function need to exist?");
    //this.setState({ status : data.status });

    // save to local storage only? or to firebase as well?
    //localStore.setItem("__character_status", JSON.stringify(this.state.status));
  },
  editPreferences : function(data) {
    console.log("received preferences from: ", data.path);
    console.log("                     data: ");
    console.log(data.preferences);
    this.setState({ preferences : data.preferences });

    var date = +new Date;
    var out = {};
    out.preferences = JSON.stringify(data.preferences);
    out['pref_last_edited'] = date;
    
    // save to database
    chardb.child(this.state.character.get('charName').toLowerCase().replace(" ", "-")).update(out, function(err) {
      if (!err) {
        console.log("preference save success: ", data.path);
      }
      else {
        console.error(err);
      }
    });
  },
  render : function() {
    return (
      <div>
        <Affix threshold={50}>
          <Nav bsStyle="tabs" activeKey={this.state.activeNav} onSelect={this.setNav}>
            <NavItem eventKey={0}><Glyphicon glyph="info-sign" /></NavItem>
            <NavItem eventKey={1}><div className="icon-chart" /></NavItem>
            <NavItem eventKey={2}><div className="icon-shield" /></NavItem>
            <NavItem eventKey={3}><div className="icon-features" /></NavItem>
            <NavItem eventKey={4}><div className="icon-attack" /></NavItem>
            <NavItem eventKey={5}><div className="icon-repo" /></NavItem>
            <NavItem eventKey={6}><div className="icon-equipment" /></NavItem>
            <NavItem eventKey={7}><Glyphicon glyph="arrow-up" /></NavItem>
          </Nav>
        </Affix>
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
            activeNav={this.state.activeNav} setNav={this.setNav}
          />
          <ContentArea 
            character={this.state.character} edit={this.editCharacter} 
            preferences={this.state.preferences} editPreferences={this.editPreferences} 
            activeNav={this.state.activeNav} setNav={this.setNav}
          />
        </div>
      </div>
    );
  }
});


// render Character
React.render(<Character />, document.body);