import React, { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import classes from "./Auth.module.css";
import { AuthContext } from "../../shared/context/auth-context";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";

interface LoginInput {
  username: string;
  password: string;
}

const Auth: React.FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit: SubmitHandler<LoginInput> = (data) => console.log(data);
  return (
    <React.Fragment>
      <div className={classes.auth}>
        <Card className={classes["auth-card"]}>
          <div className={classes['auth-card-header']}>
            <h2>LOGIN</h2>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={classes["auth-form"]}
          >
            <label htmlFor="username">Username</label>
            <input {...register("username", { required: true })} />
            {errors.username && "Username required."}
            <label htmlFor="password">Password</label>
            <input id="password" type='password'/>
            <Button type="submit" onClick={onSubmit}>
              submit
            </Button>
          </form>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default Auth;
