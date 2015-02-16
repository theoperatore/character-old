var React = require('react');
var SettingsInfo = require('../settings/settings-info');
var SettingsTraits = require('../settings/settings-traits');
var SettingsProfs = require('../settings/settings-proficiencies');
var SettingsLangs = require('../settings/settings-languages');

var Accordion = require('react-bootstrap/Accordion');
var Grid = require('react-bootstrap/Grid');
var Row = require('react-bootstrap/Row');
var Col = require('react-bootstrap/Col');
var Panel = require('react-bootstrap/Panel');
var Button = require('react-bootstrap/Button');
var Glyphicon = require('react-bootstrap/Glyphicon');
var OverlayMixin = require('react-bootstrap/OverlayMixin');

var Info = React.createClass({
  displayName : "CharInfo",
  handleToggle : function(cmp) {
    this.refs[cmp].toggle();
  },
  render : function() {

    // list languages known
    var languages = [];
    this.props.character["charOtherProficiencies"]["languages"].forEach(function(lan, i) {
      languages.push(
        <Panel className="no-padding" bsStyle="warning" key={i} header={lan.name} eventKey={i}>
          <p>{lan.desc}</p>  
        </Panel>
      )
    });

    // list proficiencies
    var proficiencies = [];
    this.props.character["charOtherProficiencies"]["proficiencies"].forEach(function(prof, i) {
      proficiencies.push(
        <Panel className="no-padding" bsStyle="warning" key={i} header={prof.name} eventKey={i}>
          <p>{prof.desc}</p>  
        </Panel>
      )
    });
    
    // list everything else.
    return (
      <div className="container-fluid">
        <h3>{"Info"} <Button className="no-border" onClick={this.handleToggle.bind(this, "settings-info")}><Glyphicon glyph="cog"/></Button></h3>
        <SettingsInfo ref="settings-info" character={this.props.character} edit={this.props.edit}/>
        <Panel>
          <Grid fluid>
            <Row>
              <Col xs={4}>
                <div>
                  <p>Class</p>
                  <h4>{this.props.character['charInfo']['class']}</h4>
                </div>
              </Col>
              <Col xs={4}>
                <div>
                  <p>Lvl</p>
                  <h4>{this.props.character['charInfo']['level']}</h4>
                </div>
              </Col>
              <Col xs={4}>
                <div>
                  <p>Xp</p>
                  <h4>{this.props.character['charInfo']['xp']}</h4>
                </div>
              </Col>
            </Row>
          </Grid>
        </Panel>
        <Panel>
          <Grid fluid>
            <Row>
              <Col xs={4}>
                <div>
                  <p>Bg</p>
                  <h4>{this.props.character['charInfo']['background']}</h4>
                </div>
              </Col>
              <Col xs={4}>
                <div>
                  <p>Race</p>
                  <h4>{this.props.character['charInfo']['race']}</h4>
                </div>
              </Col>
              <Col xs={4}>
                <div>
                  <p>Align</p>
                  <h4>{this.props.character['charInfo']['alignment']}</h4>
                </div>
              </Col>
            </Row>
          </Grid>
        </Panel>

        <h3>{"Traits"} <Button className="no-border" onClick={this.handleToggle.bind(this, "settings-traits")}><Glyphicon glyph="cog"/></Button></h3>
        <SettingsTraits ref="settings-traits" character={this.props.character} edit={this.props.edit}/>
        <Accordion defaultActiveKey="">
          <Panel className="no-padding" bsStyle="warning" eventKey={0} header="Personality Traits">
            <p>{this.props.character['charTraits']['personalityTraits']}</p>  
          </Panel>
          
          <Panel className="no-padding" bsStyle="warning" eventKey={1} header="Ideals">
            <p>{this.props.character['charTraits']['ideals']}</p>
          </Panel>

          <Panel className="no-padding" bsStyle="warning" eventKey={2} header="Bonds">
            <p>{this.props.character['charTraits']['bonds']}</p>
          </Panel>        
          
          <Panel className="no-padding" bsStyle="warning" eventKey={3} header="Flaws">
            <p>{this.props.character['charTraits']['flaws']}</p>
          </Panel>
        </Accordion>

        <h3>{"Proficiencies"} <Button className="no-border" onClick={this.handleToggle.bind(this, "settings-proficiencies")}><Glyphicon glyph="cog"/></Button></h3>
        <SettingsProfs ref="settings-proficiencies" character={this.props.character} edit={this.props.edit}/>
        <Accordion defaultActiveKey="">
          {proficiencies}
        </Accordion>

        <h3>{"Languages"} <Button className="no-border" onClick={this.handleToggle.bind(this, "settings-languages")}><Glyphicon glyph="cog"/></Button></h3>
        <SettingsLangs ref="settings-languages" character={this.props.character} edit={this.props.edit}/>
        <Accordion defaultActiveKey="">
          {languages}
        </Accordion>
      </div>
    )
  }
})

module.exports = Info;