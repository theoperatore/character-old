var React = require('react');

// components
var PaneInfo = require('./panes/pane-info');
var PaneAttack = require('./panes/pane-attack');
var PaneAbility = require('./panes/pane-ability');
var PaneDefense = require('./panes/pane-defense');
var PaneFeature = require('./panes/pane-feature');
var PaneEquipment = require('./panes/pane-equipment');
var PaneSpell = require('./panes/pane-spell');

var Hatch = require('./hatch/Hatch');
var HatchGroup = require('./hatch/HatchGroup');
var Button = require('react-bootstrap/Button');

// react-bootstrap stuff
var TabbedArea = require('react-bootstrap/TabbedArea');
var TabPane = require('react-bootstrap/TabPane');
var Glyphicon = require('react-bootstrap/Glyphicon');


// the thing!
var ContentArea = React.createClass({
  displayName : "ContentArea",
  toggleHatch : function(idx) {
    this.refs.hatchgroup.toggle(idx);
  },
  render : function() {
    return (
      <TabbedArea defaultActiveKey={8}>

        <TabPane eventKey={1} tab={<Glyphicon glyph="info-sign" />}>
          <PaneInfo character={this.props.character} edit={this.props.edit} />          
        </TabPane>


        <TabPane eventKey={2} tab={<Glyphicon glyph="bookmark" />}>
          <PaneAbility character={this.props.character} edit={this.props.edit} />
        </TabPane>


        <TabPane eventKey={3} tab={<Glyphicon glyph="tower" />}>
          <PaneDefense character={this.props.character} edit={this.props.edit} />
        </TabPane>


        <TabPane eventKey={4} tab={<Glyphicon glyph="flash" />}>
          <PaneFeature character={this.props.character} edit={this.props.edit} />
        </TabPane>


        <TabPane eventKey={5} tab={<Glyphicon glyph="fire" />}>
          <PaneAttack 
            character={this.props.character} edit={this.props.edit}
            preferences={this.props.preferences} editPreferences={this.props.editPreferences}
          />
        </TabPane>


        <TabPane eventKey={6} tab={<Glyphicon glyph="book" />}>
          <PaneSpell 
            character={this.props.character} edit={this.props.edit} 
            preferences={this.props.preferences} editPreferences={this.props.editPreferences}
          />
        </TabPane>

        <TabPane eventKey={7} tab={<Glyphicon glyph="shopping-cart" />}>
          <PaneEquipment character={this.props.character} edit={this.props.edit} /> 
        </TabPane>

        <TabPane eventKey={8} tab={<Glyphicon glyph="floppy-save" />}>
          <HatchGroup ref="hatchgroup">
            <Hatch eventKey={"0"}>
              <h1>{"Entryway of the Hatch 1"}</h1>
              <p>{"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In finibus risus ac rhoncus ultricies. Donec at risus interdum, ornare nisl quis, rhoncus odio. Integer pharetra neque nunc. Proin porttitor dapibus efficitur. Maecenas nec ante libero. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi feugiat non justo vitae vehicula. Morbi arcu est, luctus vehicula mollis ut, finibus at eros. Sed vulputate blandit porta. Maecenas posuere elit ultrices diam consequat, eu fermentum turpis bibendum. Suspendisse eu augue quis nunc eleifend varius. Fusce ultrices dolor ut neque interdum, quis imperdiet sapien sagittis. Ut posuere sollicitudin ex sed suscipit. Nulla nec nunc vulputate odio finibus semper at ac neque. Morbi semper, magna malesuada laoreet feugiat, magna dui dictum ligula, ut cursus nisi nisl sed massa. Fusce tristique quam vel leo pulvinar, id egestas dolor molestie."}</p>
              <p>{"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In finibus risus ac rhoncus ultricies. Donec at risus interdum, ornare nisl quis, rhoncus odio. Integer pharetra neque nunc. Proin porttitor dapibus efficitur. Maecenas nec ante libero. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi feugiat non justo vitae vehicula. Morbi arcu est, luctus vehicula mollis ut, finibus at eros. Sed vulputate blandit porta. Maecenas posuere elit ultrices diam consequat, eu fermentum turpis bibendum. Suspendisse eu augue quis nunc eleifend varius. Fusce ultrices dolor ut neque interdum, quis imperdiet sapien sagittis. Ut posuere sollicitudin ex sed suscipit. Nulla nec nunc vulputate odio finibus semper at ac neque. Morbi semper, magna malesuada laoreet feugiat, magna dui dictum ligula, ut cursus nisi nisl sed massa. Fusce tristique quam vel leo pulvinar, id egestas dolor molestie."}</p>
              <p>{"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In finibus risus ac rhoncus ultricies. Donec at risus interdum, ornare nisl quis, rhoncus odio. Integer pharetra neque nunc. Proin porttitor dapibus efficitur. Maecenas nec ante libero. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi feugiat non justo vitae vehicula. Morbi arcu est, luctus vehicula mollis ut, finibus at eros. Sed vulputate blandit porta. Maecenas posuere elit ultrices diam consequat, eu fermentum turpis bibendum. Suspendisse eu augue quis nunc eleifend varius. Fusce ultrices dolor ut neque interdum, quis imperdiet sapien sagittis. Ut posuere sollicitudin ex sed suscipit. Nulla nec nunc vulputate odio finibus semper at ac neque. Morbi semper, magna malesuada laoreet feugiat, magna dui dictum ligula, ut cursus nisi nisl sed massa. Fusce tristique quam vel leo pulvinar, id egestas dolor molestie."}</p>
              <p>{"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In finibus risus ac rhoncus ultricies. Donec at risus interdum, ornare nisl quis, rhoncus odio. Integer pharetra neque nunc. Proin porttitor dapibus efficitur. Maecenas nec ante libero. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi feugiat non justo vitae vehicula. Morbi arcu est, luctus vehicula mollis ut, finibus at eros. Sed vulputate blandit porta. Maecenas posuere elit ultrices diam consequat, eu fermentum turpis bibendum. Suspendisse eu augue quis nunc eleifend varius. Fusce ultrices dolor ut neque interdum, quis imperdiet sapien sagittis. Ut posuere sollicitudin ex sed suscipit. Nulla nec nunc vulputate odio finibus semper at ac neque. Morbi semper, magna malesuada laoreet feugiat, magna dui dictum ligula, ut cursus nisi nisl sed massa. Fusce tristique quam vel leo pulvinar, id egestas dolor molestie."}</p>
            </Hatch>
            <div className="hatch-cover">
              <h1>{"Normal Other content"}</h1>
              <Button onClick={this.toggleHatch.bind(this, "0")}>{"Toggle"}</Button>
              <p>{"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In finibus risus ac rhoncus ultricies. Donec at risus interdum, ornare nisl quis, rhoncus odio. Integer pharetra neque nunc. Proin porttitor dapibus efficitur. Maecenas nec ante libero. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi feugiat non justo vitae vehicula. Morbi arcu est, luctus vehicula mollis ut, finibus at eros. Sed vulputate blandit porta. Maecenas posuere elit ultrices diam consequat, eu fermentum turpis bibendum. Suspendisse eu augue quis nunc eleifend varius. Fusce ultrices dolor ut neque interdum, quis imperdiet sapien sagittis. Ut posuere sollicitudin ex sed suscipit. Nulla nec nunc vulputate odio finibus semper at ac neque. Morbi semper, magna malesuada laoreet feugiat, magna dui dictum ligula, ut cursus nisi nisl sed massa. Fusce tristique quam vel leo pulvinar, id egestas dolor molestie."}</p>
            </div>
            <Hatch eventKey={"1"}>
              <h1>{"Entryway of the Hatch 2"}</h1>
              <p>{"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In finibus risus ac rhoncus ultricies. Donec at risus interdum, ornare nisl quis, rhoncus odio. Integer pharetra neque nunc. Proin porttitor dapibus efficitur. Maecenas nec ante libero. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi feugiat non justo vitae vehicula. Morbi arcu est, luctus vehicula mollis ut, finibus at eros. Sed vulputate blandit porta. Maecenas posuere elit ultrices diam consequat, eu fermentum turpis bibendum. Suspendisse eu augue quis nunc eleifend varius. Fusce ultrices dolor ut neque interdum, quis imperdiet sapien sagittis. Ut posuere sollicitudin ex sed suscipit. Nulla nec nunc vulputate odio finibus semper at ac neque. Morbi semper, magna malesuada laoreet feugiat, magna dui dictum ligula, ut cursus nisi nisl sed massa. Fusce tristique quam vel leo pulvinar, id egestas dolor molestie."}</p>
            </Hatch>
            <div className="hatch-cover">
              <h1>{"Normal Other content"}</h1>
              <Button onClick={this.toggleHatch.bind(this, "1")}>{"Toggle"}</Button>
              <p>{"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In finibus risus ac rhoncus ultricies. Donec at risus interdum, ornare nisl quis, rhoncus odio. Integer pharetra neque nunc. Proin porttitor dapibus efficitur. Maecenas nec ante libero. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi feugiat non justo vitae vehicula. Morbi arcu est, luctus vehicula mollis ut, finibus at eros. Sed vulputate blandit porta. Maecenas posuere elit ultrices diam consequat, eu fermentum turpis bibendum. Suspendisse eu augue quis nunc eleifend varius. Fusce ultrices dolor ut neque interdum, quis imperdiet sapien sagittis. Ut posuere sollicitudin ex sed suscipit. Nulla nec nunc vulputate odio finibus semper at ac neque. Morbi semper, magna malesuada laoreet feugiat, magna dui dictum ligula, ut cursus nisi nisl sed massa. Fusce tristique quam vel leo pulvinar, id egestas dolor molestie."}</p>
              <p>{"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In finibus risus ac rhoncus ultricies. Donec at risus interdum, ornare nisl quis, rhoncus odio. Integer pharetra neque nunc. Proin porttitor dapibus efficitur. Maecenas nec ante libero. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi feugiat non justo vitae vehicula. Morbi arcu est, luctus vehicula mollis ut, finibus at eros. Sed vulputate blandit porta. Maecenas posuere elit ultrices diam consequat, eu fermentum turpis bibendum. Suspendisse eu augue quis nunc eleifend varius. Fusce ultrices dolor ut neque interdum, quis imperdiet sapien sagittis. Ut posuere sollicitudin ex sed suscipit. Nulla nec nunc vulputate odio finibus semper at ac neque. Morbi semper, magna malesuada laoreet feugiat, magna dui dictum ligula, ut cursus nisi nisl sed massa. Fusce tristique quam vel leo pulvinar, id egestas dolor molestie."}</p>
              <p>{"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In finibus risus ac rhoncus ultricies. Donec at risus interdum, ornare nisl quis, rhoncus odio. Integer pharetra neque nunc. Proin porttitor dapibus efficitur. Maecenas nec ante libero. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi feugiat non justo vitae vehicula. Morbi arcu est, luctus vehicula mollis ut, finibus at eros. Sed vulputate blandit porta. Maecenas posuere elit ultrices diam consequat, eu fermentum turpis bibendum. Suspendisse eu augue quis nunc eleifend varius. Fusce ultrices dolor ut neque interdum, quis imperdiet sapien sagittis. Ut posuere sollicitudin ex sed suscipit. Nulla nec nunc vulputate odio finibus semper at ac neque. Morbi semper, magna malesuada laoreet feugiat, magna dui dictum ligula, ut cursus nisi nisl sed massa. Fusce tristique quam vel leo pulvinar, id egestas dolor molestie."}</p>
            </div>
          </HatchGroup>
        </TabPane>        

      </TabbedArea>
    )
  }
})

module.exports = ContentArea;