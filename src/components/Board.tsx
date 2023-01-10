import { useRef } from "react";
import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IToDo, toDoState } from "../atoms";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const BoardCard = styled.div`
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 550px;
`;

interface IBoardAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

const BoardArea = styled.div<IBoardAreaProps>`
  height: 90%;
  border-radius: 5px;
  padding: 20px 10px;
  padding-top: 30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#dfe6e9"
      : props.isDraggingFromThis
      ? "#b2bec3"
      : "transparent"};
  flex-direction: column;
  transition: background-color 0.3s ease-in-out;
`;

const Title = styled.h1`
  text-align: center;
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 18px;
`;

const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
`;
interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
}

interface IForm {
  toDo: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [...allBoards[boardId], newToDo],
      };
    });
    setValue("toDo", "");
  };
  return (
    <Wrapper>
      <Droppable droppableId={boardId}>
        {(magic, snapshot) => (
          <BoardCard ref={magic.innerRef} {...magic.droppableProps}>
            <Title>{boardId}</Title>
            <Form onSubmit={handleSubmit(onValid)}>
              <input
                {...register("toDo", { required: true })}
                type="text"
                placeholder={`Add task on ${boardId}`}
              />
            </Form>
            <BoardArea
              isDraggingOver={snapshot.isDraggingOver}
              isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            >
              {toDos.map((toDo, index) => (
                <DraggableCard
                  key={toDo.id}
                  index={index}
                  toDoId={toDo.id}
                  toDoText={toDo.text}
                />
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
