import React, { useState } from "react";
import * as API from "../../../utils/api";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function UserRegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = () => {
    const emailForm = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    if (emailForm.test(email) == false) {
      setError("invalide Email Address");
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    if (password !== confirmPassword) {
      setError("password is not confirmed");
      return false;
    }
    return true;
  };

  const validateForm = () => {
    return validateEmail() && validatePassword();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      role: "user",
      email,
      password,
    };
    const validateResult = validateForm();
    if (validateResult) {
      try {
        const res = await API.post("/users", userData);
        console.log(res.data);
        const res2 = await API.post("/login", userData);
        localStorage.setItem("token", res2.data.accessToken);
        localStorage.setItem("role", res2.data.role);
        localStorage.setItem("email", res2.data.email);
        navigate("/");
        window.location.reload();
      } catch (err) {
        if (err.response) {
          alert(err.response.data)
          window.location.reload();
        } else {
          alert("회원가입 실패했습니다.")
        }
      }
    } else alert(error);
  };

  return (
    <RegisterContainer>
      <div>
        이메일
        <input
          id="email"
          value={email}
          placeholder="abc@abc.com"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        비밀번호
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        비밀번호 확인
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <RegisterButton onClick={handleSubmit}>가입하기</RegisterButton>
    </RegisterContainer>
  );
}

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const RegisterButton = styled.button`
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

export default UserRegisterForm;
