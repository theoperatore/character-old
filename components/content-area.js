var React = require('react');
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
      <TabbedArea defaultActiveKey={1}>
        <TabPane eventKey={1} tab={<Glyphicon glyph="exclamation-sign" />}>
          <div className="container-fluid">
            <h3>{"Info"}</h3>
            <p>{"All of your character info will prolly go here...class, race, level, etc."}</p>
            <p>{"Perhaps ability scores as well? How should those be displayed? Maybe 3 columns in 2 rows?"}</p>
            <Panel>
              <Grid fluid className="text-center">  
                <Row>
                  <Col xs={4}>
                    <Grid fluid>
                      <Row>
                        <Col><p><small>{"STR"}</small></p></Col>
                      </Row>
                      <Row>
                        <Col>{this.props.character['charAbilities']['str']['mod']}</Col>
                      </Row>
                      <Row>
                        <Col><small>{this.props.character['charAbilities']['str']['score']}</small></Col>
                      </Row>
                    </Grid>
                  </Col>
                  <Col xs={4}>
                    <Grid fluid>
                      <Row>
                        <Col><p><small>{"DEX"}</small></p></Col>
                      </Row>
                      <Row>
                        <Col>{this.props.character['charAbilities']['dex']['mod']}</Col>
                      </Row>
                      <Row>
                        <Col><small>{this.props.character['charAbilities']['dex']['score']}</small></Col>
                      </Row>
                    </Grid>
                  </Col>
                  <Col xs={4}>
                    <Grid fluid>
                      <Row>
                        <Col><p><small>{"CON"}</small></p></Col>
                      </Row>
                      <Row>
                        <Col>{this.props.character['charAbilities']['con']['mod']}</Col>
                      </Row>
                      <Row>
                        <Col><small>{this.props.character['charAbilities']['con']['score']}</small></Col>
                      </Row>
                    </Grid>
                  </Col>
                </Row>
                <Row>
                  <Col xs={4}>
                    <Grid fluid>
                      <Row>
                        <Col><p><small>{"INT"}</small></p></Col>
                      </Row>
                      <Row>
                        <Col>{this.props.character['charAbilities']['int']['mod']}</Col>
                      </Row>
                      <Row>
                        <Col><small>{this.props.character['charAbilities']['int']['score']}</small></Col>
                      </Row>
                    </Grid>
                  </Col>
                  <Col xs={4}>
                    <Grid fluid>
                      <Row>
                        <Col><p><small>{"WIS"}</small></p></Col>
                      </Row>
                      <Row>
                        <Col>{this.props.character['charAbilities']['wis']['mod']}</Col>
                      </Row>
                      <Row>
                        <Col><small>{this.props.character['charAbilities']['wis']['score']}</small></Col>
                      </Row>
                    </Grid>
                  </Col>
                  <Col xs={4}>
                    <Grid fluid>
                      <Row>
                        <Col><p><small>{"CHA"}</small></p></Col>
                      </Row>
                      <Row>
                        <Col>{this.props.character['charAbilities']['cha']['mod']}</Col>
                      </Row>
                      <Row>
                        <Col><small>{this.props.character['charAbilities']['cha']['score']}</small></Col>
                      </Row>
                    </Grid>
                  </Col>
                </Row>
              </Grid>
            </Panel>

            <p>{"Meh, maybe something else..."}</p>
            <p>{"Could do accordion"}</p>

            <Accordion defaultActiveKey="">
              <Panel header="Strength" eventKey='1'>
                <p>{"Might not feel right with just numbers..."}</p>
              </Panel>
              <Panel header="Dexterity" eventKey='2'>
                <p>{"mod:   " + this.props.character['charAbilities']['dex']['mod']}</p>
                <p>{"score: " + this.props.character['charAbilities']['dex']['score']}</p>
                <p>{"I feel like if we put them in rows? or something? that might be better?"}</p>
              </Panel>
            </Accordion>

            <p>{"Let's try just displaying them in rows, straight up"}</p>
  
            <h3>Strength</h3>
            <h4>mod: {this.props.character['charAbilities']['str']['mod']}</h4>
            <h4>score: {this.props.character['charAbilities']['str']['score']}</h4>

            <h3>Dexterity</h3>
            <h4>mod: {this.props.character['charAbilities']['dex']['mod']}</h4>
            <h4>score: {this.props.character['charAbilities']['dex']['score']}</h4>

            <h3>Constitution</h3>
            <h4>mod: {this.props.character['charAbilities']['con']['mod']}</h4>
            <h4>score: {this.props.character['charAbilities']['con']['score']}</h4>

            <h3>Intelligence</h3>
            <h4>mod: {this.props.character['charAbilities']['int']['mod']}</h4>
            <h4>score: {this.props.character['charAbilities']['int']['score']}</h4>

            <h3>Wisdom</h3>
            <h4>mod: {this.props.character['charAbilities']['wis']['mod']}</h4>
            <h4>score: {this.props.character['charAbilities']['wis']['score']}</h4>

            <h3>Charisma</h3>
            <h4>mod: {this.props.character['charAbilities']['cha']['mod']}</h4>
            <h4>score: {this.props.character['charAbilities']['cha']['score']}</h4>

            <p>{"Still not good enough. Have to think of a better way. Will probably use the same layout for skills too."}</p>
          </div>
        </TabPane>
        <TabPane eventKey={2} tab={<Glyphicon glyph="cog" />}>
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
          </div>
        </TabPane>
        <TabPane eventKey={3} tab={<Glyphicon glyph="compressed" />}>
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