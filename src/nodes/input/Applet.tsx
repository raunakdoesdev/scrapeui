import { ApplicationProps } from "@oloren/core";
import React, { useEffect } from "react";
import { InputData } from "./Base";
import { Input } from "antd";

function Applet({
  outputs,
  setOutputs,
}: ApplicationProps<InputData, [], [string]>) {
  return (
    <div tw="w-full">
      <Input
        tw="w-full"
        value={outputs ? outputs[0] : ""}
        onChange={(e) => setOutputs([e.target.value])}
      />
    </div>
  );
}

export default Applet;
