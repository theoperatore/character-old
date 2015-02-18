var React = require('react');
var SettingsInfo = require('../settings/settings-info');
var SettingsTraits = require('../settings/settings-traits');
var SettingsProfs = require('../settings/settings-proficiencies');
var SettingsLangs = require('../settings/settings-languages');

var HatchGroup = require('../hatch/HatchGroup');
var Hatch = require('../hatch/Hatch');
var Panel3d = require('../hatch/Panel3d');

var Grid = require('react-bootstrap/Grid');
var Row = require('react-bootstrap/Row');
var Col = require('react-bootstrap/Col');
var Panel = require('react-bootstrap/Panel');
var Button = require('react-bootstrap/Button');
var Glyphicon = require('react-bootstrap/Glyphicon');
var OverlayMixin = require('react-bootstrap/OverlayMixin');

var Info = React.createClass({
  displayName : "CharInfo",
  handleToggle : function(cmp, idx) {
    this.refs[cmp].toggle(idx);
  },
  render : function() {

    // list languages known
    var languages = [];
    this.props.character["charOtherProficiencies"]["languages"].forEach(function(lan, i) {
      languages.push(
        <Panel3d className="list-header" key={i} title={lan.name}>
          <p>{lan.desc}</p>  
        </Panel3d>
      )
    });

    // list proficiencies
    var proficiencies = [];
    this.props.character["charOtherProficiencies"]["proficiencies"].forEach(function(prof, i) {
      proficiencies.push(
        <Panel3d className="list-header" key={i} title={prof.name}>
          <p>{prof.desc}</p>  
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
            <h3>{"Traits"} <Button className="no-border" onClick={this.handleToggle.bind(this, "settings", "info1")}><Glyphicon glyph="cog"/></Button></h3>
          </div>
          <Hatch eventKey={"info1"}>
            <SettingsTraits character={this.props.character} edit={this.props.edit}/>
          </Hatch>
          <div className="hatch-cover">
            <Panel3d className="list-header" title="Personality Traits">
              <p>{this.props.character['charTraits']['personalityTraits']}</p>  
            </Panel3d>
            
            <Panel3d className="list-header" title="Ideals">
              <p>{this.props.character['charTraits']['ideals']}</p>
            </Panel3d>

            <Panel3d className="list-header" title="Bonds">
              <p>{this.props.character['charTraits']['bonds']}</p>
            </Panel3d>        
            
            <Panel3d className="list-header" title="Flaws">
              <p>{this.props.character['charTraits']['flaws']}</p>
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