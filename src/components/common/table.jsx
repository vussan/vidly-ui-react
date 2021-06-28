import React from "react";
import TableHead from "./tableHead";
import TableBody from "./tableBody";

const Table = (props) => {
  const { headers, items, onSort, sortColumn } = props;

  return (
    <table className="table">
      <TableHead columns={headers} onSort={onSort} sortColumn={sortColumn} />
      <TableBody items={items} columns={headers} />
    </table>
  );
};

export default Table;
