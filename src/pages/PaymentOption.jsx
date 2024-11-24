import React from "react";

const PaymentOption = ({ id, logo, label,selectedMethod, onSelect }) => {
  const isSelected = selectedMethod === id;
  const className = `min-w-3.5 h-3.5 border rounded-full ${
    isSelected ? "bg-green-400" : ""
  }`;
  return (
    <div
      onClick={() => onSelect(id)}
      className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
    >
      <p className={className}></p>
      {logo ? (
        <img className="h-5 mx-4" src={logo} alt={id} />
      ) : (
        <p className="text-gray-500 text-sm font-medium mx-4">{label}</p>
      )}
    </div>
  );
};

export default PaymentOption;
