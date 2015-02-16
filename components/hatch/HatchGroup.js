var React = require('react');

// need to apply the translate to each node after the Hatch to open.
var HatchGroup = React.createClass({
  getInitialState : function() {
    return ({
      hatches : {},
      bodyHeight : 0,
      totalHeight : 0
    })
  },
  componentDidMount: function () {

    var state = {};
    var root = this.refs.root.getDOMNode();

    state.bodyHeight = root.getBoundingClientRect().height;
    state.totalHeight = root.getBoundingClientRect().height;

    this.setState(state);
    console.log("did mount hatchgroup", state.totalHeight);
  },
  componentWillReceiveProps : function() {
    var state = {};
    var root = this.refs.root.getDOMNode();

    state.bodyHeight = root.getBoundingClientRect().height;
    state.totalHeight = root.getBoundingClientRect().height;

    this.setState(state);
    console.log("received props hatch", state.totalHeight);
  },
  open : function(idx) {
    var root = this.refs.root.getDOMNode();
    var hatches = this.state.hatches;
    //var totalHeight = this.state.totalHeight;

    // current height of container div
    var currHeight = this.refs.root.getDOMNode().getBoundingClientRect().height;

    for (var i = 0; i < root.childNodes.length; i++) {
      var child = root.childNodes[i];
      if (child.id === idx) {

        // height of under well to scroll by
        var height = child.getBoundingClientRect().height;


        for (var j = i+1; j < root.childNodes.length; j++) {
          var node = root.childNodes[j];

          node.__translateHeight = 
            (node.__translateHeight) ? 
            node.__translateHeight + height : height;

          node.style.webkitTransform = "translate3d(0," + node.__translateHeight + "px,0)";
          node.style.MozTransform    = "translate3d(0," + node.__translateHeight + "px,0)";
          node.style.msTransform     = "translate3d(0," + node.__translateHeight + "px,0)";
          node.style.OTransform      = "translate3d(0," + node.__translateHeight + "px,0)";
          node.style.transform       = "translate3d(0," + node.__translateHeight + "px,0)";

        }

        //totalHeight += height;
        currHeight += height;
        hatches[idx] = true;
        root.style.height = currHeight + "px";

        this.setState({ hatches : hatches });
      }
    }
  },
  close : function(idx) {
    var root = this.refs.root.getDOMNode();
    var hatches = this.state.hatches;
    //var totalHeight = this.state.totalHeight;
    var currHeight = this.refs.root.getDOMNode().getBoundingClientRect().height;

    for (var i = 0; i < root.childNodes.length; i++) {
      var child = root.childNodes[i];
      if (child.id === idx) {
        var height = child.getBoundingClientRect().height;

        for (var j = i+1; j < root.childNodes.length; j++) {
          var node = root.childNodes[j];

          node.__translateHeight = 
            (node.__translateHeight) ?
            node.__translateHeight - height : 0;

          node.style.webkitTransform = "translate3d(0," + node.__translateHeight + "px,0)";
          node.style.MozTransform    = "translate3d(0," + node.__translateHeight + "px,0)";
          node.style.msTransform     = "translate3d(0," + node.__translateHeight + "px,0)";
          node.style.OTransform      = "translate3d(0," + node.__translateHeight + "px,0)";
          node.style.transform       = "translate3d(0," + node.__translateHeight + "px,0)";
        }

        currHeight -= height;
        hatches[idx] = false;
        root.style.height = currHeight + "px";

        this.setState({ hatches : hatches });
      }
    }
  },
  toggle : function(idx) {
    if (this.state.hatches[idx] === true) {
      this.close(idx);
    }
    else {
      this.open(idx);  
    }
  },
  render : function() {
    return (
      <div ref={"root"} className={"hatch-group-container"}>
        {this.props.children}
      </div>
    );
  }
})

module.exports = HatchGroup;