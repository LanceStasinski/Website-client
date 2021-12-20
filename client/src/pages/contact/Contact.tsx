import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import classes from "./Contact.module.css";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";

interface ContactInput {
  first: string;
  last: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ mode: "onChange" });

  const submitFormHandler = async (userData: ContactInput) => {};
  const onSubmit: SubmitHandler<ContactInput> = (data) =>
    submitFormHandler(data);
  return (
    <div className={classes["contact-wrapper"]}>
      <Card className={classes["contact-card"]}>
        <div className={classes["contact-card-header"]}>
          <h2>Contact me</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="firstName"
            {...register("firstName", { required: true })}
            className={errors.firstName && classes['input-error']}
          />
          {errors.firstName && <p>Please provide your first name.</p>}
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="lastName"
            {...register("lastName", { required: true })}
            className={errors.lastName && classes['input-error']}
          />
          {errors.lastName && <p>Please provide your last name.</p>}
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register("email", { required: true })}
            className={errors.email && classes['input-error']}
          />
          {errors.email && <p>Please provide your email.</p>}
          <label htmlFor="message">Message</label>
          <textarea id="message" {...register("message", { required: true })}
          className={errors.message && classes['input-error']} />
          {errors.message && <p>Please provide a message.</p>}

            <Button type="submit" disabled={!isValid}>
              SEND
            </Button>

        </form>
      </Card>
    </div>
  );
};

export default Contact;
