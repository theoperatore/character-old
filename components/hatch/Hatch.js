var React = require('react');

var Hatch = React.createClass({
  recalculate : function() {
    this.props.recalculate(this.props.eventKey);
  },

  toggle : function() {
    this.props.hatchToggle(this.props.eventKey);
  },

  // this might not give the correct context to each child call of this.props.recalculate
  renderChildren : function() {
    return React.Children.map(this.props.children, function(child) {
      return React.addons.cloneWithProps(child, { recalculate : this.recalculate, hatchToggle : this.toggle });
    }.bind(this));
  },
  render : function() {
    return (
      <div ref="entryway" id={this.props.eventKey || ""} className="hatch-entryway">
        {this.renderChildren()}
      </div>
    );
  }
})

module.exports = Hatch;