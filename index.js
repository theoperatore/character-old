var React = require('react');
var Page = require('page');

// config? and preferences?
require('fastclick')(document.body);
React.initializeTouchEvents(true);

// main views
var App = require('./app');
var Any = require('./views/any');
var Login = require('./views/login');
var Signup = require('./views/signup');


Page('/', render.bind(this, "app"));
Page('/signup/:charName?', render.bind(this, "signup"));
Page('/login/:charName?', render.bind(this, "login"));
Page('/character/:profile?/:name?', render.bind(this, "app"));
//Page('*', render.bind(this, "any"));
Page({
  hashbang : true
});

function render(dir, ctx) {
  switch (dir) {
    case "login": React.render(<Login characterName={ctx.params.charName}/>, document.body); break;
    case "signup": React.render(<Signup characterName={ctx.params.charName} />, document.body); break;
    case "app": React.render(<App profile={ctx.params.profile} characterId={ctx.params.name} />, document.body); break;
    case "any" : React.render(<Any /> , document.body); break;
    default: break;
  }
}