import React, { useState, useEffect } from "react";
import * as API from "../../../utils/api";
import styled from "styled-components";

function AdminUserDB() {
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState("user");

  useEffect(() => {
    (async () => {
      try {
        const res = await API.get(`/admin/users/userRole/${role}`);
        setUsers(res.data);
      } catch (err) {
        alert(err);
      }
    })();
  }, [role]);

  const UserDB = ({ user }) => {
    return (
      <tr key={user.email}>
        <td>{user.email}</td>
      </tr>
    );
  };

  return (
    <Container>
      <InnerContainer>
        <label>
          <input
            type="radio"
            value="user"
            checked={role === "user"}
            onChange={(e) => {
              setRole("user");
            }}
          />
          User
        </label>
        <label>
          <input
            type="radio"
            value="supporter"
            checked={role === "support"}
            onChange={(e) => {
              setRole("support");
            }}
          />
          Supporter
        </label>
        <table>
          <thead>
            <tr>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return <UserDB user={user} />;
            })}
          </tbody>
        </table>
      </InnerContainer>
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

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export default AdminUserDB;
