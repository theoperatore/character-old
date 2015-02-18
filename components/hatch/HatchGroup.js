var React = require('react/addons');

var HatchGroup = React.createClass({
  getInitialState : function() {
    return ({ hatches : {} });
  },
  open : function(idx) {
    var root = this.refs.root.getDOMNode();
    var hatches = this.state.hatches;
    var currHeight = root.getBoundingClientRect().height;
    var hatch = document.getElementById(idx);
    var height;
    var node;

    if (!hatch) {
      console.error("cannot find node to open :", idx);
      return;
    }

    height = hatch.getBoundingClientRect().height;
    hatch.__prevHeight = height;

    hatch.classList.add("hatch-group-open");

    // for sibling nodes, translate them
    node = hatch.nextElementSibling;

    while(node) {
      node.__translateHeight = (node.__translateHeight)
        ? (node.__translateHeight + height) : height;

      node.style.webkitTransform = "translate3d(0," + node.__translateHeight + "px,0)";
      node.style.MozTransform    = "translate3d(0," + node.__translateHeight + "px,0)";
      node.style.msTransform     = "translate3d(0," + node.__translateHeight + "px,0)";
      node.style.OTransform      = "translate3d(0," + node.__translateHeight + "px,0)";
      node.style.transform       = "translate3d(0," + node.__translateHeight + "px,0)";

      node = node.nextElementSibling;
    }

    currHeight += height;
    hatches[idx] = true;
    //root.style.height = currHeight + "px";

    this.setState({ hatches : hatches });
  },
  close : function(idx) {
    var root = this.refs.root.getDOMNode();
    var hatches = this.state.hatches;
    var currHeight = root.getBoundingClientRect().height;
    var child = document.getElementById(idx);
    var height;
    var node;

    if (!child) {
      console.error("cannot find node to close :", idx);
      return;
    }

    height = child.getBoundingClientRect().height;
    child.__prevHeight = height;

    child.classList.remove("hatch-group-open");

    // for sibling nodes, translate them
    node = child.nextElementSibling;

    while(node) {

      node.__translateHeight = (node.__translateHeight)
        ? (node.__translateHeight - height) : height;

      node.style.webkitTransform = "translate3d(0," + node.__translateHeight + "px,0)";
      node.style.MozTransform    = "translate3d(0," + node.__translateHeight + "px,0)";
      node.style.msTransform     = "translate3d(0," + node.__translateHeight + "px,0)";
      node.style.OTransform      = "translate3d(0," + node.__translateHeight + "px,0)";
      node.style.transform       = "translate3d(0," + node.__translateHeight + "px,0)";

      node = node.nextElementSibling;
    }

    currHeight -= height;
    hatches[idx] = false;
    //root.style.height = currHeight + "px";

    this.setState({ hatches : hatches });
  },
  recalculate : function(idx) {
    var root;
    var currHeight;
    var child;
    var height;
    var diff;
    var node;

    if (!this.state.hatches[idx] || this.state.hatches[idx] === false) return;

    root = this.refs.root.getDOMNode();
    currHeight = root.getBoundingClientRect().height;
    child = document.getElementById(idx);

    if (!child) {
      console.error("cannot find node to recalculate : ", idx);
      return;
    }

    height = child.getBoundingClientRect().height;
    diff = height - child.__prevHeight;
    child.__prevHeight = height;

    // for sibling nodes, translate them
    node = child.nextElementSibling;

    while(node) {
      node.__translateHeight = node.__translateHeight || height;
      node.__translateHeight += diff;

      node.style.webkitTransform = "translate3d(0," + node.__translateHeight + "px,0)";
      node.style.MozTransform    = "translate3d(0," + node.__translateHeight + "px,0)";
      node.style.msTransform     = "translate3d(0," + node.__translateHeight + "px,0)";
      node.style.OTransform      = "translate3d(0," + node.__translateHeight + "px,0)";
      node.style.transform       = "translate3d(0," + node.__translateHeight + "px,0)";

      node = node.nextElementSibling;
    }

    currHeight += diff;
    //root.style.height = currHeight + "px";
  },
  toggle : function(idx) {
    if (this.state.hatches[idx] === true) {
      this.close(idx);
    }
    else {
      this.open(idx);  
    }
  },
  renderChildren : function() {
    return React.Children.map(this.props.children, function(child) {
      return React.addons.cloneWithProps(child, { recalculate : this.recalculate, toggle : this.toggle });
    }.bind(this))
  },
  render : function() {
    return (
      <div ref={"root"} className={"hatch-group-container"}>
        {this.renderChildren()}
      </div>
    );
  }
})

module.exports = HatchGroup;