import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function AdminMain() {
  return (
    <Container>
      <Button>
        <StyledLink to="/admin/requestapprove">서포터 신청 승인</StyledLink>
      </Button>
      <Button>
        <StyledLink to="/admin/userdb">서포터 / 유저 관리</StyledLink>
      </Button>
    </Container>
  );
}

const Button = styled.button`
  width: 120px;
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

const Container = styled.div`
  display: flex;
  width: 700px;
  border: 2px solid #3e4e34;
  border-radius: 10px;
  padding: 20px 20px 20px 20px;
  margin: auto;
  margin-top: 200px;
`;

export default AdminMain;
