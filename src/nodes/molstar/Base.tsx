import { NodeProps } from "@oloren/core";
import { Input } from "antd";
import React from "react";

function Base({ node, setNode }: NodeProps<string>) {
  return (
    <Input
      value={typeof node.data === "string" ? node.data : ""}
      tw="w-full"
      addonBefore={"PDB ID"}
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
