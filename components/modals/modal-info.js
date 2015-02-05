// Main requires
var React = require('react');
var Modal = require('react-bootstrap/Modal');
var Input = require('react-bootstrap/Input');
var Button = require('react-bootstrap/Button');
var Alert = require('react-bootstrap/Alert');
var Row = require('react-bootstrap/Row');
var Col = require('react-bootstrap/Col');

// The modal object to export
var InfoModal = React.createClass({

  /////////////////////////////////////////////////////////////////////////////
  //
  // the initial state of every modal should hold values that are going to
  // change as a result of human interaction.
  // 
  // this modal deals with character info, so starting state should include
  // class, level, xp, background, race, and alignment.
  //
  // since we want to keep level and class values stored as integers and not
  // strings, we also create state values for alerting if we cannot parse
  // any input from the user for those inputs.
  //
  /////////////////////////////////////////////////////////////////////////////
  getInitialState : function() {
    var state = {};

    state.cls = "";
    state.lvl = "";
    state.xp = "";
    state.bg  = "";
    state.race = "";
    state.align = "";
    state.alert = false;
    state.alertMsg = "";
    state.alertType = "";

    return (state);
  },

  /////////////////////////////////////////////////////////////////////////////
  //
  // This function gets called anytime a user types a button into one of the 
  // inputs in this modal.
  //
  // the parameter `cmp` holds the value from the corresponding .bind() call
  // declared with the <Input> element.
  //
  // ex: If a user types one letter `a` into the `Class` <Input>, `cmp` would
  // equals 'cls' because we called this.handleChange.bind(this, 'cls')
  //
  // parameter `e` is a reference to the DOM node of the input element.
  // to get the value the user typed in, `e.target.value` is used.
  //
  // Lastly, this function sets the state defined above for each Input to get
  // ready to save the new inputs
  //
  /////////////////////////////////////////////////////////////////////////////
  handleChange : function(cmp, e) {
    var node = {};
    node[cmp] = e.target.value;
    this.setState(node);
  },

  /////////////////////////////////////////////////////////////////////////////
  //
  // The function to be run when the `Save` button is clicked. 
  //
  // This function should check the value of each state value to save, to make
  // sure the inputs make sense. This is where we try to parse the values of 
  // level and xp as integers. If they cannot be parsed as decimal integers,
  // we set the state of the alert flag to true and stop the saving function
  // in order for the user to correct their mistake.
  //
  // To do the actual saving, we need to manipulate the props object
  // `character`. However, don't use this.props.character directly. First get a
  // cached copy, like I do with tmp. Then perform operations on tmp.
  //
  // this.props.character refers back to the character object, or the skeleton
  // of the app. Wan.js is what is used for testing.
  //
  // after manipulating the relevant data, pass tmp and a `path` or message
  // variable to the props function `edit` as one object via this.props.edit()
  //
  // ex: I have edited tmp the way I want to, and I want to remember that I 
  // edited tmp in `charInfo`, so I called the edit function:
  //    
  //    var data = {};
  //    
  //    data.path = "charInfo";
  //    data.character = tmp;
  //
  //    this.props.edit(data);
  //
  // this will put into effect any changes to the character model that may have
  // changed.
  //
  // once you save, close the modal by calling the props function `close`:
  //
  //    this.props.close();
  //
  /////////////////////////////////////////////////////////////////////////////
  handleOk : function() {

    // reference the props and create the path variable
    var tmp = this.props.character;
    var path = "charInfo";

    // update the character if there is input for class
    if (this.state.cls !== "") { 
      tmp['charInfo']['class'] = this.state.cls;
      path += ".class." + this.state.cls;
    }

    // first parse the lvl in state, if not valid integer, show and alert and
    // stop saving.
    // otherwise, update the character and continue
    if (this.state.lvl !== "") {
      var lvl = parseInt(this.state.lvl,10);

      if (isNaN(lvl)) {
        this.setState({ 
          alert : true,
          alertMsg : "Yo! Enter a number for your level! Any number will do, just so that it's a valid decimal number.",
          alertType : "lvl"
        });
        return;
      }
      
      tmp['charInfo']['level'] = lvl; 
      path += ".level." + this.state.lvl;
    }

    // same as above, first parse for integer, and handle incorrect types
    // if everything is good, then update the character and continue
    if (this.state.xp !== "") { 
      var xp = parseInt(this.state.xp,10);

      if (isNaN(xp)) {
        this.setState({ 
          alert : true,
          alertMsg : "Yo! Enter a number for your XP! Any number will do, just so that it's a valid decimal number.",
          alertType : "xp"
        });
        return;
      }
      // test for NaN first
      tmp['charInfo']['xp'] = xp; 
      path += ".xp." + this.state.xp;
    }

    // handle updating character background
    if (this.state.bg !== "") { 
      tmp['charInfo']['background'] = this.state.bg; 
      path += ".background." + this.state.bg;
    }

    // handle updating character race
    if (this.state.race !== "") { 
      tmp['charInfo']['race'] = this.state.race; 
      path += ".race." + this.state.race;
    }

    // handle updating character alignment
    if (this.state.align !== "") { 
      tmp['charInfo']['alignment'] = this.state.align; 
      path += ".alignment." + this.state.align;
    }
    

    // save the changes (if any) to the character skeleton
    this.props.edit({ path : path, character : tmp });

    // close this modal
    this.props.close();
  },

  /////////////////////////////////////////////////////////////////////////////
  //
  // This function is called when a user closes the Alert that pops up if an
  // input for level or xp cannot be parsed as an integer.
  //
  // this function sets the state of `alert` to false so the alert will no
  // longer be displaed, and sets the alertMsg to an empty string as a 
  // convenience.
  //
  /////////////////////////////////////////////////////////////////////////////
  handleAlert : function() {
    this.setState({ alert : false, alertMsg : "" });
  },

  /////////////////////////////////////////////////////////////////////////////
  //
  // This is the function that handles displaying EVERYTHING for the modal.
  //
  // This function must return exactly ONE root element (it's a requirement).
  //
  // It is here you define the layout of the modal and attach any event
  // listeners to the function you made above.
  //
  /////////////////////////////////////////////////////////////////////////////
  render : function() {
    var alert;
    var validationLvl;
    var validationXp;

    // if an alert is shown becasue of xp, display a red outline around the
    // xp input to tell the user the value is still wrong
    if (this.state.alertType === "xp") {
      validationXp = "error";
    }

    // if an alert is shown becasue of lvl, display a red outline around the
    // level input to tell the user the value is still wrong
    if (this.state.alertType === "lvl") {
      validationLvl = "error";
    }

    // if alert state is true, show the alert
    if (this.state.alert) {
      alert = (
        <Alert bsStyle="danger" onDismiss={this.handleAlert}>
          <h4>{"Critical Failure!"}</h4>
          <p>{this.state.alertMsg}</p>
        </Alert>
      );
    }

    // if alert state variable is false, don't show the alert
    else {
      alert = <span />;
    }

    // return the main modal ouline. This is a style of Javascript called JSX.
    // this must get compiled to normal javascript before it can be run correctly
    // in any browser.
    // 
    // if you run `npm run dev` on the command line, the compile step will be taken 
    // care of for you.
    //
    // For the most part, you can use normal HTML syntax
    // However, if you want to insert javascript into anything you must enclose the
    // javascript in {}.
    // One more caveat is that in order to give an element a CSS Class, use
    // className instead of just class. see the elements below for an example.
    return (
      <Modal onRequestHide={this.props.close} title="Edit Info">
        <div className="modal-body">
          <p>{"Enter a new value for any Character Info. If a field is left blank and no new values are entered, nothing will be changed."}</p>
          {alert}
          <Input>
            <Row>
              <Col xs={6}>
                <Input type="text" onChange={this.handleChange.bind(this, "cls")} label="Class" placeholder={this.props.character['charInfo']['class']} value={this.state.cls} />
              </Col>
              <Col xs={6}>
                <Input type="text" onChange={this.handleChange.bind(this, "race")} label="Race" placeholder={this.props.character['charInfo']['race']} value={this.state.race} />
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <Input type="text" bsStyle={validationLvl} onChange={this.handleChange.bind(this, "lvl")} label="Level" placeholder={this.props.character['charInfo']['level']} value={this.state.lvl} />
              </Col>
              <Col xs={6}>
                <Input type="text" bsStyle={validationXp} onChange={this.handleChange.bind(this, "xp")} label="Xp" placeholder={this.props.character['charInfo']['xp']} value={this.state.xp} />
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <Input type="text" onChange={this.handleChange.bind(this, "bg")} label="Background" placeholder={this.props.character['charInfo']['background']} value={this.state.bg} />
              </Col>
              <Col xs={6}>
                <Input type="text" onChange={this.handleChange.bind(this, "align")} label="Alignment" placeholder={this.props.character['charInfo']['alignment']} value={this.state.align} />
              </Col>
            </Row>
          </Input>
        </div>
        <div className="modal-footer">
          <Button bsStyle="danger"  onClick={this.props.close}>Close</Button>
          <Button bsStyle="success" onClick={this.handleOk}>Save</Button>
        </div>
      </Modal>
    );
  }
})

// Export our InfoModal we just created when required
module.exports = InfoModal;