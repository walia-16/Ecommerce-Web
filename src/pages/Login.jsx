import React, { useState } from "react";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  };

  const inputFields = [
    { name: "name", type: "text", placeholder: "Name", show: currentState === "Sign Up",},
    { name: "email", type: "email", placeholder: "Email", show: true },
    { name: "password", type: "password", placeholder: "Password", show: true },
  ];
  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 mx-auto mt-14 gap-4 text-gray-800"
    >
      <div className="flex items-center gap-2 mb-2 mt-10">
        <p className="text-3xl">{currentState}</p>
        <hr className="h-[1.5px] w-8 bg-gray-800" />
      </div>

      {inputFields.map(({ name, type, placeholder, show }) =>
        show ? (
          <input
            key={name}
            onChange={handleChange}
            value={formData[name]}
            name={name}
            type={type}
            className="w-full px-3 py-2 border border-gray-800"
            placeholder={placeholder}
            required
          />
        ) : null
      )}
      <div className="w-full flex justify-between text-sm">
        <p className="cursor-pointer">Forgot your password?</p>
        <p
          onClick={() =>
            setCurrentState(currentState === "Login" ? "Sign Up" : "Login")
          }
          className="cursor-pointer"
        >
          {currentState === "Login" ? "Create account" : "Login Here"}
        </p>
      </div>

      <button className="bg-black text-white font-light px-8 py-2 mt-4">
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
