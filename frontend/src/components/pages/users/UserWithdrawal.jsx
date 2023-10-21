import React, { useState } from "react";
import * as API from "../../../utils/api";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function UserWithdrawal() {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.delete(`/users`);
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("email");
      console.log(res.data);
      navigate("/");
      window.location.reload();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <WithdrawalContainer>
      <Container>
        회원을 탈퇴하시겠습니까? 탈퇴시 본인이 작성한 게시글과 댓글 확인이
        어렵습니다.
        <BtnContainer>
          <input
            type="checkbox"
            label="회원을 탈퇴하시겠습니까?"
            onClick={handleClick}
          />
          {!isChecked ? (
            <button disabled>회원 탈퇴</button>
          ) : (
            <button onClick={handleSubmit}>회원 탈퇴</button>
          )}
        </BtnContainer>
      </Container>
    </WithdrawalContainer>
  );
}

const WithdrawalContainer = styled.div`
  width: 700px;
  border: 2px solid #3e4e34;
  border-radius: 10px;
  padding: 20px 20px 20px 20px;
  margin: auto;
  margin-top: 200px;
`;

const Container = styled.div`
  display: flex;
  flex-flow: column wrap;
  font-weight: bold;
  justify-content: center;
  align-items: center;
`;

const BtnContainer = styled.div`
  display: flex;
  gap: 5px;
`;

export default UserWithdrawal;
