import styled from "styled-components";
import mainImg from "../images/main_image.png";
import CheckListModal from "../components/pages/mainPage/CheckListModal";
import { useState } from "react";

function MainPage() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const onModal = () => {
    setModalIsOpen(true);
  };

  const offModal = () => {
    setModalIsOpen(false);
  };

  return (
    <Container>
      <ButtonWrapper>
        <StyledButton onClick={onModal}>가정폭력 체크리스트</StyledButton>
        {modalIsOpen && (
          <CheckListModal open={modalIsOpen} onClose={offModal} />
        )}
      </ButtonWrapper>
      <ImgWrapper>
        <img src={mainImg} alt="메인 이미지" />
      </ImgWrapper>
    </Container>
  );
}

const ImgWrapper = styled.div`
  display: flex;
  height: 70vh;
  justify-content: center;
  margin-top: 50px;
`;

const ButtonWrapper = styled.div`
  margin-left: 100px;
  margin-top: 700px;
  margin-right: 200px;
`;

const StyledButton = styled.button`
  width: 150px;
  height: 40px;
  color: #ffffff;
  background-color: #3e4e34;
  border-radius: 10px;
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default MainPage;
