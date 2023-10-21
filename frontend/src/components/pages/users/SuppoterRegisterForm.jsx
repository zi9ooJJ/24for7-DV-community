import React, { useCallback, useState } from "react";
import DaumPost from "./DaumPostcode";
import PopupDom from "./PopupDom.jsx";
import * as API from "../../../utils/api";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function SuppoterRegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [zonecode, setZonecode] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const openPostcode = useCallback(() => {
    setIsPopupOpen(!isPopupOpen);
  }, [isPopupOpen]);

  const validateEmail = useCallback(() => {
    const emailForm = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    if (emailForm.test(email) == false) {
      setError("invalide Email Address");
      return false;
    }
    return true;
  }, [email]);

  const validatePassword = useCallback(() => {
    if (password !== confirmPassword) {
      setError("password is not confirmed");
      return false;
    }
    return true;
  }, [password, confirmPassword]);

  const validateForm = () => {
    return validateEmail() && validatePassword();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      role: "pending",
      email,
      password,
      userName: name,
      phoneNumber: phone,
      address: {
        zonecode,
        address,
        detailAddress,
      },
    };
    const validateResult = validateForm();
    if (validateResult) {
      try {
        const res = await API.post("/users", userData);
        console.log(res.data);
      } catch (err) {
        if (err.response) {
          alert(err.response.data);
          window.location.reload();
        } else {
          alert("회원가입에 실패했습니다.");
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
      <div>
        이름
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        연락처
        <input
          id="phone"
          type="text"
          placeholder="-없이 숫자로만 입력해 주세요"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div>
        주소
        <PostButton id="postcode" onClick={openPostcode}>
          우편번호 검색
        </PostButton>
        <div id="popupDom">
          {isPopupOpen && (
            <PopupDom>
              <DaumPost
                done={(data) => {
                  setZonecode(data.zonecode);
                  setAddress(data.address);
                  console.log(typeof (zonecode, address));
                }}
              />
            </PopupDom>
          )}
        </div>
        <input id="zonecode" value={zonecode} disabled />
        <input id="address" value={address} disabled />
        <input
          id="detailAddress"
          value={detailAddress}
          onChange={(e) => setDetailAddress(e.target.value)}
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

const PostButton = styled.button`
  border-radius: 15px;
  background-color: #3e4e34;
  color: #ffffff;
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

export default SuppoterRegisterForm;
