var React = require('react');
var Immutable = require('immutable');
var SettingsInfo = require('../settings/settings-info');
var SettingsTraits = require('../settings/settings-traits');
var SettingsProfs = require('../settings/settings-proficiencies');
var SettingsLangs = require('../settings/settings-languages');

var HatchGroup = require('../hatch/HatchGroup');
var Hatch = require('../hatch/Hatch');
var Panel3d = require('../hatch/Panel3d');

var Grid = require('react-bootstrap/lib/Grid');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Panel = require('react-bootstrap/lib/Panel');
var Button = require('react-bootstrap/lib/Button');
var Glyphicon = require('react-bootstrap/lib/Glyphicon');
var OverlayMixin = require('react-bootstrap/lib/OverlayMixin');

var Info = React.createClass({
  displayName : "CharInfo",
  handleToggle : function(cmp, idx) {
    this.refs[cmp].toggle(idx);
  },
  render : function() {
    // list languages known
    var languages = [];
    this.props.character.getIn(['charOtherProficiencies', 'languages']).forEach(function(lan, i) {
      languages.push(
        <Panel3d className="list-header" key={i} title={lan.get('name')}>
          <p>{lan.get('desc')}</p>  
        </Panel3d>
      )
    });

    // list proficiencies
    var proficiencies = [];
    this.props.character.getIn(["charOtherProficiencies", "proficiencies"]).forEach(function(prof, i) {
      proficiencies.push(
        <Panel3d className="list-header" key={i} title={prof.get('name')}>
          <p>{prof.get('desc')}</p>  
        </Panel3d>
      )
    });
    
    // list everything else.
    return (
        <HatchGroup ref="settings">
          <div className="hatch-cover">
            <h3>{"Info"} <Button className="no-border" onClick={this.handleToggle.bind(this, "settings", "info0")}><Glyphicon glyph="cog"/></Button></h3>
          </div>
          <Hatch eventKey={"info0"}>
            <SettingsInfo character={this.props.character} edit={this.props.edit}/>  
          </Hatch>
          <div className="hatch-cover">
            <Panel>
              <Grid fluid>
                <Row>
                  <Col xs={4}>
                    <div>
                      <p>Class</p>
                      <h4>{this.props.character.get('charInfo').get('class')}</h4>
                    </div>
                  </Col>
                  <Col xs={4}>
                    <div>
                      <p>Lvl</p>
                      <h4>{this.props.character.get('charInfo').get('level')}</h4>
                    </div>
                  </Col>
                  <Col xs={4}>
                    <div>
                      <p>Xp</p>
                      <h4>{this.props.character.get('charInfo').get('xp')}</h4>
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
                      <h4>{this.props.character.get('charInfo').get('background')}</h4>
                    </div>
                  </Col>
                  <Col xs={4}>
                    <div>
                      <p>Race</p>
                      <h4>{this.props.character.get('charInfo').get('race')}</h4>
                    </div>
                  </Col>
                  <Col xs={4}>
                    <div>
                      <p>Align</p>
                      <h4>{this.props.character.get('charInfo').get('alignment')}</h4>
                    </div>
                  </Col>
                </Row>
              </Grid>
            </Panel>
            <h3>{"Traits"} <Button className="no-border" onClick={this.handleToggle.bind(this, "settings", "info1")}><Glyphicon glyph="cog"/></Button></h3>
          </div>
          <Hatch eventKey={"info1"}>
            <SettingsTraits character={this.props.character} edit={this.props.edit}/>
          </Hatch>
          <div className="hatch-cover">
            <Panel3d className="list-header" title="Personality Traits">
              <p>{this.props.character.get('charTraits').get('personalityTraits')}</p>
            </Panel3d>
            
            <Panel3d className="list-header" title="Ideals">
              <p>{this.props.character.get('charTraits').get('ideals')}</p>
            </Panel3d>

            <Panel3d className="list-header" title="Bonds">
              <p>{this.props.character.get('charTraits').get('bonds')}</p>
            </Panel3d>        
            
            <Panel3d className="list-header" title="Flaws">
              <p>{this.props.character.get('charTraits').get('flaws')}</p>
            </Panel3d>
            <h3>{"Proficiencies"} <Button className="no-border" onClick={this.handleToggle.bind(this, "settings", "info2")}><Glyphicon glyph="cog"/></Button></h3>
          </div>
          <Hatch eventKey={"info2"}>
            <SettingsProfs character={this.props.character} edit={this.props.edit}/>
          </Hatch>
          <div className="hatch-cover">
            {proficiencies}
            <h3>{"Languages"} <Button className="no-border" onClick={this.handleToggle.bind(this, "settings", "info3")}><Glyphicon glyph="cog"/></Button></h3>
          </div>
          <Hatch eventKey={"info3"}>
            <SettingsLangs character={this.props.character} edit={this.props.edit}/>
          </Hatch>
          <div className="hatch-cover">
            {languages}
          </div>
        </HatchGroup>
    )
  }
})

module.exports = Info;