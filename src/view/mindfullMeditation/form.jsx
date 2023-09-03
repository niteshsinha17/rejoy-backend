"use client";
import { Container } from "@/components";
import RightImageSection from "@/components/rightImageSection";
import { useState } from "react";
import formImage from "../../../public/images/mindfull/formImg.jpg";

const Input = (props) => {
  return (
    <div>
      <input
        className="border-primaryBoder border-2 text-base px-4 py-2 rounded-md w-full"
        placeholder={props.placeholder}
        value={props.value}
        name={props.name}
        onChange={(e) => props.setValue(props.name, e.target.value)}
      />
      {props.error && <p className="text-danger text-xs">{props.error}</p>}
    </div>
  );
};

const Form = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    phone: "",
    error: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const handleChange = (name, value) => {
    setState({
      ...state,
      [name]: value,
      error: { ...state.error, [name]: "" },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // validate all inputs and set error
    let nameError = "";
    let emailError = "";
    let phoneError = "";

    if (state.name.trim().length === 0) {
      nameError = "Name is required";
    }

    if (state.email.trim().length === 0) {
      emailError = "Email is required";
    }

    if (state.phone.trim().length === 0) {
      phoneError = "Phone is required";
    }

    if (nameError || emailError || phoneError) {
      setState({
        ...state,
        error: { name: nameError, email: emailError, phone: phoneError },
      });
      return;
    }

    const url = `https://docs.google.com/forms/d/e/1FAIpQLSdhkECD0qcDuD9DlzulAHEvEW6L7EAz9YbuT_tenU5KGCaJMw/formResponse?usp=pp_url&entry.2145717900=${state.name}&entry.864753193=${state.email}&entry.1871404873=${state.phone}`;

    window.open(url, "_blank");
  };

  return (
    <Container>
      <RightImageSection
        custom={
          <form onSubmit={handleSubmit}>
            <h2 className="heading-2">Join the next live event</h2>
            <p className="body-1">
              Fill the given form and we will send the next event invitation
              before the event.
            </p>

            <div className="flex flex-col gap-2 mt-2">
              <Input
                placeholder="Name *"
                name="name"
                error={state.error.name}
                setValue={handleChange}
              />
              <Input
                placeholder="Email *"
                name="email"
                error={state.error.email}
                setValue={handleChange}
              />
              <Input
                placeholder="Phone Number *"
                name="phone"
                error={state.error.phone}
                setValue={handleChange}
              />
              <button
                type="submit"
                className="bg-primary text-white text-base px-4 py-2 rounded-md"
              >
                Submit
              </button>
            </div>
          </form>
        }
        img={formImage}
      />
    </Container>
  );
};

export default Form;
