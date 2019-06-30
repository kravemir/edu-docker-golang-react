import * as React from "react";
import { withFormik } from "formik";
import * as Yup from "yup";

const isValid = errorList => !errorList || errorList.length === 0;

const BaseForm = ({
  values,
  submitCount,
  errors,
  handleChange,
  handleBlur,
  handleSubmit
}) => (
  <div className="todo-list-card card">
    <div className="card-header">Create new todo list</div>
    <div className="card-body">
      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <input
            type="text"
            value={values.name}
            className={`form-control ${
              isValid(errors.name) || !submitCount ? "" : "is-invalid"
            }`}
            name="name"
            placeholder="New todo-list name ..."
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          <div className="invalid-feedback">{errors.name}</div>
        </div>
        <button className="btn btn-primary">Create</button>
      </form>
    </div>
  </div>
);

const NewListSchema = Yup.object().shape({
  name: Yup.string().required("Name should not be empty.")
});

const FormikForm = withFormik({
  mapPropsToValues: () => ({ name: "" }),
  validationSchema: NewListSchema,
  handleSubmit: (values, { props, setSubmitting, resetForm }) => {
    setSubmitting(true);
    props
      .onCreate({
        name: values.name
      })
      .then(() => {
        setSubmitting(false);
        resetForm();
      });
  }
})(BaseForm);

export const TodoListForm = FormikForm;
