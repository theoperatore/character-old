// main requires
var React = require('react');
var Firebase = require('firebase');
var Immutable = require('immutable');
var Page = require('page');
var blank = require('./data/blank');
var chardb = new Firebase("https://character-db.firebaseio.com/characters");
var userdb = new Firebase("https://character-db.firebaseio.com/users");
var profdb = new Firebase("https://character-db.firebaseio.com/profiles");
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

// initial character app preferences
var initPrefs;

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

// main out
var Character = React.createClass({
  displayName : "Character",
  mixins : [OverlayMixin],
  getInitialState : function() {
    var state = {};

    // character state
    state.auth = false;
    state.character = new Immutable.fromJS(blank);
    state.preferences = new Immutable.fromJS(prefs);
    state.ownedBy = "";
    state.charKey = "";

    // nav state
    state.activeNav = 3;
    state.needsName = false;

    // new character / dead state
    state.name = "";
    state.dead = false;
    state.deadCount = 0;
    state.deadMsg = "";
    state.deadAlert = false;
    
    return (state);
  },
  handleAuth : function(auth) {
    if (auth) {
      this.setState({ auth : true });
    }
    else {
      this.setState({ auth : false, ownedBy : "", charKey : "" });
    }
  },
  componentWillUnmount: function () {
    chardb.offAuth(this.handleAuth);
  },
  handleCharacter : function(snapshot) {
    var characterRaw = snapshot.val();
    var state = {};
    var character;
    var preferences;

    // this is the character object to load! set state!
    if (characterRaw) {
      
      character = JSON.parse(characterRaw['data']);
      preferences = (characterRaw['preferences']) ? JSON.parse(characterRaw['preferences']) : prefs;

      // do the quick fix nonsense
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
      if (character['charClassCharges'][0] && character['charClassCharges'][0]['display'] === undefined) {
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
      state.character = this.state.character.mergeDeep(character);
      state.preferences = this.state.preferences.mergeDeep(preferences);
      state.ownedBy = characterRaw['owned_by'];

      this.setState(state);
    }
    else {
      console.log("bailing out: character -- using default");
      blank['charName'] = "Tap Me!";
      character = this.state.character.mergeDeep(blank);
      document.title = "New Character";
      this.setState({ character : character });
    }
  },
  handleUser : function(snapshot) {
    var charid = snapshot.val();

    if (charid) {
      this.setState({ charKey : charid });
      chardb.child(charid).once('value', this.handleCharacter);
    }
    else {
      console.log("bailing out: user");
      blank['charName'] = "Tap Me!";
      var character = this.state.character.mergeDeep(blank);
      document.title = "New Character";
      this.setState({ character : character });
    }
  },
  handleProfile : function(snapshot) {
    var uid = snapshot.val();

    if (uid) {
      userdb.child(uid).child("characters").child(this.props.characterId).once('value', this.handleUser);
    }
    else {
      console.log('bailing out: profile');
      blank['charName'] = "Tap Me!";
      var character = this.state.character.mergeDeep(blank);
      document.title = "New Character";
      this.setState({ character : character });
    }
  },
  loadCharacter : function(propsName) {
    var id = this.props.characterId || propsName || "blank";
    var state = {};

    console.log("trying to load character...", id);

    // set up auth state listening.
    chardb.offAuth(this.handleAuth);
    chardb.onAuth(this.handleAuth);

    if (id === "new") {
      this.setState({ needsName : true });
      return;
    }

    // if we're given a full url to a resource, try to load it.
    if (this.props.profile && this.props.characterId) {
      profdb.child(this.props.profile).once('value', this.handleProfile);
    }
    else {

      console.log("not set:", this.props.profile, this.props.characterId);

      blank['charName'] = "Tap Me!";
      state.character = this.state.character.mergeDeep(blank);
      state.preferences = new Immutable.fromJS(prefs);
      state.ownedBy = "";
      state.charKey = "";

      document.title = "New Character";
      this.setState(state);
    }
  },
  componentWillMount: function () {
    this.loadCharacter();
  },
  componentWillReceiveProps: function (nextProps) {
    if (nextProps.characterId !== this.props.characterId) {
      console.log("new props!", nextProps.characterId);

      // prolly an ANTI-PATTERN!
      this.loadCharacter(nextProps.characterId);
    }
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
    window.character = this.state.character.toJS();
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

    // if authenticated, save this character to the current user's character
    // list and add to character document
    var auth = chardb.getAuth();
    var date = +new Date;
    if (auth) {
      var dbchar = {};
      var charName = this.state.name.toLowerCase().replace(" ", "-");
      var charid = chardb.push().key();

      dbchar['data'] = JSON.stringify(newChar);
      dbchar['preferences'] = JSON.stringify(prefs);
      dbchar['created_by'] = auth.uid;
      dbchar['owned_by'] = auth.uid;
      dbchar['created_date'] = date;
      dbchar['edit_date'] = date;
      dbchar['edit_by'] = auth.uid;

      // possible race condition?
      this.setState({ ownedBy : auth.uid, charKey : charid });

      // PROBLEM: If userdb completes, but chardb encounters an error, whole thing should error
      //          Both should be successful, or fail. together. There should never be an 
      //          instance of one succeeding and the other failing.
      userdb.child(auth.uid).child('characters').child(charName).set(charid, function(err) {
        if (err) {
          console.error(err);
        }
        else {
          console.log("USER SUCCESS!");
        }
      });

      chardb.child(charid).set(dbchar, function(err) {
        if (err) {
          console.error(err);
        }
        else {
          console.log("CHARACTER SUCCESS!");
        }
      });

      userdb.child(auth.uid).child('profile_name').once('value', function(snap) {
        if (snap.val()) {
          document.location.hash =  "#!/character/"+ snap.val() + "/" + charName;

          // save new char!
          this.editCharacter({ path : "characterCreation", character : new Immutable.fromJS(newChar) });
        }
      }.bind(this))

          
    }
    else {
      // send to login page with characterId and character name
      Page('/login/' + this.state.name.toLowerCase().replace(" ", "-"));
    }
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
      msg = "you must really want " + this.state.character.get('charName') + " back.";
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
      <Modal title="Set Character Name" onRequestHide={this.toggleNameModal}>
        <div className="modal-body">
          <Alert bsStyle="warning" className={(this.state.auth) ? "hide" : ""}>
            <h4>{"Looks like you're not logged in yet!"}</h4>
            <p>{"Nothing to worry about, enter a character name and you'll be taken to the login page."}</p>
          </Alert>
          <p><strong>{"Give your new character a name!"}</strong></p>
          <Input type="text" placeholder="any name at all..." bsSize="large" value={this.state.name} onChange={this.handleChange}/>
        </div>
        <div className="modal-footer">
          <Button bsStyle="success" bsSize={"large"} onClick={this.handleNewCharacter}>{"Enter the World"}</Button>
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
    var auth = chardb.getAuth();
    var dbchar = {};

    //console.log("         data:");
    //console.log(data.character);

    // check authenticated first
    if (auth) {

      // see if authorized to edit
      if (auth.uid === this.state.ownedBy) {
        console.log("received from: ", data.path);

        dbchar['data'] = JSON.stringify(data.character.toJS());
        dbchar['edit_date'] = +new Date;
        dbchar['edit_by'] = this.state.ownedBy;

        chardb.child(this.state.charKey).update(dbchar, function(err) {
          if (err) {
            console.error(err);
          }
          else {
            console.log("SAVE SUCCESS");
          }
        })

        this.setState({ character : data.character });
      }

      // not authorized to edit!
      else {
        alert("You are not authorized to edit this character!");
        console.warn("You are not authorized to edit this character!");
      }
    }

    // no authenticated! login first
    else {
      console.warn("You must be logged in to edit any character!");
      alert("You have to login first to edit this character!");
      Page('/login/' + this.state.character.get('charName').toLowerCase().replace(" ", "-")); 
    }

    //if (data.character.getIn(['charHitPoints', 'deathSaves', 'failures']) >= 3) {
    //  var dead_date = +new Date;
    //  console.log("CHARACTER DIED!", dead_date);
    //  this.setState({ dead : true });
    //  chardb.child(data.character.get('charName').toLowerCase().replace(" ", "-")).update({ "date_of_death" : date });
    //}
  },
  editPreferences : function(data) {
    var auth = chardb.getAuth();
    var dbchar = {};

    console.log("received preferences from: ", data.path);
    //console.log("                     data: ");
    //console.log(data.preferences);
    //this.setState({ preferences : data.preferences });

    // check authenticated first
    if (auth) {

      // see if authorized to edit
      if (auth.uid === this.state.ownedBy) {
        console.log("received from: ", data.path);

        dbchar['preferences'] = JSON.stringify(data.preferences.toJS());
        dbchar['edit_date'] = +new Date;
        dbchar['edit_by'] = this.state.ownedBy;

        chardb.child(this.state.charKey).update(dbchar, function(err) {
          if (err) {
            console.error(err);
          }
          else {
            console.log("SAVE SUCCESS");
          }
        })

        this.setState({ preferences : data.preferences });
      }

      // not authorized to edit!
      else {
        alert("You are not authorized to edit this character!");
        console.warn("You are not authorized to edit this character!");
      }
    }

    // no authenticated! login first
    else {
      console.warn("You must be logged in to edit any character!");
      alert("You have to login first to edit this character!");
      Page('/login/' + this.state.character.get('charName').toLowerCase().replace(" ", "-")); 
    }
  },
  render : function() {
    return (
      <div>
        <Affix threshold={50}>
          <Nav bsStyle="tabs" activeKey={this.state.activeNav} onSelect={this.setNav}>
            <NavItem eventKey={0}><Glyphicon glyph="info-sign" /></NavItem>
            <NavItem eventKey={1}><div className="icon-features" /></NavItem>
            <NavItem eventKey={2}><div className="icon-chart" /></NavItem>
            <NavItem eventKey={3}><div className="icon-shield" /></NavItem>
            <NavItem eventKey={4}><div className="icon-attack" /></NavItem>
            <NavItem eventKey={5}><div className="icon-repo" /></NavItem>
            <NavItem eventKey={6}><div className="icon-equipment" /></NavItem>
            <NavItem eventKey={7}><Glyphicon glyph="arrow-up" /></NavItem>
          </Nav>
        </Affix>
        <div className="snap-drawers">
          <div className="snap-drawer snap-drawer-left inverse">
            <AppSettings handleNewCharacter={this.createNewCharacter} profile={this.props.profile} toggle={this.toggleAppSettings}/>
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

module.exports = Character;