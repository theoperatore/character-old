var React = require('react');
var SettingsEquip = require('../settings/settings-equipment');
var HatchGroup = require('../hatch/HatchGroup');
var Hatch = require('../hatch/Hatch');
var Panel3d = require('../hatch/Panel3d');

var Glyphicon = require('react-bootstrap/lib/Glyphicon');
var Accordion = require('react-bootstrap/lib/Accordion');
var Panel = require('react-bootstrap/lib/Panel');
var Input = require('react-bootstrap/lib/Input');
var Button = require('react-bootstrap/lib/Button');
var Grid = require('react-bootstrap/lib/Grid');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');

var Equipment = React.createClass({
  displayName : "CharEquipment",
  toggle : function(cmp, idx, dir) {
    this.refs[cmp].toggle(idx,dir);
  },
  render : function() {
    var equips = [];
    this.props.character.getIn(['charEquipment', 'otherEquipment']).forEach(function(equip, i) {
      equips.push(
        <Panel3d title={equip.get('name')} key={"equipItem" + i} className="list-header">
          <p>{equip.get('desc')}</p>
        </Panel3d>
      );
    }.bind(this));

    return (
      <HatchGroup ref="settings">
        <div className="hatch-cover">
          <h3>{"Equipment"} <Button className="no-border" onClick={this.toggle.bind(this, "settings", "equipment0")}><Glyphicon glyph="cog"/></Button></h3>
        </div>
        <Hatch eventKey="equipment0">
          <SettingsEquip character={this.props.character} edit={this.props.edit} />
        </Hatch>
        <div className="hatch-cover">
          <Panel bsStyle="warning" header="Money">
            <Grid fluid className="text-center">
              <Row>
                <Col xs={2}><p>cp</p></Col>
                <Col xs={2}><p>sp</p></Col>
                <Col xs={4}><p>ep</p></Col>
                <Col xs={2}><p>gp</p></Col>
                <Col xs={2}><p>pp</p></Col>
              </Row>
              <Row>
                <Col xs={2}><p>{this.props.character.getIn(['charEquipment', 'money', 'cp'])}</p></Col>
                <Col xs={2}><p>{this.props.character.getIn(['charEquipment', 'money', 'sp'])}</p></Col>
                <Col xs={4}><p>{this.props.character.getIn(['charEquipment', 'money', 'ep'])}</p></Col>
                <Col xs={2}><p>{this.props.character.getIn(['charEquipment', 'money', 'gp'])}</p></Col>
                <Col xs={2}><p>{this.props.character.getIn(['charEquipment', 'money', 'pp'])}</p></Col>
              </Row>
            </Grid>
          </Panel>
          {equips}
        </div>
      </HatchGroup>
    );
  }
})

module.exports = Equipment;