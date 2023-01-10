import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{ isDragging: boolean }>`
  padding: 30px;
  border-radius: 5px;
  background-color: ${(props) =>
    props.isDragging ? "#74b9ff" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0,0,0,0.05)" : "none"};
  margin-bottom: 5px;
  width: 100%;
`;

interface IDragCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}

function DraggableCard({ toDoId, toDoText, index }: IDragCardProps) {
  return (
    <Draggable draggableId={toDoId + ""} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
