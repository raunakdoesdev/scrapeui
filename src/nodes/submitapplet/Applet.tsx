/**
 * This demonstrates the use of "done" functionality and also shows how we can use "hidden" applets
 * to execute some bare minimum backend-like code on the frontend.
 */

import React from "react";
import { ApplicationProps } from "@oloren/core";
import { useEffect } from "react";

function Applet({
  node,
  inputs,
  outputs,
  setOutputs,
  done,
}: ApplicationProps<string, [string], [string, string]>) {
  useEffect(() => {
    if (!outputs) setOutputs([inputs[0], node.data]);
    else done();
  }, [outputs]);

  return <p>You won't see this.'</p>;
}

export default Applet;
