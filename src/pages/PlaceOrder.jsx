import React, { useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import PaymentOption from "./PaymentOption";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState("cod");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const baseClass = "border border-gray-300 rounded py-1.5 px-3.5 w-full";

  const formFields = [
    [
      { name: "firstName", placeholder: "First name", type: "text" },
      { name: "lastName", placeholder: "Last name", type: "text" },
    ],

    [{ name: "email", placeholder: "Email address", type: "email" }],

    [{ name: "street", placeholder: "Street", type: "text" }],

    [
      { name: "city", placeholder: "City", type: "text" },
      { name: "state", placeholder: "State", type: "text" },
    ],

    [
      { name: "zipcode", placeholder: "Zipcode", type: "number" },
      { name: "country", placeholder: "Country", type: "text" },
    ],

    [{ name: "phone", placeholder: "Phone", type: "number" }],
  ];

  const paymentMethods = [
    { id: "stripe", logo: assets.stripe_logo, label: null },
    { id: "razorpay", logo: assets.razorpay_logo, label: null },
    { id: "cod", logo: null, label: "CASH ON DELIVERY" },
  ];

  const handleSelectMethod = (id) => setSelectedMethod(id);

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px] ">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>

        {formFields.map((group, index) => (
          <div
            key={index}
            className={`flex ${group.length > 1 ? "gap-3" : ""}`}
          >
            {group.map(({ name, placeholder, type }) => (
              <input
                key={name}
                required
                name={name}
                value={formData[name]}
                onChange={onChangeHandler}
                className={baseClass}
                type={type}
                placeholder={placeholder}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <div className="text-xl sm:text-2xl my-3">
            <p>PAYMENT METHOD</p>
          </div>
          <div className="flex gap-3 flex-col lg:flex-row">
            {paymentMethods.map(({ id, logo, label }) => (
              <PaymentOption
                key={id}
                id={id}
                logo={logo}
                label={label}
                selectedMethod={selectedMethod}
                onSelect={handleSelectMethod}
              />
            ))}
          </div>
          <div className="w-full text-end mt-8">
            <button
              onClick={() => navigate("/orders")}
              className="bg-black text-white px-16 py-3 text-sm"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
