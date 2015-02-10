//Main requires
var React = require('react');
var Modal = require('react-bootstrap/Modal');
var Input = require('react-bootstrap/Input');
var Button = require('react-bootstrap/Button');
var Alert = require('react-bootstrap/Alert');
var Row = require('react-bootstrap/Row');
var Col = require('react-bootstrap/Col');
var TabbedArea = require('react-bootstrap/TabbedArea');
var TabPane = require('react-bootstrap/TabPane');

//The modal object to export
var LangsModal = React.createClass({

	getInitialState : function () {
		var state = {};

		state.name = "";
		state.desc = "";
		state.mode = 0;
		state.newDesc = "";
		state.newName = "";

		//this holds the mode of the language to edit
		state.edit = -1;

		return (state);
	},

	handleModeChange : function(mode) {
		this.setState({ mode : mode })
	},

	handleChange : function(cmp, e) {
		var node = {};
		node[cmp] = e.target.value;
		this.setState(node);
	},

	handleSelect : function(e) {
		var idx = parseInt(e.target.value, 10);
		var langs = this.props.character['charOtherProficiencies']['languages'][idx];
		var name = (idx === -1) ? "" : langs.name;
		var desc = (idx === -1) ? "" : langs.desc;
		var state = {};

		state.edit = idx;
		state.newName = name;
		state.newDesc = desc;

		this.setState(state);
	},

	handleDelete : function () {
		var tmp = this.props.character;
		var path = "charOtherProficiencies.languages.delete";
		var name = tmp['charOtherProficiencies']['languages'][this.state.edit].name;
		var langs;

		//if mistake, stop deleting!
		if (!confirm("Do you really want to get rid of\n '" + name + "'\n forever?")) return;

		langs = tmp['charOtherProficiencies']['languages'].splice(this.state.edit, 1);
		path += "." + langs.name;

		//save and close
		this.props.edit({ path : path, character : tmp });
		this.props.close();
	},

	handleOk : function () {
		var tmp = this.props.character;
		var path = "charOtherProficiencies.languages";
		var data = {};

		//adding new language
		if (this.state.mode === 0) {

		  //if the name isn't given, don't add
		  if (this.state.name === "") return;

		  data.name = this.state.name;
		  data.desc = this.state.desc;

		  tmp['charOtherProficiencies']['languages'].push(data);
		  path += ".add." + data.name;
	    }
	    
	    //edit existing language
	    else if (this.state.mode === 1) {

	    	//if nothing is selected, don't change
	    	if (this.state.edit === -1) return;

	    	// make the changes
	    	tmp['charOtherProficiencies']['languages'][this.state.edit].name = this.state.newName;
	    	tmp['charOtherProficiencies']['languages'][this.state.edit].desc = this.state.newDesc;

	    	// log the changes made
	    	path += ".edit." + tmp['charOtherProficiencies']['languages'][this.state.edit].name;
	    } 

	    // save and close
	    this.props.edit({ path : path, character : tmp });
	    this.props.close();
	},

	render : function () {

		// populate the select box
		var languages = [];
		this.props.character['charOtherProficiencies']['languages'].forEach(function(langs, i) {
		  languages.push(
			  <option key={i} value={i}>{langs.name}</option>
			);
		});

        return (
        	<Modal onRequestHide={this.props.close}>
        	  <div className="modal-body">
        	    <TabbedArea activeKey={this.state.mode} onSelect={this.handleModeChange}>

        	      <TabPane eventKey={0} tab="new">
        	        <div className="container-fluid">
        	          <h3>{"Add New Language"}</h3>
        	            <p>{"Enter the name of the language (ex: Draconic) and an optional sort description."}</p>
        	            <Input placeholder="name" value={this.state.name} type="text" label="Language Name" onChange={this.handleChange.bind(this, "name")} />
        	            <Input placeholder="short description" value={this.state.desc} type="textarea" label="Language Description" onChange={this.handleChange.bind(this, "desc")}/>
        	        </div>
        	      </TabPane>

        	      <TabPane eventKey={1} tab="edit">
        	        <div className="container-fluid">
        	          <h3>{"Edit Languages"}</h3>
        	          <p>{"Change the name or description of a language by first selecting the language to edit and then entering new values."}</p>
        	          <Input>
        	            <Row>
        	              <Col xs={8}>
        	                <Input type="select" onChange={this.handleSelect} defaultSelected={-1}>
        	                  <option value={-1}>{"Select a Language"}</option>
        	                  {languages}
        	                </Input>
        	              </Col>
        	              <Col xs={4}>
        	                <Button disabled={(this.state.edit === -1) ? true : false} bsStyle="danger" onClick={this.handleDelete}>Delete</Button>
        	              </Col>
        	            </Row>
        	          </Input>
        	          <Input disabled={(this.state.edit === -1) ? true : false} type="text" onChange={this.handleChange.bind(this, "newName")} placeholder={"langs name"} value={this.state.newName} label={"New Language Name"}/> 
        	          <Input disabled={(this.state.edit === -1) ? true : false} type="textarea" onChange={this.handleChange.bind(this, "newDesc")} placeholder={"langs desc"} value={this.state.newDesc} label={"New Language Description"}/>
        	        </div>
        	      </TabPane>
        	    </TabbedArea>
        	  </div>
        	  <div className="modal-footer">
                <Button bsStyle="danger" onClick={this.props.close}>Close</Button>
        	    <Button bsStyle="success" onClick={this.handleOk}>Save</Button>
        	  </div>
        	</Modal>
        );
	} 
})

// export
module.exports = LangsModal;