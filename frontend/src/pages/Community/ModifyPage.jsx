import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as API from "../../utils/api";
import styled from "styled-components";

const categories = [
  {
    title: "소통공감",
    _id: "641b4a5a3e01f8b6f21108fb",
  },
  {
    title: "좋은정보",
    _id: "641b4a543e01f8b6f21108f8",
  },
  {
    title: "고민거리",
    _id: "641b4a4c3e01f8b6f21108f5",
  },
];

function ModifyPages() {
  const navigate = useNavigate();
  const { _id } = useParams();

  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [categoryId, setCategoryId] = useState("641b4a5a3e01f8b6f21108fb");

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

  useEffect(() => {
    const fetchData = async () => {
      const res = await API.get(`/posts/${_id}`);
      setTitle(res.data.title);
      setCategoryId(res.data.categoryId);
      setContents(res.data.contents);
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {
    // console.log(title, content, categoryId)
    if (title.trim() === "") {
      alert("제목을 입력해주세요.");
      return;
    }

    if (contents.trim() === "") {
      alert("내용을 입력해주세요.");
      return;
    }
    try {
      const res = await API.patch(`/posts/${_id}`, {
        title,
        contents,
        categoryId,
      });
      alert(res.data.result);
      navigate(`/posts/${_id}`);
    } catch (error) {
      console.error("ErrorMessage :", error);
      if (error.response.status === 401) {
        alert("로그인 정보가 없습니다.");
        localStorage.removeItem("token", "role", "email");
        window.location.replace("/posts");
      } else {
        alert("이야기를 바꾸지 못했습니다.");
        window.location.assign("/posts");
      }
    }
  };

  return (
    <WriteContainer>
      <MainHead>{"이야기 바꾸기"}</MainHead>
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
          value={contents}
          placeholder={"본문"}
          onChange={(e) => {
            setContents(e.target.value);
          }}
        />
      </ContentWrap>
      <BottomWrap>
        <SubmitBtn onClick={handleSubmit}>수정하기</SubmitBtn>
        <SubmitBtn onClick={() => navigate(-1)}>취소하기</SubmitBtn>
      </BottomWrap>
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

const BottomWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  width: 200px;
`;

const SubmitBtn = styled.button`
  border: 1px solid lightgray;
  border-radius: 5px;
  background-color: white;
  &:active {
    background-color: lightgray;
  }
`;

export default ModifyPages;
