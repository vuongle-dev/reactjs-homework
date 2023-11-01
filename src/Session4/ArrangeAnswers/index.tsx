import React, { BaseSyntheticEvent, ReactEventHandler } from "react";
import styles from "./ArrangeAnswers.module.css";
import { AiOutlineMore } from "react-icons/ai";

type Props = {};

type DnDState = {
  draggedFrom: number;
  draggedTo: number;
  isDragging: boolean;
  originalOrder: string[];
  updatedOrder: string[];
};

const initialDnDState = {
  draggedFrom: -1,
  draggedTo: -1,
  isDragging: false,
  originalOrder: [],
  updatedOrder: [],
};

const ArrangeAnswers = ({
  title,
  answerlist,
  style,
  questionnumber,
  register,
}: {
  title: string;
  answerlist?: string[];
  style?: React.CSSProperties;
  questionnumber: string;
  register: any;
}) => {
  const [list, setList] = React.useState(answerlist);
  const [dragAndDrop, setDragAndDrop] =
    React.useState<DnDState>(initialDnDState);

  // onDragStart fires when an element
  // starts being dragged
  const onDragStart = (event: BaseSyntheticEvent) => {
    const initialPosition = Number(event.currentTarget.dataset.position);

    list &&
      setDragAndDrop({
        ...dragAndDrop,
        draggedFrom: initialPosition,
        isDragging: true,
        originalOrder: list,
      });
  };

  // onDragOver fires when an element being dragged
  // enters a droppable area.
  // In this case, any of the items on the list
  const onDragOver = (event: BaseSyntheticEvent) => {
    // in order for the onDrop
    // event to fire, we have
    // to cancel out this one
    event.preventDefault();

    let newList = dragAndDrop.originalOrder;

    // index of the item being dragged
    const draggedFrom = dragAndDrop.draggedFrom;

    // index of the droppable area being hovered
    const draggedTo = Number(event.currentTarget.dataset.position);

    const itemDragged = newList[draggedFrom];
    const remainingItems = newList.filter(
      (item, index) => index !== draggedFrom
    );

    newList = [
      ...remainingItems.slice(0, draggedTo),
      itemDragged,
      ...remainingItems.slice(draggedTo),
    ];

    if (draggedTo !== dragAndDrop.draggedTo) {
      setDragAndDrop({
        ...dragAndDrop,
        updatedOrder: newList,
        draggedTo: draggedTo,
      });
    }
  };

  const onDrop = (event: BaseSyntheticEvent) => {
    setList(dragAndDrop.updatedOrder);
    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: -1,
      draggedTo: -1,
      isDragging: false,
    });
  };

  const onDragLeave = () => {
    setDragAndDrop({
      ...dragAndDrop,
      draggedTo: -1,
    });
  };

  return (
    <div className={styles.ArrangeAnswers} style={style}>
      {title}
      <ul>
        {list &&
          list.map((item, index) => (
            <li
              key={index}
              data-position={index}
              draggable
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDrop={onDrop}
              onDragLeave={onDragLeave}
              className={
                dragAndDrop && dragAndDrop.draggedTo === Number(index)
                  ? styles.dropArea
                  : ""
              }
            >
              <p>{item}</p>
              <AiOutlineMore />
              <input
                type="checkbox"
                value={index + 1 + "_" + item}
                {...register(questionnumber)}
                id={questionnumber + "-" + index}
                defaultChecked={true}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};
export default ArrangeAnswers;
