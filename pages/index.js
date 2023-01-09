import { useState, useEffect } from "react";
import { DndContext } from "@dnd-kit/core";
import Droppable from "../components/Droppable";
import Draggable from "../components/Draggable";

function Dnd() {
  const [sheets, setSheets] = useState({
    "1-1": "1",
    "1-2": "2",
    "2-1": "3",
    "2-2": null,
  });

  const getOldPosition = (targetId) => {
    var position = null;
    Object.keys(sheets).forEach((aaa) => {
      if (sheets[aaa] === targetId) position = aaa;
    });
    return position;
  };

  const handleDragEnd = (event) => {
    setSheets({
      ...sheets,
      [event.over ? event.over.id : null]: event.active.id,
      [getOldPosition(event.active.id)]:
        sheets[event.over ? event.over.id : null],
    });
  };

  useEffect(() => {
    console.log(sheets);
  }, [sheets]);

  const style = {
    margin: 4,
    borderRadius: 4,
    border: "1px solid black",
    padding: 8,
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {Object.keys(sheets).map((sheet, index) => (
        <div key={index} style={style}>
          <Droppable id={sheet}>
            {sheet}

            {Object.values(sheets).map((people, index) =>
              people !== null && sheets[sheet] === people ? (
                <Draggable id={people} key={index} />
              ) : null
            )}
          </Droppable>
        </div>
      ))}
    </DndContext>
  );
}

export default dynamic(
  async () => {
    return Dnd;
  },
  { ssr: false }
);
