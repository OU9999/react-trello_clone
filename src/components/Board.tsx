import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const BoardCard = styled.div`
  padding: 10px 20px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 550px;
`;

interface IBoardAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

const BoardArea = styled.div<IBoardAreaProps>`
  border-radius: 5px;
  padding: 20px 10px;
  padding-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.isDraggingOver
      ? "purple"
      : props.isDraggingFromThis
      ? "red"
      : "teal"};
  flex-direction: column;
  transition: background-color 0.3s ease-in-out;
`;

const Title = styled.h1`
  text-align: center;
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 18px;
`;

interface IBoardProps {
  toDos: string[];
  boardId: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  return (
    <Wrapper>
      <Droppable droppableId={boardId}>
        {(magic, snapshot) => (
          <BoardCard ref={magic.innerRef} {...magic.droppableProps}>
            <Title>{boardId}</Title>
            <BoardArea
              isDraggingOver={snapshot.isDraggingOver}
              isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            >
              {toDos.map((toDo, index) => (
                <DraggableCard key={toDo} index={index} toDo={toDo} />
              ))}
              {magic.placeholder}
            </BoardArea>
          </BoardCard>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
