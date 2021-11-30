import React from "react";

let inputNumber = 0;

const InputFields: React.FC = () => {
  return (
    <div>
      <label htmlFor={`types${inputNumber}`}>Content Type:</label>
      <select name={`types${inputNumber}`} id={`types${inputNumber}`}>
        <option value="paragraph">Paragraph</option>
        <option value="image">Image</option>
        <option value="code">Code</option>
        <option value="heading">Heading</option>
      </select>
      <label htmlFor={`content${inputNumber}`}>Content:</label>
      <textarea name="content" id={`content${inputNumber}`} />
      <label htmlFor={`alt${inputNumber}`}>
        Alternative text (if applicable):
      </label>
      <input type="text" name={`alt${inputNumber}`} id={`alt${inputNumber}`} />
    </div>
  );
};

let refNumber = 0;
const ReferenceFields: React.FC = () => {
  return (
    <div>
      <label htmlFor={`authors${refNumber}`}>Authors:</label>
      <input
        name={`authors${refNumber}`}
        id={`authors${refNumber}`}
        type="text"
        placeholder="Last Name, First Initial., Last Name, First Initial."
      />
      <label htmlFor={`date${refNumber}`}>Date:</label>
      <input type='text' name={`date${refNumber}`} id={`date${refNumber}`} />
      <label htmlFor={`title${refNumber}`}>Title:</label>
      <input type='text' name={`title${refNumber}`} id={`title${refNumber}`} />
      <label htmlFor={`url${refNumber}`}>Url:</label>
      <input type='text' name={`url${refNumber}`} id={`url${refNumber}`} />
    </div>
  );
};
const CreatePost: React.FC = () => {
  const contentFields = [];
  const refFields = [];

  return (
    <form>
      <label htmlFor="title">Title:</label>
      <input type="text" name="title" id="title" />
      <label htmlFor="blurb">Blurb:</label>
      <textarea name="blurb" id="blurb" />
      <InputFields />
      <ReferenceFields />
    </form>
  );
};

export default CreatePost;
