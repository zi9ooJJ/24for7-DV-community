import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as API from "../../utils/api";
import styled from "styled-components";

const categories = [
  { title: "소통공감", _id: "641b4a5a3e01f8b6f21108fb" },
  { title: "좋은정보", _id: "641b4a543e01f8b6f21108f8" },
  { title: "고민거리", _id: "641b4a4c3e01f8b6f21108f5" },
];

function PostingPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("641b4a5a3e01f8b6f21108fb");

  const navigate = useNavigate();

  const CategoryContainer = ({ categories }) => {
    const handleCategory = (e) => {
      setCategoryId(e.target.value);
    };

    return (
      <CategorySelector value={categoryId} onChange={handleCategory}>
        {categories.map((category, idx) => (
          <option key={idx} value={category._id}>
            {category.title}
          </option>
        ))}
      </CategorySelector>
    );
  };

  const handleSubmit = async () => {
    // console.log(title, content, categoryId)
    if (title.trim() === "") {
      alert("제목을 입력해주세요.");
      return;
    }

    if (content.trim() === "") {
      alert("내용을 입력해주세요.");
      return;
    }
    try {
      const res = await API.post("/posts", {
        title: title,
        contents: content,
        categoryId: categoryId,
      });
      if (res.data) {
        alert("이야기가 정상적으로 등록되었습니다.");
        navigate("/posts");
      }
    } catch (error) {
      console.error("ErrorMessage :", error);

      if (error.response.status === 401) {
        alert("로그인 정보가 없습니다.");
        localStorage.removeItem("token", "role", "email");
        window.location.replace("/posts");
      } else {
        alert("이야기 등록을 하지 못했습니다.");
        window.location.assign("/posts");
      }
    }
  };

  return (
    <WriteContainer>
      <MainHead>{"이야기 전달"}</MainHead>
      <TitleWrap>
        <CategoryContainer categories={categories} />
        <TitleInput
          type="text"
          value={title}
          placeholder={"제목"}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </TitleWrap>
      <ContentWrap>
        <ContentInput
          type="text"
          value={content}
          placeholder={"본문"}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
      </ContentWrap>
      <SubmitBtn onClick={handleSubmit}>{"등록하기"}</SubmitBtn>
    </WriteContainer>
  );
}

const WriteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainHead = styled.h1`
  text-align: center;
  margin-top: 50px;
`;

const TitleWrap = styled.div`
  display: flex;
  margin: 30px 0 10px 0;
`;

const CategorySelector = styled.select`
  width: 80px;
  margin-right: 15px;
`;

const TitleInput = styled.input`
  width: 705px;
  height: 30px;
  padding-left: 5px;
`;

const ContentWrap = styled.div`
  display: flex;
  margin: 15px;
`;

const ContentInput = styled.input`
  width: 800px;
  height: 400px;
  padding-left: 5px;
`;

const SubmitBtn = styled.button`
  border: 1px solid lightgray;
  border-radius: 5px;
  background-color: white;
  &:active {
    background-color: lightgray;
  }
`;

export default PostingPage;
