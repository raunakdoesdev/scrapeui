import { NodeProps } from "@oloren/core";
import React from "react";
import { Input } from "antd";

function Base({ node, setNode }: NodeProps<string>) {
  return (
    <Input
      value={typeof node.data === "string" ? node.data : ""}
      tw="w-full"
      addonBefore={"SMILES"}
      onChange={(e) => {
        setNode((node) => ({
          ...node,
          data: e.target.value,
        }));
      }}
    />
  );
}

export default Base;
