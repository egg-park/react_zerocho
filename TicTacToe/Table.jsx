import React, { memo } from "react";
import Tr from "./Tr";

const Table = memo(({ onClick, tableData, dispatch }) => {
  return (
    <table>
      <tbody>
        {Array(tableData.length)
          .fill()
          .map((tr, i) => (
            <Tr
              key={i}
              rowIndex={i}
              rowData={tableData[i]}
              dispatch={dispatch}
            />
          ))}
      </tbody>
    </table>
  );
});

export default Table;
