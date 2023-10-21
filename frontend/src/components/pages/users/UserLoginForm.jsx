import React, { useState } from "react";
import * as API from "../../../utils/api";
import { useNavigate } from "react-router-dom";
import bgImg from "../../../images/user_back_image.png";
import styled from "styled-components";

function UserLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { email, password };
    try {
      const res = await API.post("/login", userData);
      if (res.data.role === "pending") {
        alert("관리자의 승인을 기다려주세요");
        navigate("/");
        window.location.reload();
      } else {
        localStorage.setItem("token", res.data.accessToken);
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("email", res.data.email);
        alert("로그인 성공 !");
        navigate("/");
        window.location.reload();
      }
    } catch (err) {
      if (err.response) {
        alert(err.response.data);
        window.location.reload();
      } else {
        alert("로그인에 실패했습니다.");
      }
    }
  };

  return (
    <BackgroundImgLayout>
      <LoginContainer>
        이메일
        <input
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        비밀번호
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <LoginButton onClick={handleSubmit}>로그인</LoginButton>
      </LoginContainer>
    </BackgroundImgLayout>
  );
}

const LoginButton = styled.button`
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

const LoginContainer = styled.div`
  width: 700px;
  border: 2px solid #3e4e34;
  border-radius: 10px;
  padding: 20px 20px 20px 20px;
  margin-top: 100px;
`;

const BackgroundImgLayout = styled.div`
  width: auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-image: url(${bgImg});
  background-size: cover;
  background-repeat: no-repeat;
`;

export default UserLoginForm;
