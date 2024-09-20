import React from "react";

function Table({ tableheadings, tableData }) {
  return (
    <table className="w-full min-w-[640px] table-auto">
      <thead>
        <tr>
          {tableheadings.map((item, idx) => (
            <th
              key={idx}
              className="border-b border-blue-gray-50 py-3 px-6 text-left text-sm font-bold"
            >
              {item}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData?.map((item, indx) => (
          <tr key={indx}>
            {Array.from(Object.values(item)).map((itm, idx) => (
              <td key={idx} className="py-3 px-5 border-b border-blue-gray-50">
                {itm}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
