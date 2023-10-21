import React, { useState } from "react";
import * as API from "../../../utils/api";
import styled from "styled-components";

function ChangePassword() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const validatePassword = () => {
    if (newPassword !== confirmPassword) {
      setError("password is not confirmed");
      return false;
    }
    if (password === "") {
      setError("please input password");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validatePassword()) {
      try {
        const res = await API.patch("/users", {
          currentPassword: password,
          password: newPassword,
        });
        console.log(res.data);
        alert("update success");
      } catch (err) {
        alert(err);
      }
    } else {
      alert(error);
    }
  };

  return (
    <Container>
      <div>
        기존 비밀번호
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div>
        새 비밀번호
        <input
          id="newPassword"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>

      <div>
        새 비밀번호 확인
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <EditButton id="submit" onClick={handleSubmit}>
        수정하기
      </EditButton>
    </Container>
  );
}

const EditButton = styled.button`
  width: 80px;
  height: 30px;
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

const Container = styled.div`
  width: 700px;
  border: 2px solid #3e4e34;
  border-radius: 10px;
  padding: 20px 20px 20px 20px;
  margin: auto;
  margin-top: 200px;
  text-align: center;
`;

export default ChangePassword;
