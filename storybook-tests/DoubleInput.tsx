import React from "react";

export interface DoubleInputProps {
  inputOne: string;
  inputTwo: string;
  onChange: (inputOne: string, inputTwo: string) => void;
}

export const DoubleInput = ({
  inputOne,
  inputTwo,
  onChange,
}: DoubleInputProps) => (
  <>
    <input
      type="text"
      value={inputOne}
      onChange={(e) => onChange(e.target.value, inputTwo)}
    />
    <input
      type="text"
      value={inputTwo}
      onChange={(e) => onChange(inputOne, e.target.value)}
    />
  </>
);
