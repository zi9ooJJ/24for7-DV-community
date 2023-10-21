import styled from "styled-components";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const checkList = [
  "가족구성원이 물건을 던지면서 위협적인 분위기를 조성했다.",
  "가족구성원과의 싸움으로 뺨을 맞는 등 상처나 타박상을 입었다.",
  "가족구성원이 발로 차거나 주먹으로 때렸다.",
  "가족구성원이 흉기를 사용하여 때렸다.",
  "가족구성원이 지르는 고함소리에 위협을 느꼈다.",
  "가족구성원이 다른 사람들 앞에서 자신을 비난했다.",
  "가족구성원이 말을 하지 않고 밖으로 나가버렸다.",
  "가족구성원에게 욕이나 인격적으로 무시하는 말을 들었다.",
  "가족구성원이 경제권을 쥐고 생활비등을 주려하지 않았다.",
  "가족구성원이 원하지 않은 성행위를 강요했다.",
];

const Result = ({ score }) => {
  const navigate = useNavigate();
  return (
    <>
      당신의 가정폭력 위험지수는 {score}점 입니다.
      <LinkButtonContainer>
        <LinkButton onClick={() => navigate("/counselingcenter")}>
          상담소 찾기
        </LinkButton>
      </LinkButtonContainer>
    </>
  );
};

function CheckboxList() {
  //   CheckboxList 배열 중 체크 된 요소를 관리
  const [checkedList, setCheckedList] = useState([]);
  // 체크된 상태를 파악
  const [isChecked, setIsChecked] = useState(false);

  const [score, setScore] = useState(0);

  const checkedListHandler = (value, isChecked) => {
    // 체크되어있지 않다면 새롭게 추가
    if (isChecked) {
      setCheckedList((prev) => [...prev, value]);
      return;
    }
    // 이미 체크되어있고 배열에 있다면 해당 배열에서 제거
    if (!isChecked && checkList.includes(value)) {
      setCheckedList((prev) => prev.filter((item) => item !== value));
      return;
    }
  };

  const checkHandler = (evt, value) => {
    setIsChecked(!isChecked);
    checkedListHandler(value, evt.target.checked);
    if (evt.target.checked) {
      setScore((prev) => prev + 1);
    }
    if (evt.target.checked === false) {
      setScore((prev) => prev - 1);
    }
  };

  const onSubmitHandler = useCallback(
    (evt) => {
      evt.preventDefault();
      //? 제출하면 체크박스 초기화되게 함. 안하는게 더 나을 것 같음.
      //? setCheckedList(checkedList.filter((list) => list === ""));
    },
    [checkedList]
  );

  const [isSubmit, setIsSubmit] = useState(false);

  const ResultComponent = useMemo(() => {
    return <Result score={score} />;
  }, [score]);

  return (
    <>
      <form onSubmit={onSubmitHandler}>
        {checkList.map((item, i) => (
          <ListWrapper key={i}>
            <input
              type="checkbox"
              id={item}
              checked={checkedList.includes(item)}
              onChange={(evt) => checkHandler(evt, item)}
            />
            <label htmlFor={item}>{item}</label>
          </ListWrapper>
        ))}
        <SubmitButtonWrapper>
          <SubmitButton onClick={() => setIsSubmit(true)}>
            제출하기
          </SubmitButton>
        </SubmitButtonWrapper>
        <ResultContainer>{isSubmit ? ResultComponent : null}</ResultContainer>
      </form>
    </>
  );
}

const ListWrapper = styled.div`
  margin-left: 25px;
  font-size: 20px;
`;

const SubmitButton = styled.button`
  width: 80px;
  height: 40px;
  /* margin: 20px; */
  color: #ffffff;
  background-color: #3e4e34;
  border-radius: 10px;
  cursor: pointer;
`;

const SubmitButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0 20px 0;
`;

const ResultContainer = styled.div`
  font-weight: bold;
  font-size: 20px;
  text-align: center;
  margin-bottom: 20px;
`;

const LinkButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 10px;
`;

const LinkButton = styled.button`
  width: 130px;
  height: 40px;
  color: #ffffff;
  background-color: #3e4e34;
  border-radius: 10px;
  cursor: pointer;
  display: inline-block;
`;

export default CheckboxList;
