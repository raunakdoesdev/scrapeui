import { NodeProps } from "@oloren/core";
import React, { useEffect } from "react";
import { Typography, Radio } from "antd";

function Base({ node, setNode }: NodeProps<string>) {
  return (
    <div>
      <Typography.Text className="font-bold">Draw Molecule</Typography.Text>
      <Radio.Group
        onChange={(e) => {
          setNode((nd) => ({
            ...nd,
            data: e.target.value,
          }));
        }}
        value={node.data}
      >
        <Radio value={1}>SMILES</Radio>
        <Radio value={2}>MOL File</Radio>
      </Radio.Group>
    </div>
  );
}

export default Base;
