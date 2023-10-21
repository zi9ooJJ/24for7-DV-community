import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function UserInfo() {
  return (
    <Container>
      <Button>
        <StyledLink to="/users/changepassword">비밀번호 변경</StyledLink>
      </Button>

      <Button>
        <StyledLink to="/users/userwithdrawal">회원 탈퇴</StyledLink>
      </Button>

      <Button>
        <StyledLink to="/users/myposts">나의 활동 내역</StyledLink>
      </Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 700px;
  border: 2px solid #3e4e34;
  border-radius: 10px;
  padding: 20px 20px 20px 20px;
  margin: auto;
  margin-top: 200px;
`;

const Button = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 15px;
  background-color: #3e4e34;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  &:hover {
    color: #baeb34;
  }
`;

export default UserInfo;
