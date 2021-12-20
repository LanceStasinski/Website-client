import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import classes from "./Contact.module.css";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Modal from "../../shared/components/UIElements/Modal";

interface ContactInput {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

const REST_API = process.env.REACT_APP_REST_API;

const Contact: React.FC = () => {
  const [showMessageSent, setShowMessageSent] = useState(false);
  const { isLoading, error, clearError, sendRequest } = useHttpClient();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ mode: "onChange" });

  const submitFormHandler = async (userData: ContactInput) => {
    try {
      const response = await sendRequest(
        `${REST_API}/contact`,
        "POST",
        JSON.stringify({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          message: userData.message,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      if (response.message === "Message recieved") {
        setShowMessageSent(true);
      }
    } catch (error) {}
  };

  const closeModalHandler = () => {
    setShowMessageSent(false);
  };

  const onSubmit: SubmitHandler<ContactInput> = (data) =>
    submitFormHandler(data);
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMessageSent}
        onCancel={closeModalHandler}
        footer={
          <div>
            <Button type="button">Okay</Button>
          </div>
        }
      >
        Your message has been recieved. Thank you!
      </Modal>
      <div className={classes["contact-wrapper"]}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Card className={classes["contact-card"]}>
          <div className={classes["contact-card-header"]}>
            <h2>Send Me A Message</h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              {...register("firstName", { required: true })}
              className={errors.firstName && classes["input-error"]}
            />
            {errors.firstName && <p>Please provide your first name.</p>}
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              {...register("lastName", { required: true })}
              className={errors.lastName && classes["input-error"]}
            />
            {errors.lastName && <p>Please provide your last name.</p>}
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              {...register("email", { required: true })}
              className={errors.email && classes["input-error"]}
            />
            {errors.email && <p>Please provide your email.</p>}
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              {...register("message", { required: true })}
              className={errors.message && classes["input-error"]}
            />
            {errors.message && <p>Please provide a message.</p>}

            <Button type="submit" disabled={!isValid}>
              SEND
            </Button>
          </form>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default Contact;
