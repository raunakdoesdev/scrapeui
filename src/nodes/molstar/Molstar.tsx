/** React wrapper for Molstar
 * Forked heavily from https://github.com/samirelanduk/molstar-react */

import React, { useEffect, useRef, useState } from "react";
import { DefaultPluginSpec } from "molstar/lib/mol-plugin/spec";
import { DefaultPluginUISpec } from "molstar/lib/mol-plugin-ui/spec";
import { PluginContext } from "molstar/lib/mol-plugin/context";
import "molstar/build/viewer/molstar.css";
import { ParamDefinition } from "molstar/lib/mol-util/param-definition";
import { CameraHelperParams } from "molstar/lib/mol-canvas3d/helper/camera-helper";
import { createPluginUI } from "molstar/lib/mol-plugin-ui/index";

let plugin: PluginContext | null = null;

const Molstar = ({
  useInterface,
  pdbId,
  url,
  file,
  dimensions,
  className,
  showControls,
  showAxes,
}: {
  useInterface?: boolean;
  pdbId?: string;
  url?: string;
  file?: object;
  dimensions?: number[];
  showControls?: boolean;
  showAxes?: boolean;
  className?: string;
}) => {
  const parentRef = useRef(null);
  const canvasRef = useRef(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    (async () => {
      if (useInterface && parentRef.current) {
        const spec = DefaultPluginUISpec();
        spec.layout = {
          initial: {
            isExpanded: false,
            controlsDisplay: "reactive",
            showControls,
          },
        };
        plugin = await createPluginUI(parentRef.current, spec);
      } else {
        if (canvasRef.current && parentRef.current) {
          plugin = new PluginContext(DefaultPluginSpec());
          plugin.initViewer(canvasRef.current, parentRef.current);
          await plugin.init();
        }
      }
      if (!showAxes) {
        plugin?.canvas3d?.setProps({
          camera: {
            helper: {
              axes: {
                name: "off",
                params: {},
              },
            },
          },
        });
      }
      await loadStructure(pdbId, url, file, plugin);
      setInitialized(true);
    })();
    return () => {
      plugin = null;
    };
  }, []);

  useEffect(() => {
    if (!initialized) return;
    (async () => {
      await loadStructure(pdbId, url, file, plugin);
    })();
  }, [pdbId, url, file]);

  useEffect(() => {
    if (plugin) {
      if (!showAxes) {
        plugin.canvas3d?.setProps({
          camera: {
            helper: {
              axes: {
                name: "off",
                params: {},
              },
            },
          },
        });
      } else {
        plugin.canvas3d?.setProps({
          camera: {
            helper: {
              axes: ParamDefinition.getDefaultValues(CameraHelperParams).axes,
            },
          },
        });
      }
    }
  }, [showAxes]);

  const loadStructure = async (
    pdbId?: string,
    url?: string,
    file?: any,
    plugin?: PluginContext | null
  ) => {
    if (plugin) {
      plugin.clear();
      if (file) {
        const data = await plugin.builders.data.rawData({
          data: file.filestring,
        });
        const traj = await plugin.builders.structure.parseTrajectory(
          data,
          file.type
        );
        await plugin.builders.structure.hierarchy.applyPreset(traj, "default");
      } else {
        const structureUrl = url
          ? url
          : pdbId
          ? `https://files.rcsb.org/view/${pdbId}.cif`
          : null;
        if (structureUrl) {
          const data = await plugin.builders.data.download(
            { url: structureUrl },
            { state: { isGhost: true } }
          );
          let extension =
            structureUrl.split(".").pop()?.replace("cif", "mmcif") ?? "";
          if (extension.includes("?"))
            extension = extension.substring(0, extension.indexOf("?"));
          const traj = await plugin?.builders.structure.parseTrajectory(
            data as any,
            extension as any
          );
          await plugin.builders.structure.hierarchy.applyPreset(
            traj,
            "default"
          );
        }
      }
    }
  };

  const width = dimensions ? dimensions[0] : "100%";
  const height = dimensions ? dimensions[1] : "100%";

  if (useInterface) {
    return (
      <div style={{ position: "absolute", width, height, overflow: "hidden" }}>
        <div
          ref={parentRef}
          style={{ position: "absolute", left: 0, top: 0, right: 0, bottom: 0 }}
        />
      </div>
    );
  }

  return (
    <div
      ref={parentRef}
      style={{ position: "relative", width, height }}
      className={className || ""}
    >
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      />
    </div>
  );
};

export default Molstar;
