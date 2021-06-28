import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  getCellValue = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  render() {
    let { items, columns } = this.props;

    return (
      <tbody>
        {items.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => (
              <td key={column.path || column.key + item._id}>
                {this.getCellValue(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
