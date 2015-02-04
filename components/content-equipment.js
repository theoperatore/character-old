var React = require('react');
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
  render : function() {

    var equips = [];
    this.props.character['charEquipment']['otherEquipment'].forEach(function(equip, i) {
      equips.push(
        <Panel eventKey={i} key={i} header={equip.name}>
            <p>{equip.desc}</p>
        </Panel>
      );
    });

    return (
      <div className="container-fluid">
        <h3>{"Equipment"} <Button className="no-border"><Glyphicon glyph="cog"/></Button></h3>
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
        <Accordion defaultActiveKey="">
          {equips}
        </Accordion>

      </div>
    );
  }
})

module.exports = Equipment;