var React = require('react');
var ContentInfo = require('./content-info');

var PageHeader = require('react-bootstrap/PageHeader');
var TabbedArea = require('react-bootstrap/TabbedArea');
var TabPane = require('react-bootstrap/TabPane');
var Glyphicon = require('react-bootstrap/Glyphicon');
var Accordion = require('react-bootstrap/Accordion');
var Panel = require('react-bootstrap/Panel');
var Grid = require('react-bootstrap/Grid');
var Row = require('react-bootstrap/Row');
var Col = require('react-bootstrap/Col');

var ContentArea = React.createClass({
  displayName : "ContentArea",
  render : function() {
    return (
      <TabbedArea defaultActiveKey={3}>
        <TabPane eventKey={1} tab={<Glyphicon glyph="info-sign" />}>
          <ContentInfo character={this.props.character} />          
        </TabPane>
        <TabPane eventKey={2} tab={<Glyphicon glyph="bookmark" />}>
          <div className="container-fluid">
            <h3>{"Ability Scores"}</h3>
            <p>{"I'd like to come up with something better than just having a grid of them..."}</p>
            <Grid fluid className="text-center">
              <Row>
                <Col xs={4}>
                  <div className="card">
                    <p>STR</p>
                    <h3>{this.props.character['charAbilities']['str']['mod']}</h3>
                    <p>{this.props.character['charAbilities']['str']['score']}</p>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="card">
                    <p>DEX</p>
                    <h3>{this.props.character['charAbilities']['dex']['mod']}</h3>
                    <p>{this.props.character['charAbilities']['dex']['score']}</p>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="card">
                    <p>CON</p>
                    <h3>{this.props.character['charAbilities']['con']['mod']}</h3>
                    <p>{this.props.character['charAbilities']['con']['score']}</p>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xs={4}>
                  <div className="card">
                    <p>INT</p>
                    <h3>{this.props.character['charAbilities']['int']['mod']}</h3>
                    <p>{this.props.character['charAbilities']['int']['score']}</p>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="card">
                    <p>WIS</p>
                    <h3>{this.props.character['charAbilities']['wis']['mod']}</h3>
                    <p>{this.props.character['charAbilities']['wis']['score']}</p>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="card">
                    <p>CHA</p>
                    <h3>{this.props.character['charAbilities']['cha']['mod']}</h3>
                    <p>{this.props.character['charAbilities']['cha']['score']}</p>
                  </div>
                </Col>
              </Row>
            </Grid>
          </div>
        </TabPane>
        <TabPane eventKey={3} tab={<Glyphicon glyph="fire" />}>
          <div className="container-fluid">
            <h3>{"Attacks"}</h3>
            <p>Here will prolly be a list of your attacks? Maybe a nice vertical accordion style list?</p>
            <Accordion defaultActiveKey="">
              <Panel header="Punching" eventKey='1'>
                <p>{"Punch a dude. Right in the mouth! Kapow!"}</p>
              </Panel>
              <Panel header="Kick-a-Pow" eventKey='2'>
                <p>{"Fly your foot into the dude's face. +2 damage to insult and +4 damage to injury."}</p>
              </Panel>
            </Accordion>
            <p>Spell slots and character ability slots would also go here. So would anything else that a character needs to attack with minus equipment.</p>
          </div>
        </TabPane>
        <TabPane eventKey={4} tab={<Glyphicon glyph="tower" />}>
          <div className="container-fluid">
            <h3>{"Defenses"}</h3>
            <p>{"Armor class, hp, stuff like that would go here"}</p>
          </div>
        </TabPane>
        <TabPane eventKey={5} tab={<Glyphicon glyph="briefcase" />}>
          <div className="container-fluid">
            <h3>{"Equipment"}</h3>

            <Grid fluid className="text-center">
              <Row>
                <Col xs={2}><p>cp</p></Col>
                <Col xs={2}><p>sp</p></Col>
                <Col xs={4}><p>ep</p></Col>
                <Col xs={2}><p>gp</p></Col>
                <Col xs={2}><p>pp</p></Col>
              </Row>
              <Row>
                <Col xs={2}><p>0</p></Col>
                <Col xs={2}><p>0</p></Col>
                <Col xs={4}><p>0</p></Col>
                <Col xs={2}><p>1337</p></Col>
                <Col xs={2}><p>0</p></Col>
              </Row>
            </Grid>
            <p>{"but how would this all be editable? Click button to enter \"edit mode\"? Tap on value to change to enter new value? so many questions..."}</p>
          </div>
        </TabPane>
      </TabbedArea>
    )
  }
})

module.exports = ContentArea;