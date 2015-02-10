
var React = require('react');
var Modal = require('react-bootstrap/Modal');
var Input = require('react-bootstrap/Input');
var Button = require('react-bootstrap/Button');
var Row = require('react-bootstrap/Row');
var Col = require('react-bootstrap/Col');

var TraitModal = React.createClass({

	getInitialState : function () {
		var state = {};
        var copyPers = this.props.character['charTraits']['personalityTraits'];
        var copyIdeals = this.props.character['charTraits']['ideals'];
        var copyBonds = this.props.character['charTraits']['bonds'];
        var copyFlaws = this.props.character['charTraits']['flaws'];

		state.personalityTraits = copyPers;
		state.ideals = copyIdeals;
		state.bonds = copyBonds;
		state.flaws = copyFlaws;

		return (state);
	},
	handleChange : function(cmp, e) {
		var node = {};
		node[cmp] = e.target.value;
		this.setState(node);
		console.log(cmp, "with value:", e.target.value);
	},
	handleOk : function () {
		var tmp = this.props.character;
		var path = "charTraits";

		if (this.state.personalityTraits !== "") {
			tmp['charTraits']['personalityTraits'] = this.state.personalityTraits;
			path += ".personalityTraits." + this.state.personalityTraits;
		} 

		if (this.state.ideals !== "") {
			tmp['charTraits']['ideals'] = this.state.ideals;
			path += ".ideals." + this.state.ideals;
		}

		if (this.state.bonds !== "") {
			tmp['charTraits']['bonds'] = this.state.bonds;
			path += ".bonds." + this.state.bonds;
		}

		if (this.state.flaws !== "") {
			tmp['charTraits']['flaws'] = this.state.flaws;
			path += ".flaws." + this.state.flaws;
		}

		this.props.edit({ path : path, character : tmp});

		this.props.close(); 
    },

    render : function () {
    	return (
    		<Modal onRequestHide={this.props.close} title="Edit Traits">
    		  <div className="modal-body">
    		    <p>{"Enter new info for any Character Traits. If a field is left blank and no new values are entered, nothing will be changed"}</p>
    		      <Row>
    		        <Col xs={6}>
    		          <Input type="textarea" onChange={this.handleChange.bind(this, "personalityTraits")} label="Personality Traits" placeholder={this.props.character['charTraits']['personalityTraits']} value={this.state.personalityTraits} />
    		        </Col>
    		        <Col xs={6}>
    		          <Input type="textarea" onChange={this.handleChange.bind(this, "ideals")} label="Ideals" placeholder={this.props.character['charTraits']['ideals']} value={this.state.ideals} />
    		        </Col>
    		      </Row>
    		      <Row>
    		        <Col xs={6}>
    		          <Input type="textarea" onChange={this.handleChange.bind(this, "bonds")} label="Bonds" placeholder={this.props.character['charTraits']['bonds']} value={this.state.bonds} />
    		        </Col>
    		        <Col xs={6}>
    		          <Input type="textarea" onChange={this.handleChange.bind(this, "flaws")} label="Flaws" placeholder={this.props.character['charTraits']['flaws']} value={this.state.flaws} />
    		        </Col>
    		      </Row>
    		  </div>
    		  <div className="modal-footer">
    		    <Button bsStyle="danger" onClick={this.props.close}>Close</Button>
    		    <Button bsStyle="success" onClick={this.handleOk}>Save</Button>
    		  </div>
    		</Modal>
     	);
    }
})

module.exports = TraitModal;