import { Field, Form, Formik } from "formik";
import * as yup from "yup";

const FormSchema = yup.object().shape({
  email: yup.string().required("El campo email es requerido"),
  password: yup.string().required(),
});

export const LoginForm = () => {
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={FormSchema}
      onSubmit={startLogin}
    >
      {() => (
        <Form>
          <div className="form-group mb-3">
            <label htmlFor="email">Correo</label>
            <Field
              type="email"
              name="email"
              placeholder="correo@sena.edu.co"
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email">Contraseña</label>
            <Field
              type="password"
              name="password"
              placeholder="Contraseña"
            />
          </div>
          <button type="submit" className={`btn col-12 `}>
            Acceder
          </button>
        </Form>
      )}
    </Formik>
  );
};

const startLogin = async ({email, password}) => {
  let dataAuth = {
    institutional_email: email,
    password: password,
  };
  // "institutional_email": "almacen2023@sena.edu.co",
  // "password":"1234567891"
  try {
    let res = await fetch("http://localhost:4000/api/v1/auth/authenticate", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataAuth),
    });

    let data = await res.json();
    if (data.token) {
      console.log(data.token);
      alert(`Usuario logueado exitosamente! - Token: ${data.token}`);
      localStorage.setItem("token", data.token);
    } else {
      console.log("error");
      console.log(data);
      alert(data.message)
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
