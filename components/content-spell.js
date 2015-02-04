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

var TabbedArea = require('react-bootstrap/TabbedArea');
var TabPane = require('react-bootstrap/TabPane');
var DropdownButton = require('react-bootstrap/DropdownButton');
var MenuItem = require('react-bootstrap/MenuItem');
var ButtonGroup = require('react-bootstrap/ButtonGroup');


var Spells = React.createClass({
  displayName : "CharSpell",
  getInitialState : function() {
    return ({
      spellLevel : 0
    });
  },
  handleLevelChange : function(key) {
    this.setState({ spellLevel : key });
  },
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
        
        <ButtonGroup className="spell-selector" justified>
            <DropdownButton title={"Spell Level"} onSelect={this.handleLevelChange}>
              <MenuItem eventKey={0}>{"Cantrips"}</MenuItem>
              <MenuItem eventKey={1}>{"1st Level"}</MenuItem>
              <MenuItem eventKey={2}>{"2nd Level"}</MenuItem>
              <MenuItem eventKey={3}>{"3rd Level"}</MenuItem>
              <MenuItem eventKey={4}>{"4th Level"}</MenuItem>
              <MenuItem eventKey={5}>{"5th Level"}</MenuItem>
              <MenuItem eventKey={6}>{"6th Level"}</MenuItem>
              <MenuItem eventKey={7}>{"7th Level"}</MenuItem>
              <MenuItem eventKey={8}>{"8th Level"}</MenuItem>
              <MenuItem eventKey={9}>{"9th Level"}</MenuItem>
            </DropdownButton>
        </ButtonGroup>

        <TabbedArea className="spell-area" activeKey={this.state.spellLevel}>
          <TabPane eventKey={0}>
            <h3>{"Cantrips"}</h3>
          </TabPane>
          <TabPane eventKey={1}>
            <h3>{"1st Level Spells"}</h3>
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
          </TabPane>

          <TabPane eventKey={2}>
            <h3>{"2nd Level Spells"}</h3>
            <div className="slots">
              <p>Spell Slots</p>
              <Grid fluid>
                <Row>
                  <Col xs={1}><input type="checkbox" /></Col>
                  <Col xs={1}><input type="checkbox" /></Col>
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
          </TabPane>

          <TabPane eventKey={3}>
            <h3>{"3rd Level Spells"}</h3>
          </TabPane>
          <TabPane eventKey={4}>
            <h3>{"4th Level Spells"}</h3>
          </TabPane>
          <TabPane eventKey={5}>
            <h3>{"5th Level Spells"}</h3> 
          </TabPane>
          <TabPane eventKey={6}>
            <h3>{"6th Level Spells"}</h3>
          </TabPane>
          <TabPane eventKey={7}>
            <h3>{"7th Level Spells"}</h3>
          </TabPane>
          <TabPane eventKey={8}>
            <h3>{"8th Level Spells"}</h3>
          </TabPane>
          <TabPane eventKey={9}>
            <h3>{"9th Level Spells"}</h3>
          </TabPane>
        </TabbedArea>
      </div>
    );
  }
})

module.exports = Spells;