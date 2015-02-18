var React = require('react/addons');

// a component to simulate the behavior of a collapsing bootstrap panel,
// but instead of transitioning the height, use translate3d and update
// the height of the container for continued page scrolling.
var Panel3d = React.createClass({
  getInitialState : function() {
    var state = {};

    state.isOpen = false;
    state.heightHeader = 0;
    state.heightContent = 0;
    state.isDirty = true;

    return (state);
  },

  // cache height of sliding component and set height of container
  // to be the height of the header (comp is closed)
  componentDidMount: function () {
    var container = this.refs.container.getDOMNode();
    var header = this.refs.header.getDOMNode();
    var content = this.refs.content.getDOMNode();
    var state = {};

    // cache the height of the header and content
    state.heightHeader  = header.getBoundingClientRect().height;
    state.heightContent = content.getBoundingClientRect().height;

    // set the initial height of the component to closed
    // problem if this component mounts, but is not displayed.
    // the height will be 0 and the component will not be shown
    // container.style.height = state.heightHeader + "px";

    // setup event listener for transitionend?
    content.addEventListener("webkitTransitionEnd", function(el) {
      if (el.target.classList.contains("closing")) {
        var height = this.state.heightHeader;

        if (this.state.isDirty) {
          height = this.refs.header.getDOMNode().getBoundingClientRect().height + "px";
        }

        el.target.classList.remove("closing");
        this.refs.container.getDOMNode().style.height = height + "px";

        // if this Panel is in another panel, tell the parent to recalculate
        if (this.props.panelRecalculate) this.props.panelRecalculate();
        return;
      }

    }.bind(this))

    this.setState(state);
  },

  // open this component
  open : function() {
    var container = this.refs.container.getDOMNode();
    var header = this.refs.header.getDOMNode();
    var content = this.refs.content.getDOMNode();

    // use cached values
    var heightHeader = this.state.heightHeader;
    var heightContent = this.state.heightContent;

    // force a recalculation if dirty
    if (this.state.isDirty) {
      var state = {};

      heightHeader = header.getBoundingClientRect().height;
      heightContent = content.getBoundingClientRect().height;

      state.heightHeader = heightHeader;
      state.heightContent = heightContent;
      state.isDirty = false;

      this.setState(state);
    }

    // add some classes
    content.classList.add("open");
    header.classList.add("open");

    // apply the translate3d to the content
    content.style.webkitTransform = "translate3d(0," + heightHeader + "px,0)";
    content.style.MozTransform    = "translate3d(0," + heightHeader + "px,0)";
    content.style.msTransform     = "translate3d(0," + heightHeader + "px,0)";
    content.style.OTransform      = "translate3d(0," + heightHeader + "px,0)";
    content.style.transform       = "translate3d(0," + heightHeader + "px,0)";

    // apply open height to container
    container.style.height = heightHeader + heightContent + "px";

    // if this Panel is in another panel, tell the parent to recalculate
    if (this.props.panelRecalculate) this.props.panelRecalculate();

    // keep track of state
    this.setState({ isOpen : true });
  },

  // close this component
  close : function() {
    var container = this.refs.container.getDOMNode();
    var header = this.refs.header.getDOMNode();
    var content = this.refs.content.getDOMNode();

    // use cached values
    var heightHeader = this.state.heightHeader;
    var heightContent = this.state.heightContent;

    // force a recalculation if dirty
    if (this.state.isDirty) {
      var state = {};

      heightHeader = header.getBoundingClientRect().height;
      heightContent = content.getBoundingClientRect().height;

      state.heightHeader = heightHeader;
      state.heightContent = heightContent;
      state.isDirty = false;

      this.setState(state);
    }

    // do a little css styling
    header.classList.remove("open");
    content.classList.remove("open");
    content.classList.add("closing");

    // apply the translate3d to the content
    content.style.webkitTransform = "translate3d(0,0,0)";
    content.style.MozTransform    = "translate3d(0,0,0)";
    content.style.msTransform     = "translate3d(0,0,0)";
    content.style.OTransform      = "translate3d(0,0,0)";
    content.style.transform       = "translate3d(0,0,0)";

    // apply height to container -- this happens in the transitionend event handler
    //container.style.height = heightHeader + "px";

    this.setState({ isOpen : false });
  },

  // toggle this component open or closed
  toggle : function() {
    if (this.state.isOpen) {
      this.close();
    }
    else {
      this.open();
    }
  },

  // function to recalculate cached heights of header and content
  recalculate : function() {
    var container = this.refs.container.getDOMNode();
    var header = this.refs.header.getDOMNode();
    var content = this.refs.content.getDOMNode();
    var state = {};

    console.log("recalculating...");

    // new heights
    state.heightHeader = header.getBoundingClientRect().height;
    state.heightContent = content.getBoundingClientRect().height;

    // translate to new height if open
    // and set the new container height
    if (this.state.isOpen) {
      content.style.webkitTransform = "translate3d(0," + state.heightHeader + "px,0)";
      content.style.MozTransform    = "translate3d(0," + state.heightHeader + "px,0)";
      content.style.msTransform     = "translate3d(0," + state.heightHeader + "px,0)";
      content.style.OTransform      = "translate3d(0," + state.heightHeader + "px,0)";
      content.style.transform       = "translate3d(0," + state.heightHeader + "px,0)";

      container.style.height = state.heightHeader + state.heightContent + "px";
    }
    else {
      container.style.height = state.heightHeader + "px";
    }

    // cache new heights
    this.setState(state);
  },

  // render the header in a div with a particular class
  // allows the render function to be a little cleaner
  renderHeader : function() {
    return (
      <div ref="header" className={"panel3d-header " + this.props.className} onClick={this.toggle}>
        {this.props.title || ""}
      </div>
    );

  },

  // give children toggle and recalculate functions as props
  renderChildren : function() {
    return React.Children.map(this.props.children, function(child) {
      if (child && (child.type === Panel3d.type)) {
        console.log("adding props", child);
        return React.addons.cloneWithProps(child, { panelRecalculate : this.recalculate , panelToggle : this.toggle });
      }
      return child;
    }.bind(this))
  },

  // render everything
  render : function() {
    return (
      <div ref="container" className="panel3d-container">
        <div ref="content" className="panel3d-content">
          {this.renderChildren()}
        </div>
        {this.renderHeader()}
      </div>
    );
  }
})

module.exports = Panel3d;