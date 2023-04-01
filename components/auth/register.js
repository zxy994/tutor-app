const { React, useState } = require('react');
const axios = require('axios');

const register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
    });

    const { name, email, password, password2 } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            console.log("Passwords do not match");
        } else {
            const newUser = {
                name,
                email,
                password,
            };
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                    },
                };
                const body = JSON.stringify(newUser);
                const res = await axios.post("/api/user/register", body, config);
                console.log(res.data);
            } catch (err) {
                console.log(err.response.data);
            }
        }
    };

    return React.createElement(
        "div",
        null,
        React.createElement("h1", null, "Register"),
        React.createElement(
            "form",
            { onSubmit: onSubmit },
            React.createElement(
                "div",
                null,
                React.createElement("label", null, "Name:"),
                React.createElement("br", null),
                React.createElement("input", {
                    type: "text",
                    name: "name",
                    value: name,
                    onChange: onChange,
                    required: true,
                })
            ),
            React.createElement(
                "div",
                null,
                React.createElement("label", null, "Email:"),
                React.createElement("br", null),
                React.createElement("input", {
                    type: "email",
                    name: "email",
                    value: email,
                    onChange: onChange,
                    required: true,
                })
            ),
            React.createElement(
                "div",
                null,
                React.createElement("label", null, "Password:"),
                React.createElement("br", null),
                React.createElement("input", {
                    type: "password",
                    name: "password",
                    value: password,
                    onChange: onChange,
                    minLength: "6",
                })
            ),
            React.createElement(
                "div",
                null,
                React.createElement("label", null, "Confirm Password:"),
                React.createElement("br", null),
                React.createElement("input", {
                    type: "password",
                    name: "password2",
                    value: password2,
                    onChange: onChange,
                    minLength: "6",
                })
            ),
            React.createElement("input", { type: "submit", value: "Register" })
        )
    );
}

module.exports = register