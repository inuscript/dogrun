"use strict";
exports.__esModule = true;
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
var react_redux_1 = require("react-redux");
var ConnectedComponent = react_redux_1.connect(function () { return ({}); }, function () { return ({}); })(function (props) {
    return <div>
    <h2>Empty Props Connected Class</h2>
  </div>;
});
var Routing = function () { return (<react_router_dom_1.BrowserRouter>
    <react_router_dom_1.Route path="/connected" component={ConnectedComponent}/>
  </react_router_dom_1.BrowserRouter>); };
