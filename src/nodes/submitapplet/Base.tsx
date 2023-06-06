import { NodeProps } from "@oloren/core";
import React from "react";
import { Input } from "antd";

function Base({ node, setNode }: NodeProps<string>) {
  return (
    <Input
      value={node.data}
      tw="w-full"
      addonBefore={"Value to Submit"}
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
