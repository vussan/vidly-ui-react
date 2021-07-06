import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = { data: {}, errors: {} };

  validate = () => {
    const errors = {};
    const { error } = Joi.validate(this.state.data, this.schema, {
      abortEarly: false,
    });
    if (!error) return null;

    error.details.forEach((x) => {
      errors[x.path] = x.message;
    });
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const object = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(object, schema);

    if (!error) return null;

    return error.details[0].message;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();

    if (errors) {
      this.setState({ errors });
      return;
    }
    this.doSubmit();
  };

  handleChange = (e) => {
    const { data, errors } = { ...this.state };
    const errorMessage = this.validateProperty(e.currentTarget);
    if (errorMessage) errors[e.currentTarget.name] = errorMessage;
    else delete errors[e.currentTarget.name];

    data[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ data, errors });
  };

  renderButton(label) {
    return (
      <button className="btn btn-primary" disabled={this.validate()}>
        {label}
      </button>
    );
  }

  renderInput(label, name, type) {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        value={data[name]}
        label={label}
        type={type}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderSelect(label, name, items) {
    const { data, errors } = this.state;
    return (
      <Select
        label={label}
        value={data[name]}
        name={name}
        items={items}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;
