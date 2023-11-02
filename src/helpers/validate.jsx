export const isValid = (errors, touched, field) => {
  return errors[field] && touched[field]
    ? 'form-control is-invalid'
    : 'form-control';
};

export const ValidateMessage = ({ errors, touched, field }) => {
  return errors[field] && touched[field] ? (
    <div className="invalid-feedback">{errors[field]}</div>
  ) : (
    <div></div>
  );
};
