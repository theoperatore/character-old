var React = require('react');
var ModalInfo = require('./modals/modal-info');
var ModalProf = require('./modals/modal-proficiencies');

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
  mixins : [OverlayMixin],
  getInitialState : function() {
    return ({
      infos : false,
      traits : false,
      profs : false,
      langs : false
    });
  },
  handleToggle : function(cmp) {
    var state = {};
    state[cmp] = !this.state[cmp];
    this.setState(state);
  },
  renderOverlay : function() {
    if (this.state.infos) {
      return (<ModalInfo character={this.props.character} edit={this.props.edit} close={this.handleToggle.bind(this, "infos")}/>);
    }
    
    if (this.state.traits) {
      return <span />;
    }
    
    if (this.state.profs) {
      return (<ModalProf character={this.props.character} edit={this.props.edit} close={this.handleToggle.bind(this, "profs")} />);
    }
    
    if (this.state.langs) {
      return <span />;
    }
    
    return <span />;
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
        <h3>{"Info"} <Button className="no-border" onClick={this.handleToggle.bind(this, "infos")}><Glyphicon glyph="cog"/></Button></h3>
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

        <h3>{"Traits"} <Button className="no-border" onClick={this.handleToggle.bind(this, "traits")}><Glyphicon glyph="cog"/></Button></h3>
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

        <h3>{"Proficiencies"} <Button className="no-border" onClick={this.handleToggle.bind(this, "profs")}><Glyphicon glyph="cog"/></Button></h3>
        <Accordion defaultActiveKey="">
          {proficiencies}
        </Accordion>

        <h3>{"Languages"} <Button className="no-border" onClick={this.handleToggle.bind(this, "langs")}><Glyphicon glyph="cog"/></Button></h3>
        <Accordion defaultActiveKey="">
          {languages}
        </Accordion>
      </div>
    )
  }
})

module.exports = Info;