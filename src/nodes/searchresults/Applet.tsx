import { ApplicationProps } from "@oloren/core";
import React, { useEffect } from "react";
import { InputData } from "./Base";
import { Alert, Card, Checkbox, Progress, Typography } from "antd";
import { RobotOutlined } from "@ant-design/icons";

//  position, title, link, source, displayed_link, thumbnail, date, snippet, cached_page_link, about_page_link, related_pages_link, sitelinks:inline, sitelinks:expanded, rich_snippet:top, rich_snippet:bottom, rich_snippet_table, extensions, reviews, ratings, answers, related_questions

type SearchResults = {
  title: string;
  link: string;
  source: string;
  displayed_link: string;
  date: string;
  snippet: string;
  [key: string]: string;
}[];

type ModelRatings = {
  score: number;
  description: string;
}[];

function Applet({
  inputs,
  outputs,
  setOutputs,
}: ApplicationProps<InputData, [SearchResults, ModelRatings], [boolean[]]>) {
  useEffect(() => {
    setOutputs([inputs[1].map((rating) => rating.score > 5)]);
  }, []);

  return (
    <div tw="w-full flex flex-col space-y-2 max-h-[500px]" id="ignorechild">
      {inputs[0].length !== inputs[1].length ? (
        <Alert
          message="Warning: The number of search results and model ratings are not equal."
          type="warning"
          showIcon
        />
      ) : null}
      <div tw="w-full h-full overflow-auto max-h-full flex flex-col space-y-4">
        {inputs[0].map((result, idx) => (
          <div tw="flex flex-col space-y-1">
            <div tw="flex flex-row space-x-2">
              <Checkbox
                checked={outputs ? outputs[0][idx] : inputs[1][idx].score > 5}
                onChange={(e) => {
                  const newOutputs = [...(outputs ? outputs[0] : [])];
                  newOutputs[idx] = e.target.checked;
                  setOutputs([newOutputs]);
                }}
              />
              <Typography.Text tw="font-bold">{result.title}</Typography.Text>
              <Typography.Text tw="text-sm">
                {"| "} {result.source} -{" "}
              </Typography.Text>
              <Typography.Text tw="text-sm">{result.date}</Typography.Text>
            </div>
            <Typography.Text tw="text-sm">{result.snippet}</Typography.Text>
            <Alert
              icon={<RobotOutlined />}
              showIcon
              type="info"
              tw="w-full h-fit"
              description={
                <div tw="flex flex-col space-y-2">
                  <div tw="flex flex-row space-x-2">
                    <Typography.Text tw="font-bold whitespace-nowrap">
                      {inputs[1][idx].score}
                    </Typography.Text>
                    <Progress
                      percent={inputs[1][idx].score * 10}
                      success={{ percent: 0 }}
                      showInfo={false}
                    />
                  </div>
                  <Typography.Paragraph>
                    {inputs[1][idx].description}
                  </Typography.Paragraph>
                </div>
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Applet;
