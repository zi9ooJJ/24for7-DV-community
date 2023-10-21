import React, { useState, useEffect } from "react";
import * as API from "../../../utils/api";
import styled from "styled-components";

function AdminUserDB() {
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState("pending");

  useEffect(() => {
    (async () => {
      try {
        const res = await API.get(`/admin/users/userRole/${role}`);
        setUsers(res.data);
      } catch (err) {
        alert(err);
      }
    })();
  }, [role, users]);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await API.patch(`/admin/users/${e.target.value}`, {
        role: "support",
      });
      console.log(res.data.role);
      alert("Approve Success");
    } catch (err) {
      alert(err);
    }
  };

  const handleClick2 = async (e) => {
    e.preventDefault();
    try {
      const res = await API.delete(`/admin/users/${e.target.value}`);
    } catch (err) {
      alert(err);
    }
  };

  const UserDB = ({ user }) => {
    return (
      <tr key={user.email}>
        <td>{user.role}</td>
        <td>{user.email}</td>
        <Button value={user._id} onClick={handleClick}>
          가입 승인
        </Button>
        <Button value={user._id} onClick={handleClick2}>
          가입 거절
        </Button>
      </tr>
    );
  };

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Role</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return <UserDB user={user} />;
          })}
        </tbody>
      </table>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-flow: column wrap;
  width: 500px;
  border: 2px solid #3e4e34;
  border-radius: 10px;
  padding: 20px 20px 20px 20px;
  margin: auto;
  margin-top: 200px;
  align-items: center;
`;

const Button = styled.button`
  width: 100px;
  border-radius: 15px;
  background-color: #3e4e34;
  color: #ffffff;
`;

export default AdminUserDB;
