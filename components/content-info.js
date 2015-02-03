var React = require('react');

var Grid = require('react-bootstrap/Grid');
var Row = require('react-bootstrap/Row');
var Col = require('react-bootstrap/Col');
var Panel = require('react-bootstrap/Panel');


var Info = React.createClass({
  displayName : "CharInfo",
  render : function() {

    var languages = [];
    this.props.character["charOtherProficiencies"]["languages"].forEach(function(lan, i) {
      languages.push(
        <Panel key={i} header={lan.name}>
          <p>{lan.desc}</p>  
        </Panel>
      )
    });

    var proficiencies = [];
    this.props.character["charOtherProficiencies"]["proficiencies"].forEach(function(prof, i) {
      proficiencies.push(
        <Panel key={i} header={prof.name}>
          <p>{prof.desc}</p>  
        </Panel>
      )
    });

    return (
      <div className="container-fluid">
        <h3>{"Info"}</h3>
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

        <h3>{"Traits"}</h3>
        <Panel header="Personality Traits">
          <p>{this.props.character['charTraits']['personalityTraits']}</p>  
        </Panel>
        
        <Panel header="Ideals">
          <p>{this.props.character['charTraits']['ideals']}</p>
        </Panel>

        <Panel header="Bonds">
          <p>{this.props.character['charTraits']['bonds']}</p>
        </Panel>        
        
        <Panel header="Flaws">
          <p>{this.props.character['charTraits']['flaws']}</p>
        </Panel>

        <h3>{"Proficiencies"}</h3>
        {proficiencies}

        <h3>{"Languages"}</h3>
        {languages}
      </div>
    )
  }
})

module.exports = Info;