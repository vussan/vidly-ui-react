import React from "react";
const ListGroup = (props) => {
  const { items, selectedItem, valueProperty, textProperty, onSelectItem } =
    props;

  return (
    <ui className="list-group">
      {items.map((item) => (
        <li
          key={item[valueProperty]}
          onClick={() => onSelectItem(item)}
          className={
            item[valueProperty] === selectedItem[valueProperty]
              ? "list-group-item active"
              : "list-group-item"
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ui>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
