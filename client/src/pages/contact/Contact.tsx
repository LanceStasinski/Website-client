import React from "react";

import classes from './Contact.module.css';
import Button from "../../shared/components/FormElements/Button";

const Contact: React.FC = () => {
  return (
    <div>
      <h2>Contact me</h2>
      <form>
        <label htmlFor="first-name">First Name: </label>
        <input type='text' id='first-name' name='first-name' />
        <label htmlFor="last-name">Last Name: </label>
        <input type='text' id="last-name" name="last-name" />
        <label htmlFor="email">Email: </label>
        <input id="email" type='text' name='email' />
        <label htmlFor="message">Message: </label>
        <textarea id='message' name="message" />
        <Button type='submit' />
      </form>
    </div>
  )
}

export default Contact;