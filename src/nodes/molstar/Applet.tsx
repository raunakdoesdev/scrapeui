/**
 * This demonstrates the use of "done" functionality and also shows how we can use "hidden" applets
 * to execute some bare minimum backend-like code on the frontend.
 */

import { ApplicationProps } from "@oloren/core";
import Molstar from "./Molstar";
import React, { useEffect } from "react";

function Applet({ node, setOutputs }: ApplicationProps<string, [], []>) {
  useEffect(() => {
    setOutputs([]);
  }, []);

  return (
    <div tw="w-full h-[500px]">
      <Molstar pdbId={node.data} />
    </div>
  );
}

export default Applet;
