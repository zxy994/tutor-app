const React = require('react');
const { Link } = require('react-router-dom');


const navbar = () => {
    return React.createElement(
        'nav',
        null,
        React.createElement(
            'ul',
            null,
            React.createElement(
                'li',
                null,
                React.createElement(
                    Link,
                    { to: '/' },
                    'Home'
                )
            ),
            React.createElement(
                'li',
                null,
                React.createElement(
                    Link,
                    { to: '/register' },
                    'Register'
                )
            ),
            React.createElement(
                'li',
                null,
                React.createElement(
                    Link,
                    { to: '/login' },
                    'Login'
                )
            )
        )
    );
}

module.exports = navbar;