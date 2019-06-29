import * as React from "react";
import { useState } from "react";
import Revalidation from "revalidation";

const getValue = e => e.target.value;

const isValid = errorList => errorList === null || errorList.length === 0;
const isNotEmpty = val => val.trim().length > 0;

const BaseForm = ({
  revalidation: {
    form,
    onChange,
    updateState,
    valid,
    submitted,
    errors,
    onSubmit
  },
  onSubmit: submitCb
}) => (
  <div className="todo-list-card card">
    <div className="card-header">Create new todo list</div>
    <div className="card-body">
      <form
        className="form"
        onSubmit={e => {
          e.preventDefault();
          onSubmit(({ form, valid }) =>
            valid
              ? submitCb(form)
              : console.log("something went wrong!", errors)
          );
        }}
        noValidate
      >
        <div className="form-group">
          <input
            type="text"
            value={form.name}
            className={`form-control ${
              isValid(errors.name) || !submitted ? "" : "is-invalid"
            }`}
            name="name"
            placeholder="New todo-list name ..."
            onChange={e => onChange("name", getValue(e))}
            required
          />
          <div className="invalid-feedback">{errors.name}</div>
        </div>
        <button className="btn btn-primary">Create</button>
      </form>
    </div>
  </div>
);

const validationRules = {
  name: [[isNotEmpty, "Name should not be  empty."]]
};

const RevalidationForm = Revalidation(BaseForm);

const initialState = {
  name: ""
};

export function TodoListForm({ onCreate }) {
  const [count, setCount] = useState(0);

  const onSubmit = form =>
    onCreate({
      name: form.name
    }).then(r => {
      setCount(count + 1);
    });

  return (
    <RevalidationForm
      key={count}
      rules={validationRules}
      onSubmit={onSubmit}
      initialState={initialState}
      validateSingle={false}
      validateOnChange={({ submitted }) => submitted}
    />
  );
}
