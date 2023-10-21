import React, { useCallback, useEffect, useState } from "react";
import DaumPost from "./DaumPostcode";
import PopupDom from "./PopupDom.jsx";
import * as API from "../../../utils/api";
import styled from "styled-components";

function ChangeUserInfo() {
  const [users, setUsers] = useState([]);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [zonecode, setZonecode] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [error, setError] = useState("");

  const openPostcode = useCallback(() => {
    setIsPopupOpen(!isPopupOpen);
  }, [isPopupOpen]);

  useEffect(() => {
    API.get(`/users`)
      .then((res) => {
        setUsers(res.data);
        if (res.data.address) {
          setZonecode(res.data.address.zonecode);
          setAddress(res.data.address.address);
          setDetailAddress(res.data.address.detailAddress);
        }
      })
      .catch(() => alert("error"));
  }, []);

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
        const res2 = await API.patch("/users", {
          currentPassword: password,
          password: newPassword,
          phoneNumber: phone,
          address: {
            zonecode,
            address,
            detailAddress,
          },
        });
        console.log(res2.data);
        alert("update success");
      } catch (err) {
        console.log("hello");
        alert(err);
      }
    } else {
      alert(error);
    }
  };

  return (
    <Container>
      <div>
        이메일
        <input id="email" placeholder={users.email} disabled />
      </div>

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

      <div>
        이름
        <input id="username" placeholder={users.userName} disabled />
      </div>

      <div>
        연락처
        <input
          id="phone"
          type="text"
          placeholder={users.phoneNumber}
          value={users.phoneNumber}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div>
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
                }}
              />
            </PopupDom>
          )}
        </div>
        <input id="zonecode" placeholder={zonecode} value={zonecode} disabled />
        <input id="address" placeholder={address} value={address} disabled />
        <input
          id="detailAddress"
          placeholder={detailAddress}
          value={detailAddress}
          onChange={(e) => setDetailAddress(e.target.value)}
        />
      </div>

      <EditButton id="submit" onClick={handleSubmit}>
        수정하기
      </EditButton>
    </Container>
  );
}

const PostButton = styled.button`
  border-radius: 15px;
  background-color: #3e4e34;
  color: #ffffff;
`;

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

export default ChangeUserInfo;
