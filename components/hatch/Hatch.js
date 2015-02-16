var React = require('react');

var Hatch = React.createClass({
  getInitialState : function() {
    var state = {};

    state.isOpen = false;

    return (state);
  },
  componentDidMount : function() {

    console.log("did mount hatch", this.refs.entryway.getDOMNode().getBoundingClientRect().height);
  },
  componentWillReceiveProps : function(nextProps) {
    console.log("receive props hatch", this.refs.entryway.getDOMNode().getBoundingClientRect().height, nextprops);
  },
  open : function() {
    var node = this.refs.cover.getDOMNode();
    var height = this.refs.entryway.getDOMNode().clientHeight;
    
    node.style.webkitTransform = "translate3d(0," + height + "px,0)";
    node.style.MozTransform    = "translate3d(0," + height + "px,0)";
    node.style.msTransform     = "translate3d(0," + height + "px,0)";
    node.style.OTransform      = "translate3d(0," + height + "px,0)";
    node.style.transform       = "translate3d(0," + height + "px,0)";

    console.log("running", height);
    this.setState({ isOpen : true });
  },
  componentDidUpdate : function() {
    console.log("did update hatch", this.getDOMNode().getBoundingClientRect().height);
  },
  close : function() {
    var node = this.refs.cover.getDOMNode();
    
    node.style.webkitTransform = "translate3d(0,0,0)";
    node.style.MozTransform    = "translate3d(0,0,0)";
    node.style.msTransform     = "translate3d(0,0,0)";
    node.style.OTransform      = "translate3d(0,0,0)";
    node.style.transform       = "translate3d(0,0,0)";

    this.setState({ isOpen : false });
  },
  getCurrentState : function() {
    return (this.state.isOpen);
  },
  toggle : function() {
    if (this.state.isOpen) {
      this.close();
    }
    else {
      this.open();
    }
  },
  render : function() {
    return (
      <div ref="entryway" id={this.props.eventKey} className="hatch-entryway">
        {this.props.children}
      </div>
    );
  }
})

module.exports = Hatch;