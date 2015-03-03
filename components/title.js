var React = require('react');
var PageHeader = require('react-bootstrap/lib/PageHeader');
var Nav = require('react-bootstrap/lib/Nav');
var NavItem = require('react-bootstrap/lib/NavItem');
var Glyphicon = require('react-bootstrap/lib/Glyphicon');

var Title = React.createClass({
  displayName : "Title",
  handleSelect : function(key) {
    // call props to pass to swiper
    this.props.setNav(key);
  },
  render : function() {
    return (
      <div className="container-fluid">
        <h2 onClick={this.props.toggleAppSettings}>{this.props.character.get('charName')}</h2>
        <Nav className="title-menu" bsStyle="tabs" activeKey={this.props.activeNav || 0} onSelect={this.handleSelect}>
          <NavItem eventKey={0}><Glyphicon glyph="info-sign" /></NavItem>
          <NavItem eventKey={1}><div className="icon-features" /></NavItem>
          <NavItem eventKey={2}><div className="icon-chart" /></NavItem>
          <NavItem eventKey={3}><div className="icon-shield" /></NavItem>
          <NavItem eventKey={4}><div className="icon-attack" /></NavItem>
          <NavItem eventKey={5}><div className="icon-repo" /></NavItem>
          <NavItem eventKey={6}><div className="icon-equipment" /></NavItem>
        </Nav>
      </div>
    );
  }
})

// return component
module.exports = Title;