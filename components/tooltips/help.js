var React = require('react');
var EventListener = require('react-bootstrap/lib/utils/EventListener');

// func that see if 
var targetInRoot = function(target, root) {
  while (target) {
    if (target === root) return true;
    target = target.parentNode;
  }

  return false;
}

var HelpTooltip = React.createClass({
  handleDOMClick : function(e) {

    // close this popover if target click is not part of this element tree
    if (!targetInRoot(e.target, this.getDOMNode())) {
      this.props.close();
    }
  },
  componentDidMount: function () {
    // bind dom event listener
    this._onDOMClickListener = 
      EventListener.listen(document, "click", this.handleDOMClick);
    
  },
  componentWillUnmount: function () {
    // unbind event listeners
    this._onDOMClickListener.remove();
  },
  render : function() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
})

module.exports = HelpTooltip;