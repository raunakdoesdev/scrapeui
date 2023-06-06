import { NodeProps } from "@oloren/core";
import { Typography } from "antd";
import React from "react";

export type InputData = {
  label?: string;
  placeholder?: string;
};

function InputBase({}: NodeProps<InputData>) {
  return (
    <div>
      <Typography.Text>Input</Typography.Text>
    </div>
  );
}

export default InputBase;
