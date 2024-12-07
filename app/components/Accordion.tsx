import {
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitle,
  Button,
  Clipboard,
} from "flowbite-react";
import { DetailsContent } from "./Table";

export function DetailsLayout({ data }: { data: any[] }) {
  const stringifyRow = (object: any): string => {
    return Object.keys(object)
      .map((key) => `*${key}*: ${object[key]?.toString()}`)
      .join("\n");
  };
  const copyToClipboard = (object: any) => {
    navigator.clipboard.writeText(stringifyRow(object)).then();
  };

  return (
    <Accordion>
      {data.map((row, index) => (
        <AccordionPanel>
          <AccordionTitle>
            {index + 1}) {row["Name"]} - {row["Nakshatram"]} -{" "}
            {row["Year"] || "Not Given"}
          </AccordionTitle>
          <AccordionContent>
            <div className="flex flex-col">
              <DetailsContent data={row} />
              <Button
                className="w-1/2 my-4 mx-auto"
                gradientDuoTone="purpleToPink"
                onClick={() => copyToClipboard(row)}
              >
                Copy
              </Button>
            </div>
          </AccordionContent>
        </AccordionPanel>
      ))}
    </Accordion>
  );
}
