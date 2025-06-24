"use client";

import { Button, FileInput, Label } from "flowbite-react";
import { DetailsLayout } from "./components/Accordion";
import readXlsxFile from "read-excel-file";
import { useState } from "react";

export default function Page() {
  const [file, setFile] = useState<File>();
  const [excelInfo, setExcelInfo] = useState<any[]>([]);
  const handleChange = (event: any) => {
    setFile(event.target.files[0]);
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (file) {
      const excelRows = await readXlsxFile(file);
      const headersArray = excelRows[14];
      let desiredData = excelRows.slice(18, 58);
      desiredData = desiredData.concat(excelRows.slice(71, 114));
      // console.log(headersArray);
      // excelRows[0].forEach((column) => {
      //   const necessaryInfo = (column as any as string).split(". ");
      //   let info = necessaryInfo[1] ?? necessaryInfo[0];
      //   if (info.indexOf("Siblings") > -1) {
      //     info = "Siblings";
      //   } else if (info.indexOf("Name of") > -1) {
      //     info = "Name";
      //   } else if (info.indexOf("only year") > -1) {
      //     info = "Year";
      //   } else if (info.indexOf("Height") > -1) {
      //     info = "Height (in Inches)";
      //   }
      //   headersArray.push(info);
      // });

      const unwantedKeys = ["Sl.No.", "HM", "Sta", "Con"];
      const excelData: any[] = [];
      for (let index1 = 1; index1 < desiredData.length; index1++) {
        const data: any = {};
        for (let index2 = 0; index2 < headersArray.length; index2++) {
          if (unwantedKeys.includes(headersArray.at(index2) as any as string))
            continue;
          data[headersArray.at(index2) as any as string] =
            desiredData[index1][index2];
        }
        excelData.push(data);
      }
      setExcelInfo(excelData);
    }
  };
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="md:w-1/2 lg:w-1/2 mx-auto sm:w-full xs:w-full">
        <form onSubmit={handleSubmit} className="w-full mb-8">
          <div className="mb-2 block">
            <Label htmlFor="file" value="Upload file" />
          </div>
          <div className="flex justify-between gap-1">
            <FileInput className="w-full" id="file" onChange={handleChange} />
            <Button pill gradientDuoTone="purpleToBlue" type="submit">
              Submit
            </Button>
          </div>
        </form>

        <DetailsLayout data={excelInfo} />
      </div>
    </main>
  );
}
