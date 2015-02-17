var React = require('react/addons');

var HatchGroup = React.createClass({
  getInitialState : function() {
    return ({ hatches : {} });
  },
  open : function(idx) {
    var root = this.refs.root.getDOMNode();
    var hatches = this.state.hatches;
    var currHeight = root.getBoundingClientRect().height;
    var child;
    var height;
    var node;

    for (var i = 0; i < root.childNodes.length; i++) {
      child = root.childNodes[i];

      if (child.id === idx) {
        height = child.getBoundingClientRect().height;
        child.__prevHeight = height;

        for (var j = i+1; j < root.childNodes.length; j++) {
          node = root.childNodes[j];

          node.__translateHeight = 
            node.__translateHeight + height || height;

          node.style.webkitTransform = "translate3d(0," + node.__translateHeight + "px,0)";
          node.style.MozTransform    = "translate3d(0," + node.__translateHeight + "px,0)";
          node.style.msTransform     = "translate3d(0," + node.__translateHeight + "px,0)";
          node.style.OTransform      = "translate3d(0," + node.__translateHeight + "px,0)";
          node.style.transform       = "translate3d(0," + node.__translateHeight + "px,0)";

        }

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
    var currHeight = root.getBoundingClientRect().height;
    var child;
    var height;
    var node;

    for (var i = 0; i < root.childNodes.length; i++) {
      child = root.childNodes[i];

      if (child.id === idx) {

        // get the height of the hatch-entryway so we know how much to
        // translate by
        height = child.getBoundingClientRect().height;

        // for each sibling apply the translate
        for (var j = i+1; j < root.childNodes.length; j++) {
          node = root.childNodes[j];

          node.__translateHeight = 
            node.__translateHeight - height || 0;

          node.style.webkitTransform = "translate3d(0," + node.__translateHeight + "px,0)";
          node.style.MozTransform    = "translate3d(0," + node.__translateHeight + "px,0)";
          node.style.msTransform     = "translate3d(0," + node.__translateHeight + "px,0)";
          node.style.OTransform      = "translate3d(0," + node.__translateHeight + "px,0)";
          node.style.transform       = "translate3d(0," + node.__translateHeight + "px,0)";
        }

        currHeight -= height;

        delete hatches[idx];

        if (Object.keys(hatches).length === 0) {
          root.style.height = "100%";
        }
        else {
          root.style.height = currHeight + "px";
        }

        this.setState({ hatches : hatches });
      }
    }
  },
  recalculate : function(idx) {
    var root;
    var currHeight;
    var child;
    var height;
    var diff;
    var node;

    if (!this.state.hatches[idx] || this.state.hatches[idx] === false) return;

    console.log("recalculating hatch:", idx);
    root = this.refs.root.getDOMNode();
    currHeight = root.getBoundingClientRect().height;

    for (var i = 0; i < root.childNodes.length; i++) {
      child = root.childNodes[i];

      if (child.id === idx) {

        // get the new height of the entryway (because it changed if this is called)
        height = child.getBoundingClientRect().height;
        diff = height - child.__prevHeight;
        child.__prevHeight = height;

        // for each sibling apply the translate
        for (var j = i+1; j < root.childNodes.length; j++) {
          node = root.childNodes[j];

          node.__translateHeight = node.__translateHeight || height;
          node.__translateHeight += diff;

          node.style.webkitTransform = "translate3d(0," + node.__translateHeight + "px,0)";
          node.style.MozTransform    = "translate3d(0," + node.__translateHeight + "px,0)";
          node.style.msTransform     = "translate3d(0," + node.__translateHeight + "px,0)";
          node.style.OTransform      = "translate3d(0," + node.__translateHeight + "px,0)";
          node.style.transform       = "translate3d(0," + node.__translateHeight + "px,0)";
        }

        currHeight += diff;
        root.style.height = currHeight + "px";
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