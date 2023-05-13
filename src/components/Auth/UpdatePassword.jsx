'use client';

import { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import supabase from 'src/lib/supabase-browser';

const UpdatePasswordSchema = Yup.object().shape({
  password: Yup.string().required('Required'),
});

const UpdatePassword = () => {
  const [errorMsg, setErrorMsg] = useState(null);

  async function updatePassword(formData) {
    const { data, error } = await supabase.auth.updateUser({
      password: formData.password,
    });

    if (error) {
      setErrorMsg(error.message);
    }
  }

  return (
    <div>
      <h2>Update Password</h2>
      <Formik
        initialValues={{
          password: '',
        }}
        validationSchema={UpdatePasswordSchema}
        onSubmit={updatePassword}
      >
        {({ errors, touched }) => (
          <Form>
            <label htmlFor="email">New Password</label>
            <Field
              id="password"
              name="password"
              type="password"
            />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
            <button type="submit">
              Update Password
            </button>
          </Form>
        )}
      </Formik>
      {errorMsg && <div>{errorMsg}</div>}
    </div>
  );
};

export default UpdatePassword;
