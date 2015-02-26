var React = require('react');

var EventListener = require('react-bootstrap/lib/utils/EventListener');
var Input = require('react-bootstrap/lib/Input');
var ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');
var Button = require('react-bootstrap/lib/Button');

// func that see if 
var targetInRoot = function(target, root) {
  while (target) {
    if (target === root) return true;
    target = target.parentNode;
  }
  return false;
}

var Rest = React.createClass({
  getInitialState : function() {
    var state = {};

    state.hps = 0;

    return (state);
  },
  componentDidMount: function () {

    // bind dom event listener
    this._onDOMClickListener = 
      EventListener.listen(document, "click", this.handleDOMClick);
  },
  handleDOMClick : function(e) {
    // close this popover if target click is not part of this element tree
    if (!targetInRoot(e.target, this.getDOMNode())) {
      this.props.close();
    }
  },
  handleChange : function(cmp, e) {
    var state = {};
    state[cmp] = e.target.value;
    this.setState(state);
  },

  // perform a long rest by clearing temp hps, maxing out hps, resetting used
  // class charges and spell slots, adding Floor(level / 2) hit dice to
  // charHitDiceCurrent, resetting death failures and successes
  handleLongRest : function() {
    var tmp = this.props.character;
    var path = "charDefenses.longrest";
    var hitdice = Math.floor(tmp.getIn(['charInfo', 'level']) / 2);

    hitdice += tmp.getIn(['charHitPoints', 'hitDiceCurrent']);

    //tmp['charHitPoints'].temporary = 0;
    //tmp['charHitPoints'].current = tmp['charHitPoints'].maximum;
    //tmp['charHitPoints']['hitDiceCurrent'] = Math.min(hitdice, tmp['charInfo']['level']);
    //tmp['charHitPoints']['deathSaves']['successes'] = 0;
    //tmp['charHitPoints']['deathSaves']['failures'] = 0;
    tmp = tmp.setIn(['charHitPoints', 'temporary'], 0);
    tmp = tmp.setIn(['charHitPoints', 'current'], tmp.getIn(['charHitPoints', 'maximum']));
    tmp = tmp.setIn(['charHitPoints', 'hitDiceCurrent'], Math.min(hitdice, tmp.getIn(['charInfo', 'level'])));
    tmp = tmp.setIn(['charHitPoints', 'deathSaves', 'successes'], 0);
    tmp = tmp.setIn(['charHitPoints', 'deathSaves', 'failures'], 0);

    // reset spell slots
    for (var i = 1; i < 10; i++) {
      //tmp['charSpells'][i]['used'] = 0;
      tmp = tmp.setIn(['charSpells', i, 'used'], 0);
    }

    // reset class charges
    for (var i = 0; i < tmp['charClassCharges']; i++) {
      //tmp['charClassCharges'][i].used = 0;
      tmp = tmp.setIn(['charClassCharges', i, 'used'], 0);
    }

    // save changes and close tab
    this.props.edit({ path : path, character : tmp });
    this.setState({ hps : 0 });

    // this causes an invariant violoation?
    //this.props.close();
  },

  // perform a short rest by adding the hps the user entered to the current hp,
  // sub 1 from charHitDiceCurrent, resetting death failures and successes
  handleShortRest : function() {
    var tmp = this.props.character;
    var path = "charDefenses.shortrest.";
    var val = parseInt(this.state.hps, 10);
    var curr = tmp.getIn(['charHitPoints', 'current']);
    var max = tmp.getIn(['charHitPoints', 'maximum']);
    var currhd = tmp.getIn(['charHitPoints', 'hitDiceCurrent']);

    if (tmp.getIn(['charHitPoints', 'hitDiceCurrent']) === 0) {
      alert("There's no will to rest!");
      return;
    }

    if (isNaN(val) || val === 0) return;

    // add to current hp
    //tmp['charHitPoints']['current'] += val;
    //tmp['charHitPoints']['current'] = Math.min(tmp['charHitPoints']['maximum'], tmp['charHitPoints']['current']);
    tmp = tmp.setIn(['charHitPoints', 'current'], Math.min(max, (curr + val)));

    // remove one from hit dice
    //tmp['charHitPoints']['hitDiceCurrent'] -= 1;
    tmp = tmp.setIn(['charHitPoints', 'hitDiceCurrent'], (currhd - 1));

    // death saves
    tmp = tmp.setIn(['charHitPoints', 'deathSaves', 'successes'], 0);
    tmp = tmp.setIn(['charHitPoints', 'deathSaves', 'failures'], 0);

    this.props.edit({ path: path, character : tmp });
    this.setState({ hps : 0 });
  },

  componentWillUnmount: function () {

    // unbind event listeners
    this._onDOMClickListener.remove();
  },
  render : function() {
    return (
      <div className="container-fluid">
        <p>{"Take a long rest and restore all hp, class charges, and spent utilities."}</p>
        <Button block bsStyle={"info"} onClick={this.handleLongRest}>Long Rest</Button>
        <p>{"Or, spend a hit dice to regain hp by entering the number of hp you regain per hit die spent."}</p>
        <Input type="number" value={this.state.hps} onChange={this.handleChange.bind(this, "hps")} />
        <Button block bsStyle={"info"} onClick={this.handleShortRest}>Short Rest</Button>
      </div>
    );
  }
})

module.exports = Rest;