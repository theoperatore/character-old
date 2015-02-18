var React = require('react');
var SettingsEquip = require('../settings/settings-equipment');
var HatchGroup = require('../hatch/HatchGroup');
var Hatch = require('../hatch/Hatch');
var Panel3d = require('../hatch/Panel3d');

var Glyphicon = require('react-bootstrap/Glyphicon');
var Accordion = require('react-bootstrap/Accordion');
var Panel = require('react-bootstrap/Panel');
var Input = require('react-bootstrap/Input');
var Button = require('react-bootstrap/Button');
var Grid = require('react-bootstrap/Grid');
var Row = require('react-bootstrap/Row');
var Col = require('react-bootstrap/Col');

var Equipment = React.createClass({
  displayName : "CharEquipment",
  toggle : function(cmp, idx, dir) {
    this.refs[cmp].toggle(idx,dir);
  },
  render : function() {

    var equips = [];
    this.props.character['charEquipment']['otherEquipment'].forEach(function(equip, i) {
      equips.push(
        <Panel3d title={equip.name} key={"equipItem" + i} className="list-header">
          {equip.desc}
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
                <Col xs={2}><p>{this.props.character['charEquipment']['money']['cp']}</p></Col>
                <Col xs={2}><p>{this.props.character['charEquipment']['money']['sp']}</p></Col>
                <Col xs={4}><p>{this.props.character['charEquipment']['money']['ep']}</p></Col>
                <Col xs={2}><p>{this.props.character['charEquipment']['money']['gp']}</p></Col>
                <Col xs={2}><p>{this.props.character['charEquipment']['money']['pp']}</p></Col>
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