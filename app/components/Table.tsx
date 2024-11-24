import { Table } from "flowbite-react";
import { useEffect, useState } from "react";

export function DetailsContent({ data }: any) {
  const [object, setObject] = useState<any>({});
  useEffect(() => {
    let allKeys = Object.keys(data);
    allKeys.sort();
    let tempObj: any = {};
    allKeys.forEach((key) => {
      tempObj[key] = data[key];
    });
    setObject(tempObj);
  }, []);

  return (
    <div className="overflow-x-auto">
      <Table striped>
        <Table.Body className="divide-y">
          {Object.keys(object).map((key) => (
            <Table.Row
              key={key}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className=" text-gray-900 ">{key}</Table.Cell>
              <Table.Cell className="text-gray-900">
                {object[key]?.toString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
