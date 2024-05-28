import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {useContext,useEffect,useState} from "react";
import { DiaryDispatchContext, DiaryStateContext} from "../App"
import useDiary from "../hooks/useDiary";
import usePageTitle from "../hooks/usePageTitle";

const Edit = () => {
  const nav = useNavigate();
  const params = useParams();
  const { onDelete, onUpdate } = useContext(DiaryDispatchContext);
  const curDiaryItem = useDiary(params.id);
  usePageTitle(`${params.id}번 일기 수정`);
  
  const onClickDelete = () => {
    if (
      window.confirm("일기를 정말 삭제할까요? 다시 복구되지 않아요!")
      //확인을 누르면 true 반환 
    ) {
      // 일기 삭제 로직
      onDelete(params.id);
      nav("/", { replace: true });
    }
  };
  const onSubmit = (input) => {
    if (window.confirm("일기를 정말 수정할까요?")) {
      onUpdate(
        params.id,
        input.createdDate.getTime(),
        input.emotionId,
        input.content
      );
      nav("/", { replace: true });
    }
  };
  
  return (
    <div>
      <Header
        title={params.id+"번 일기 수정페이지입니다"}
        leftChild={<Button onClick={() => nav(-1)} text={"< 뒤로 가기"} />}
        rightChild = {<Button onClick={onClickDelete} text={"삭제하기"} type={"NEGATIVE"}></Button> }
      />
      <Editor  initData={curDiaryItem} onSubmit={onSubmit}/>
    </div>
  );
};

export default Edit;