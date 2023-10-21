import React, { useState } from "react";
import UserRegisterForm from "../components/pages/users/UserRegisterForm";
import SuppoterRegisterForm from "../components/pages/users/SuppoterRegisterForm";
import styled from "styled-components";
import bgImg from "../images/user_back_image.png";

function Register() {
  const [selected, setSelected] = useState("user");

  const handleRadioButton = (e) => {
    setSelected(e.target.value);
  };

  return (
    <BackgroundImgLayout>
      <RegisterContainer>
        <label>
          <input
            type="radio"
            value="user"
            checked={selected === "user"}
            onChange={handleRadioButton}
          />
          User
        </label>
        <label>
          <input
            type="radio"
            value="supporter"
            checked={selected === "supporter"}
            onChange={handleRadioButton}
          />
          Supporter
        </label>
        {selected === "user" && <UserRegisterForm />}
        {selected === "supporter" && <SuppoterRegisterForm />}
      </RegisterContainer>
    </BackgroundImgLayout>
  );
}

const RegisterContainer = styled.div`
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

export default Register;
