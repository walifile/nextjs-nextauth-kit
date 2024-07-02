import React from "react";

const Label = ({ title }) => {
  return (
    <>
      <label className="block text-sm font-medium text-gray-600 py-1">
        {title}
      </label>
    </>
  );
};

export default Label;
