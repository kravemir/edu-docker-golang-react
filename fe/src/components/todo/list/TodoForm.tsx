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
  <form className="form" onSubmit={handleSubmit} noValidate>
    <div className="form-group">
      <textarea
        className={`form-control ${
          isValid(errors.content) || !submitCount ? "" : "is-invalid"
        }`}
        name="content"
        rows={3}
        placeholder="Content ..."
        value={values.content}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <div className="invalid-feedback">{errors.content}</div>
    </div>
    <button type="submit" className="btn btn-primary">
      Add
    </button>
  </form>
);

const NewTodoSchema = Yup.object().shape({
  content: Yup.string().required("Content should not be empty.")
});

const FormikForm = withFormik({
  mapPropsToValues: () => ({ content: "" }),
  validationSchema: NewTodoSchema,
  handleSubmit: (values, { props, setSubmitting, resetForm }) => {
    setSubmitting(true);
    props
      .onCreate({
        content: values.content
      })
      .then(result => {
        setSubmitting(false);
        resetForm();
      });
  }
})(BaseForm);

export const TodoForm = FormikForm;
