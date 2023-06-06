/**
 * This demonstrates the use of "done" functionality and also shows how we can use "hidden" applets
 * to execute some bare minimum backend-like code on the frontend.
 */

import React, { useState } from "react";
import { ApplicationProps } from "@oloren/core";
import { useEffect } from "react";
import { Alert, Typography, message } from "antd";

function Applet({
  node,
  inputs,
  outputs,
  setOutputs,
  done,
  useDynamicScript,
}: ApplicationProps<string, [], []>) {
  const { ready, errorLoading, window } = useDynamicScript(
    "/RDKit_minimal.js",
    true
  );

  useEffect(() => {
    setOutputs([]);
  }, []);

  return (
    <div tw="grid place-items-center" style={{ minHeight: "100px" }}>
      {errorLoading ? (
        <Alert type="error" message={"Error Loading RDKIT"} />
      ) : !ready ? (
        <Typography.Text>Loading Rdkit...</Typography.Text>
      ) : (
        <DisplayMol smiles={node.data} window={window} />
      )}
    </div>
  );
}

function DisplayMol({ smiles, window }: { smiles: string; window: any }) {
  const [svg, setSvg] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!window.RDKit) {
      console.log("RDKIT initter: ", window.initRDKitModule);
      window
        .initRDKitModule()
        .then(function (RDKit: any) {
          console.log("RDKit version: " + RDKit.version());
          window.RDKit = RDKit;
          setLoaded(true);
        })
        .catch((e: Error) => {
          console.log("Error loading rdkit: ", e);
        });
    }
  }, [window]);

  useEffect(() => {
    if (loaded && !svg) {
      const mol = window.RDKit.get_mol(smiles);
      const svg = mol.get_svg();
      console.log("SVG: ", svg);
      setSvg(svg);
      mol.delete();
    }
  }, [svg, loaded]);

  return !svg ? (
    <Typography.Text>Loading Rdkit...</Typography.Text>
  ) : (
    <div tw="w-fit h-[100px]" dangerouslySetInnerHTML={{ __html: svg }}></div>
  );
}

export default Applet;
