"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const mapStateToProps = () => {
    return {
        foo: "baz"
    };
};
const Connected = react_redux_1.connect(mapStateToProps)((props) => {
    return <div>{props.item}</div>;
});
