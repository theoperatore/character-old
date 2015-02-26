var React = require('react');

var Affix = React.createClass({
  getInitialState : function() {
    var state = {};
    state.isVisible = false;
    return state;
  },
  getDefaultProps : function() {
    var props = {};
    props.threshold = 50;
    return props;
  },
  componentDidMount: function () {
    document.addEventListener('scroll', this.handleScroll);
  },
  componentWillUnmount: function () {
    document.removeEventListener('scroll', this.handleScroll);  
  },

  handleScroll : function() {
    if (document.body.scrollTop >= this.props.threshold) {
      if (this.state.isVisible === true) return;

      this.setState({ isVisible : true });
    }
    else if (document.body.scrollTop < this.props.threshold) {
      if (this.state.isVisible === false) return;

      this.setState({ isVisible : false });
    }

  },
  render : function() {
    return (
      <div className={"header-affix" + (this.state.isVisible ? " affix" : "")} >
        {this.props.children}
      </div>
    )
  }
})

module.exports = Affix;