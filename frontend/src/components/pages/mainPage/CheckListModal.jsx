import styled from "styled-components";
import CheckboxList from "./CheckboxList";

function CheckListModal({ onClose }) {
  const handleClose = () => {
    onClose?.();
  };

  return (
    <Overlay>
      <ModalWrap>
        <CloseButton onClick={handleClose}>X</CloseButton>
        <TextContainer>
          <h2>나의 가정폭력 위험지수는?</h2>
          <h4>해당하는 내용을 선택 후 제출하기를 눌러보세요!</h4>
        </TextContainer>
        <CheckboxList />
      </ModalWrap>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 9999;
`;

const ModalWrap = styled.div`
  width: 650px;
  height: fit-content;
  border-radius: 15px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CloseButton = styled.div`
  float: right;
  width: 30px;
  height: 30px;
  margin: 20px;
  color: #ffffff;
  background-color: #3e4e34;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const TextContainer = styled.div`
  text-align: center;
`;

export default CheckListModal;
