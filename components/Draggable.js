import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export default function Draggable(props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    margin: 4,
    borderRadius: 4,
    border: "1px solid black",
    padding: 8,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <button
        type="button"
        {...attributes}
        {...listeners}
        style={{ touchAction: "none" }}
      >
        ...
      </button>
      {props.id}
      {props.children}
    </div>
  );
}
