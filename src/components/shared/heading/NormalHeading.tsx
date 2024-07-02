import React from "react";

interface NormalHeadingProps {
  title: string;
}

const NormalHeading: React.FC<NormalHeadingProps> = ({ title }) => {
  return (
    <>
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        {title}
      </h2>
    </>
  );
};

export default NormalHeading;
