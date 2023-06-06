import { NodeProps } from "@oloren/core";
import React from "react";
import { Input, InputNumber, Select } from "antd";
import Helper from "./Helper";

export type InputData = {
  label?: string;
  placeholder?: string;
};

function InputBase({
  node,
  setNode,
  callAfterUpdateInpOuts,
}: NodeProps<InputData>) {
  const data = node.data as InputData;
  return (
    <div tw="flex flex-col space-y-2 w-[500px]">
      <Helper
        callUpdate={() => {
          if (callAfterUpdateInpOuts) callAfterUpdateInpOuts();
        }}
        setNode={setNode}
        args={{
          input: <Input />,
          blah: <InputNumber />,
          options: (
            <Select
              tw="w-full"
              options={[
                { label: "Option 1", value: "1" },
                { label: "Option 2", value: "2" },
                { label: "Option 3", value: "3" },
                { label: "Option 4", value: "4" },
              ]}
            />
          ),
        }}
      />
      {/* <Input
        value={data?.label}
        tw="w-full"
        addonBefore={"Label"}
        onChange={(e) => {
          setNode((node) => ({
            ...node,
            data: {
              ...node.data,
              label: e.target.value,
            },
          }));
        }}
      />
      <Input
        value={data?.placeholder}
        addonBefore={"Placeholder"}
        onChange={(e) => {
          setNode((node) => ({
            ...node,
            data: {
              ...node.data,
              placeholder: e.target.value,
            },
          }));
        }}
      /> */}
    </div>
  );
}

export default InputBase;
