import React, { useState, useMemo } from "react";
import * as API from "../../../utils/api";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

function MyPosts() {

	const navigate = useNavigate();
	const [ comments, setComments ] = useState([]);
	const [ posts, setPosts ] = useState([]);
	const [ visible, setVisible ] = useState('none');

	const getComments =  async (e) => {
	e.preventDefault();
	setVisible('댓글')

	try {
		const res = await API.get('/myreplies')
		setComments(res.data)
	} catch (error) {
			if (error.response.status === 401) {
				alert("로그인 정보가 없습니다.")
				localStorage.removeItem("token", "role", "email");
				window.location.replace('/posts')
			} else {
				alert("댓글을 불러오지 못했습니다.")
				window.location.reload()
			}
		}
	}

const getPosts = async (e) => {
	e.preventDefault();
	setVisible('게시글')

	try {
		const res = await API.get('/myposts')
		setPosts(res.data)
		console.log(res.data)
	} catch (error) {
			if (error.response.status === 401) {
				alert("로그인 정보가 없습니다.")
				localStorage.removeItem("token", "role", "email");
				window.location.replace('/posts')
			} else {
				alert("게시물을 불러오지 못했습니다.")
				window.location.reload()
			}
		}
	}


	return(
		<Container>
			<MainHead>My Page</MainHead>
			<MyPageWrap>
				<BtnWrap>
					<Btn onClick={getComments}>내가 쓴 댓글 보기</Btn>
					<Btn onClick={getPosts}>내가 쓴 게시글 보기</Btn>
				</BtnWrap>
					{ visible === '댓글'
					? (
						<Header>
							<HeaderLink>링크</HeaderLink>
							<HeaderContent>댓글 내용</HeaderContent>
							<HeaderDate>작성일</HeaderDate>
						</Header>
					)
					: ( visible === '게시글'
					? (
						<Header>
							<HeaderLink>링크</HeaderLink>
							<HeaderContent>카테고리</HeaderContent>
							<HeaderDate>이야기 제목</HeaderDate>
						</Header> )
						: <></>
					)}
				<Show >
						{ comments && visible === '댓글'
						? ( comments.map((comment, idx) => (
							<ShowWrap key={idx}>
								<ShowCommentsPost value={comment.postId} onClick={e => navigate(`/posts/${e.target.value}`)}>
									{`게시물 가기`}
								</ShowCommentsPost>
								<ShowContent>{comment.contents}</ShowContent>
								<ShowDate>{comment.createdAt.split("T")[0]}</ShowDate>
							</ShowWrap>))) 
						: ( posts && visible === '게시글' 
						? ( posts.map((post, idx) => (
							<ShowWrap key={idx}>
								<ShowCommentsPost value={post._id} onClick={e => navigate(`/posts/${e.target.value}`)}>
									{`게시물 가기`}
								</ShowCommentsPost>
								<ShowContent>{post.categoryId.title}</ShowContent>
								<ShowDate>{post.title}</ShowDate>
							</ShowWrap>)))
						: <></>
						)}
				</Show>
			</MyPageWrap>
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
`

const MainHead = styled.h1`
  text-align: center;
	margin: 80px 0 40px 0;
`;

const MyPageWrap = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: top;
	align-items: center;

	width: 1300px;
	height: auto;

	border: 1px solid lightgray;
`

const Header = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;

	margin: 0.5rem 0 0.5rem 0;
	padding-bottom: 1rem;
	

	width: 1080px;
	height: auto;

	border-bottom: 1px solid gray;
`

const BtnWrap = styled.div`
	display: flex;
	justify-content: center;

	width: 1080px;
	gap: 40px;

`

const Btn = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;

	margin: 30px 0 30px 0;

	width: 150px;
	height: 50px;

	background-color: white;
	border: 1px solid lightgray;
	border-radius: 5px;

	&:hover {
	background-color: #c5d4c6;
	cursor: pointer;
	}
`

const Show = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;

	width: 1200px;
	height: auto;
`

const ShowWrap = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;

	width: 90%;
	height: auto;
	margin: 0.5rem 0 0.5rem 0;

	border: 1px solid lightgray;
`

const ShowContent = styled.div`
	display: flex;
	justify-content: left;
	align-items: center;
	flex-grow: 2;
	
	margin: 0.5rem 1rem 0.5rem 1rem;


	width: 20rem;
	height: 30px;
`

const ShowDate = styled.div`
	display: flex;
	justify-content: right;
	align-items: center;
	flex-grow: 2;
	
	margin: 0.5rem 3rem 0.5rem 3rem;


	width: 10rem;
	height: 30px;
`

const ShowCommentsPost = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-grow: 0.5;

	margin: 0.5rem 3rem 0.5rem 3rem;

	margin-right: 10rem;
	height: 30px;

	text-decoration: none;
  color: darkblue;

	background-color : white;
	border: 1px solid lightgray;
	border-radius: 5px;
	&:hover {
		background-color: #c5d4c6;
		cursor: pointer;
	}
`

const HeaderLink = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-grow: 0.5;
	text-align: center;

	width: 8rem;
`

const HeaderContent = styled.div`
	display: flex;
	justify-content: left;
	align-items: center;
	flex-grow: 2;
	text-align: left;
	padding-left: 9.5rem;

	width: 20rem;
`

const HeaderDate = styled.div`
	display: flex;
	justify-content: right;
	align-items: center;
	flex-grow: 2;
	width: 10rem;

	padding-right: 4rem;
`

export default MyPosts;