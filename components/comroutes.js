const React = require('react');
const { BrowserRouter, Route, Switch } = require('react-router-dom');
const navbar = require('./layouts/navbar');
const register = require('./auth/register');
const login = require('./auth/login');


const comRoutes = () => {
    return React.createElement(
        BrowserRouter,
        null,
        React.createElement(
            "div",
            null,
            React.createElement(navbar, null),
            React.createElement(
                Switch,
                null,
                React.createElement(Route, { path: "/api/user/register", component: register }),
                React.createElement(Route, { path: "/api/user/login", component: login })
            )
        )
    );
};

module.exports = comRoutes;