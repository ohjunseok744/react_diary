import Header from "../components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";
import { useState,useContext } from "react";
import {DiaryStateContext} from "../App";

const getMonthlyData = (pivotDate, data) => {
  const beginTime = new Date(
    pivotDate.getFullYear(),
    //년도와 월을 가져온다 
    pivotDate.getMonth(),
    1,
    0,
    0,
    0
    //해당년월에 1일에 0시0분0초이다
  ).getTime();

  const endTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth() + 1,
    //다음달로 설정 다음달의 0일은 이번달에 마지막날이다 ㅎㅎ
    0,
    23,
    59,
    59
  ).getTime();

  return data.filter(
    (item) =>
      beginTime <= item.createdDate && item.createdDate <= endTime
  );
};


const Home = () => {
  const data = useContext(DiaryStateContext);
  const [pivotDate,setPivotDate] = useState(new Date());

  const monthlyData = getMonthlyData(pivotDate, data);
  console.log(monthlyData);
  //각원에 맞는 일기만 보여주는 렌더링 방식 이거는 백엔드가 안하네..?
  const onIncreaseMonth = () => {
    setPivotDate(
      new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1)
    );
  };

  const onDecreaseMonth = () => {
    setPivotDate(
      new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1)
    );
  };

  return <div>
    <Header 
    title={`${pivotDate.getFullYear()}년 ${
      pivotDate.getMonth() + 1
    }월
    `}
    leftChild={<Button onClick={onDecreaseMonth} text={"<"}/>}
    rightChild={<Button onClick={onIncreaseMonth} text={">"}/>}
    />
    <DiaryList data ={monthlyData}/>
  </div>;
};

export default Home;