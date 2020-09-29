import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Form as FinalForm, Field } from "react-final-form";
import { useHistory } from "react-router-dom";
import { loginUser } from "../reducers/userReducer";
import {
  required,
  minLength,
  isEmail,
  composeValidators,
} from "../helpers/formValidatorHelper";

const Login = ({ loginUser, user }) => {
  const history = useHistory();

  useEffect(() => {
    if (user.data.username) {
      history.push("/");
    }
  }, []);

  const onSubmit = async ({ email, password }) => {
    await loginUser(email, password);
  };

  return (
    <div className="vh100 w100 fade-in relative">
      <div className="center login m8">
        <div className="w100 h100 r p24 mb8 bs-3 bg1">
          <h1 className="bold f24 mb56 mt32 text-center">
            PropertyInvestorDash
          </h1>
          <FinalForm
            onSubmit={onSubmit}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <h2 className="f16 mb8">Email</h2>
                <Field
                  name="email"
                  validate={composeValidators(isEmail, required)}
                >
                  {({ input, meta }) => (
                    <div className="relative">
                      <input
                        className="form-input mb24 w100"
                        placeholder="example@email.com"
                        type="email"
                        {...input}
                        required
                      />
                      {meta.error && meta.touched && (
                        <div className="form-error">{meta.error}</div>
                      )}
                    </div>
                  )}
                </Field>
                <h2 className="f16 mb8">Password</h2>
                <Field
                  name="password"
                  validate={composeValidators(required, minLength(3))}
                >
                  {({ input, meta }) => (
                    <div className="relative">
                      <input
                        className="form-input mb24 w100"
                        placeholder="Password"
                        type="password"
                        {...input}
                        required
                      />
                      {meta.error && meta.touched && (
                        <span className="form-error">{meta.error}</span>
                      )}
                    </div>
                  )}
                </Field>
                <button
                  className="form-button-p font-white bs-2 w100 pt8 pb8 r"
                  type="submit"
                >
                  Login
                </button>
              </form>
            )}
          />
        </div>
        <div className="mb8">Forgot your password?</div>
        <div>Try a demo account</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
