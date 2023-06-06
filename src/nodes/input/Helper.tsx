import { Input, Segmented, Tooltip, Typography } from "antd";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { LoginOutlined, PicCenterOutlined } from "@ant-design/icons";
import type { NodeSetter } from "@oloren/core";
import { Button } from "molstar/lib/mol-plugin-ui/controls/common";

function RenderArgument({
  idx,
  name,
  render,
  setNode,
  callUpdate,
}: {
  idx: number;
  name: string;
  render: React.ReactNode;
  setNode: NodeSetter<any>;
  callUpdate: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const [mode, setMode] = useState<"node" | "input">("node");

  useLayoutEffect(() => {
    if (mode === "input" && ref.current) {
      setNode((nd) => {
        const newInputHandles = {
          ...(nd.input_handles ? nd.input_handles : {}),
          [idx.toString()]:
            3 +
            (ref.current?.offsetTop ?? 0) +
            (ref.current?.clientHeight ?? 0) / 2,
        };

        return {
          ...nd,
          input_handles: newInputHandles,
          num_inputs: Object.keys(newInputHandles).length,
        };
      });
      callUpdate();
    } else if (mode === "node") {
      setNode((nd) => {
        const newInputHandles = { ...(nd.input_handles ?? ({} as any)) };
        delete newInputHandles[idx.toString()];

        return {
          ...nd,
          input_handles: newInputHandles,
          num_inputs: Object.keys(newInputHandles).length,
        };
      });
    }
  }, [mode, ref]);

  return (
    <div tw="flex flex-row space-x-2 items-center w-full" ref={ref}>
      <Segmented
        className="nodrag"
        onClick={(e) => {
          e.stopPropagation();
        }}
        tw="pointer-events-auto cursor-pointer"
        size={"small"}
        value={mode}
        onChange={(m) => {
          setMode(m.toString() as "node" | "input");
        }}
        options={[
          {
            label: (
              <Tooltip title="External Input">
                <LoginOutlined tw="pt-[3px]" />
              </Tooltip>
            ),
            value: "input",
          },
          {
            label: (
              <Tooltip title="Hardcode">
                <PicCenterOutlined tw="pt-[3px]" />
              </Tooltip>
            ),
            value: "node",
          },
        ]}
      />
      <Typography.Text>{name}</Typography.Text>

      <div
        tw="items-center grow"
        style={{
          visibility: mode == "node" ? "visible" : "hidden",
        }}
      >
        {render}
      </div>
    </div>
  );
}

export default function RenderArguments({
  args,
  kwargs,
  setNode,
  callUpdate,
}: {
  args: { [key: string]: React.ReactNode };
  kwargs?: string[];
  setNode: NodeSetter<any>;
  callUpdate: () => void;
}) {
  const [kwargInputs, setKwargInputs] = useState<string[]>([]);
  return (
    <div tw="flex flex-col w-full space-y-2">
      {Object.keys(args).map((name, idx) => {
        const arg = args[name];
        return (
          <RenderArgument
            setNode={setNode}
            name={name}
            idx={idx}
            render={arg}
            callUpdate={callUpdate}
          />
        );
      })}
    </div>
  );
}
