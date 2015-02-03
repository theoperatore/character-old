var React = require('react');

var Grid = require('react-bootstrap/Grid');
var Row = require('react-bootstrap/Row');
var Col = require('react-bootstrap/Col');


var Info = React.createClass({
  displayName : "CharInfo",
  render : function() {
    return (
      <div className="container-fluid">
        <h3>{"Info"}</h3>
        <p>{"Maybe...but it's still not quite right..."}</p>
        <Grid fluid className="text-center">
          <Row>
            <Col xs={4} xsOffset={4}>
              <div>
                <p>CLASS</p>
                <h4>{this.props.character['charInfo']['class']}</h4>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={4}>
              <div>
                <p>XP</p>
                <h4>{this.props.character['charInfo']['xp']}</h4>
              </div>
            </Col>
            <Col xs={4}><div></div></Col>
            <Col xs={4}>
              <div>
                <p>LEVEL</p>
                <h3>{this.props.character['charInfo']['level']}</h3>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={4}>
              <div>
                <p>BACKGROUND</p>
                <h4>{this.props.character['charInfo']['background']}</h4>
              </div>
            </Col>
            <Col xs={4}><div></div></Col>
            <Col xs={4}>
              <div>
                <p>RACE</p>
                <h4>{this.props.character['charInfo']['race']}</h4>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={4} xsOffset={4}>
              <div>
                <p>ALIGNMENT</p>
                <h4>{this.props.character['charInfo']['alignment']}</h4>
              </div>
            </Col>
          </Row>
        </Grid>

        
        <h3>{"Traits"}</h3>
        <h4 className="text-center">{"Personality Traits"}</h4>
        <p className="text-center">{this.props.character['charTraits']['personalityTraits']}</p>

        <h4 className="text-center">{"Ideals"}</h4>
        <p className="text-center">{this.props.character['charTraits']['ideals']}</p>

        <h4 className="text-center">{"Bonds"}</h4>
        <p className="text-center">{this.props.character['charTraits']['bonds']}</p>

        <h4 className="text-center">{"Flaws"}</h4>
        <p className="text-center">{this.props.character['charTraits']['flaws']}</p>
      </div>
    )
  }
})

module.exports = Info;