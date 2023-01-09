import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{ isDragging: boolean }>`
  padding: 30px;
  border-radius: 5px;
  background-color: ${(props) =>
    props.isDragging ? "tomato" : props.theme.cardColor};
  margin-bottom: 5px;
  width: 100%;
`;

interface IDragCardProps {
  toDo: string;
  index: number;
}
function DraggableCard({ toDo, index }: IDragCardProps) {
  return (
    <Draggable key={toDo} draggableId={toDo} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {toDo}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
