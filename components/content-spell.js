var React = require('react');
var Glyphicon = require('react-bootstrap/Glyphicon');
var Accordion = require('react-bootstrap/Accordion');
var Panel = require('react-bootstrap/Panel');
var Input = require('react-bootstrap/Input');
var Grid = require('react-bootstrap/Grid');
var Row = require('react-bootstrap/Row');
var Col = require('react-bootstrap/Col');
var OverlayTrigger = require('react-bootstrap/OverlayTrigger');
var OverlayMixin = require('react-bootstrap/OverlayMixin');
var Popover = require('react-bootstrap/Popover');
var Modal = require('react-bootstrap/Modal');
var Button = require('react-bootstrap/Button');

var Spells = React.createClass({
  displayName : "CharSpell",
  render : function() {
    return (
      <div className="container-fluid">
        <h3>{"Spells"}</h3>
        <Panel>
          <p className="text-center">{"Spell DC"}</p>
          <OverlayTrigger trigger="click" placement="bottom" overlay={
            <Popover title="Spell Save DC Config">
              <div>
                <Input type="select" label='Ability Mod' defaultValue="str">
                  <option value="str">str</option>
                  <option value="dex">dex</option>
                  <option value="con">con</option>
                  <option value="int">int</option>
                  <option value="wis">wis</option>
                  <option value="cha">cha</option>
                </Input>
              </div>
            </Popover>
          }>
            <h3 className="bonus text-center">{8}</h3>  
          </OverlayTrigger>
        </Panel>
        
        <Accordion defaultActiveKey="">
          <Panel header="1st Level" eventKey={1}>
            <div className="slots">
              <p>Spell Slots</p>
              <Grid fluid>
                <Row>
                  <Col xs={1}><input type="checkbox" /></Col>
                  <Col xs={1}><input type="checkbox" /></Col>
                  <Col xs={1}><input type="checkbox" /></Col>
                  <Col xs={1}><input type="checkbox" /></Col>
                  <Col xs={1}><input type="checkbox" /></Col>
                  <Col xs={1}><input type="checkbox" /></Col>
                  <Col xs={1}><input type="checkbox" /></Col>
                  <Col xs={1}><input type="checkbox" /></Col>
                  <Col xs={1}><input type="checkbox" /></Col>
                  <Col xs={1}><input type="checkbox" /></Col>
                  <Col xs={1}><input type="checkbox" /></Col>
                  <Col xs={1}><input type="checkbox" /></Col>
                  <Col xs={1}><input type="checkbox" /></Col>
                  <Col xs={1}><input type="checkbox" /></Col>
                  <Col xs={1}><input type="checkbox" /></Col>
                  <Col xs={1}><input type="checkbox" /></Col>
                  <Col xs={1}><input type="checkbox" /></Col>
                  <Col xs={1}><input type="checkbox" /></Col>
                  <Col xs={1}><input type="checkbox" /></Col>
                  <Col xs={1}><input type="checkbox" /></Col>
                </Row>
              </Grid>
            </div>
            <Accordion defaultActiveKey="">
              <Panel eventKey={1} header="Ki Punching!">
                <p>I punch you. Hard. In the mouth. 1d6 damage...to your pride</p>
              </Panel>
              <Panel eventKey={2} header="Taunt">
                <p>{"I tell you that you'll never be as good as some other people...you cry."}</p>
              </Panel>
              <Panel eventKey={3} header="Long">
                <p>{"Placeholder to simulate a lot of spells..."}</p>
              </Panel>
              <Panel eventKey={4} header="Long">
                <p>{"Placeholder to simulate a lot of spells..."}</p>
              </Panel>
              <Panel eventKey={5} header="Long">
                <p>{"Placeholder to simulate a lot of spells..."}</p>
              </Panel>
              <Panel eventKey={6} header="Long">
                <p>{"Placeholder to simulate a lot of spells..."}</p>
              </Panel>
              <Panel eventKey={7} header="Long">
                <p>{"Placeholder to simulate a lot of spells..."}</p>
              </Panel>
              <Panel eventKey={8} header="Long">
                <p>{"Placeholder to simulate a lot of spells..."}</p>
              </Panel>
              <Panel eventKey={9} header="Long">
                <p>{"Placeholder to simulate a lot of spells..."}</p>
              </Panel>
              <Panel eventKey={10} header="Long">
                <p>{"Placeholder to simulate a lot of spells..."}</p>
              </Panel>
              <Panel eventKey={11} header="Long">
                <p>{"Placeholder to simulate a lot of spells..."}</p>
              </Panel>
              <Panel eventKey={12} header="Long">
                <p>{"Placeholder to simulate a lot of spells..."}</p>
              </Panel>
            </Accordion>
          </Panel>
          <Panel header="2nd Level" eventKey={2}>
            <div className="slots">
              <p>Spell Slots</p>
              <Grid fluid>
                <Row>
                  <Col xs={1}><input type="checkbox" /></Col>
                  <Col xs={1}><input type="checkbox" /></Col>
                  <Col xs={1}><input type="checkbox" /></Col>
                </Row>
              </Grid>
            </div>
            <Accordion defaultActiveKey="">
              <Panel eventKey={1} header="Ki Punching AGAIN!">
                <p>More punching. With Force. In the mouth.</p>
              </Panel>
              <Panel eventKey={2} header="Jumping">
                <p>{"It's a spell that lets me jump really high. It's cool."}</p>
              </Panel>
            </Accordion>
          </Panel>
        </Accordion>

      </div>
    );
  }
})

module.exports = Spells;