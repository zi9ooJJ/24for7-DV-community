import React, { useState, useEffect, useMemo } from "react";
// import axios from 'axios';
import * as API from "../../utils/api";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Comment from "../../components/pages/community/postPage/Comment";

function PostPage() {
  const navigate = useNavigate();

  const { _id } = useParams();

  const [title, setTitle] = useState("제목");
  const [category, setCategory] = useState("말머리");
  const [content, setContent] = useState("내용");
  const [writer, setWriter] = useState("작성자");
  const [date, setDate] = useState("작성일");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await API.get(`/posts/${_id}`);
        setTitle(res.data.title);
        setCategory(res.data.categoryId.title);
        setContent(res.data.contents);
        setWriter(res.data.userId.role);
        setDate(res.data.createdAt.split("T")[0]);
      } catch (error) {
        console.error("ErrorMessage :", error);
        alert("이야기 불러오기에 실패했습니다.");
        navigate(`/posts`);
      }
    };
    fetchPost();
  }, [_id]);
  // useMemo(() => fetchPost(), [_id])

  const handleModify = () => {
    navigate(`/posts/modify/${_id}`);
  };

  const handleDelete = async () => {
    try {
      const res = await API.delete(`/posts/${_id}`);

      if (res.data) {
        alert("이야기가 정상적으로 삭제되었습니다.");
        navigate("/posts");
      }
    } catch (error) {
      console.error("ErrorMessage : ", error);
      alert(error);
      navigate(-1);
    }
    return;
  };

  return (
    <Container>
      <PostCotainer>
        <TitleWrap>
          <Category>{category}</Category>
          <Title>{title}</Title>
          <Writer>작성자 : {writer}</Writer>
          <Date>작성일 : {date}</Date>
        </TitleWrap>
        <ContentWrap>
          <Content>{content}</Content>
        </ContentWrap>
        <BottomWrap>
          <BtnWrap>
            <Btn onClick={() => navigate(-1)}>뒤로가기</Btn>
            <Btn onClick={handleModify}>수정하기</Btn>
            <Btn onClick={handleDelete}>삭제하기</Btn>
          </BtnWrap>
        </BottomWrap>
      </PostCotainer>
      <CommentContainer>
        <Comment post_id={_id} />
      </CommentContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PostCotainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin: 50px;

  width: 1210px;
  height: 800px;
  border: 1px solid lightgray;
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const TitleWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  margin-top: 20px;
  padding: 15px;

  border-bottom: 1px solid gray;
`;

const Category = styled.div`
  display: flex;
  margin-right: 15px;
  padding-left: 10px;
  line-height: 30px;

  font-size: 20px;
  width: 80px;
  height: 30px;
  border-right: 1px solid lightgray;
`;

const Title = styled.div`
  display: flex;
  margin-right: 15px;
  padding-left: 10px;
  line-height: 30px;

  font-size: 20px;

  width: 540px;
  height: 30px;
`;

const Writer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  width: 200px;
  height: 30px;
  padding-right: 15px;
  border-right: 1px solid lightgray;
`;

const Date = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  width: 170px;
  height: 30px;
`;

const ContentWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 15px;
`;

const Content = styled.div`
  display: flex;
  padding-left: 10px;

  font-size: 18px;

  width: 1000px;
  height: 600px;
`;

const BottomWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 0 15px 0 15px;

  width: 1012px;
  height: 50px;
`;

const BtnWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  width: 300px;
`;

const Btn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 75px;
  height: 30px;

  background-color: white;
  border-radius: 5px;
  border: 1px solid lightgray;

  &:active {
    background-color: lightgray;
  }
`;

export default PostPage;
