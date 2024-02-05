import { useDrag, useDrop } from "react-dnd";

interface DragAndDropProps {
  children: React.ReactNode;
  id: string;
  index: number;
  handleListChange: (dragID: string, dropID: string) => void;
}

const DragAndDrop: React.FC<DragAndDropProps> = ({ children, id, handleListChange}) => {
  const [, drag] = useDrag(() => ({
    type: "DragAndDrop",
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
/*     end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        console.log(`You dropped ${item.id}!`);
      }
    }, */
  }));

  const [, drop] = useDrop({
    accept: "DragAndDrop",
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
    drop: (item, monitor) => {
      if (monitor.isOver()) {
        handleListChange((item as { id: string }).id, id);
      }
    },
  });

  return (
    <div ref={drag}>
      <div ref={drop}>{children}</div>
    </div>
  );
};

export default DragAndDrop;
