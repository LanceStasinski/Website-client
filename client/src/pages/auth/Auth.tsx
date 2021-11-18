import React, { useState, useRef, useContext, FormEvent } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import classes from "./Auth.module.css";
import { AuthContext } from "../../shared/context/auth-context";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import { useHttpClient } from "../../shared/hooks/http-hook";

interface LoginInput {
  username: string;
  password: string;
}

const REST_API = process.env.REACT_APP_REST_API;

const Auth: React.FC = () => {
  const authCtx = useContext(AuthContext);
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const switchViewHandler = () => {
    setIsLoggingIn((prevState) => !prevState);
  };

  const loginHandler = async (
    event: FormEvent,
    userData: { username: string; password: string; confirmPassword?: string }
  ) => {
    event.preventDefault();
    if (isLoggingIn) {
      try {
        const responseData = await sendRequest(
          `${REST_API}/auth/login`,
          "POST",
          JSON.stringify({
            username: userData.username,
            password: userData.password,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        authCtx.login(responseData.userId, responseData.token);
      } catch (error) {} //error caught by useHttpClient hook
    } else {
      try {
        const responseData = await sendRequest(
          `${REST_API}/auth/signup`,
          "POST",
          JSON.stringify({
            username: userData.username,
            password: userData.password,
            confirmPassword: userData.confirmPassword,
          }),
          {
            "Content-Type": "application/json"
          }
        );
        authCtx.login(responseData.userId, responseData.token)
      } catch (error) {}
    }
  };

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    watch,
  } = useForm({ mode: "onChange" });
  const password = useRef<any>();
  password.current = watch("password", "");
  const onSubmit: SubmitHandler<LoginInput> = (data) => console.log(data);
  return (
    <React.Fragment>
      <div className={classes.auth}>
        <Card className={classes["auth-card"]}>
          <div className={classes["auth-card-header"]}>
            <h2>{isLoggingIn ? "LOGIN" : "SIGNUP"}</h2>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={classes["auth-form"]}
          >
            <label htmlFor="username">Username</label>
            <input
              {...register("username", { required: true })}
              className={errors.username && classes["input-error"]}
            />
            {errors.username && <p>Username required.</p>}
            <label htmlFor="password">Password</label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              className={errors.username && classes["input-error"]}
            />
            {errors.password && <p>Password must be at least 6 characters.</p>}
            {!isLoggingIn && (
              <label htmlFor="confirmPassword">Confirm password</label>
            )}
            {!isLoggingIn && (
              <input
                type="password"
                {...register("confirmPassword", {
                  validate: (value) =>
                    value === password.current || "Passwords must match.",
                })}
              />
            )}
            {!isLoggingIn && errors.confirmPassword && (
              <p>{errors.confirmPassword.message}</p>
            )}
            <Button type="submit" onClick={onSubmit} disabled={!isValid}>
              submit
            </Button>
          </form>
        </Card>
        <Button
          inverse
          onClick={switchViewHandler}
          className={classes["switch-btn"]}
        >
          {isLoggingIn ? "SIGNUP" : "LOGIN"}
        </Button>
      </div>
    </React.Fragment>
  );
};

export default Auth;
