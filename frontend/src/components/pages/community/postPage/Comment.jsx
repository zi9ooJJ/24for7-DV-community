import React, { useState, useEffect, useMemo, useCallback } from 'react';
import * as API from '../../../../utils/api';
import styled from 'styled-components';

const CommentList = ({commentList}) => {

	const handleDelete = useCallback( async (e) => {
		
		try {
			const res = await API.delete(`/replies/${e.target.value}`)
			if (res.data.result) {
				alert(res.data.result)
				window.location.reload();
			}
		} catch (error) {
				console.error("ErrorMessage :", error)
					if (error.response.status === 401) {
						alert("로그인 정보가 없습니다.")
						localStorage.removeItem("token", "role", "email");
						window.location.reload();
					} else {
						alert("삭제에 실패했습니다.")
						window.location.reload()
					}
			}
	}, [])

	const userEmail = localStorage.getItem('email')

			return (
			<>
				{
					commentList.map((reply, idx) => (
						reply.map((reReply, idx) => {
							return (
								<CommentContainer key={idx}>
										{
											reReply.isWriter 
											? <CmtWriter style={{color:"brown"}}>글쓴이</CmtWriter>
											: ( 
												reReply.userId.email === userEmail 
												? <CmtWriter style={{color:"blue"}}>my 공감</CmtWriter>
												: ( 
													reReply.userId.role === 'admin' 
													? <CmtWriter style={{color:'red'}}>관리자</CmtWriter>
													: ( reReply.userId.role === 'support' 
														? <CmtWriter style={{color:'pink'}}>{`서포터 (${reReply.userId.email.split("@")[0]})`}</CmtWriter>
														: <CmtWriter>익명</CmtWriter>
														)
													)
												)
										} 
									<Cmt>
										{reReply.parentId ? ` ㄴ : ${reReply.contents}` : ` : ${reReply.contents}`}
									</Cmt>
									<CmtDel>
										{ 
											reReply.userId.email === 'admin' 
												? <Btn value={reReply._id} onClick={handleDelete}>지우기</Btn>
												: ( 
														reReply.userId.email === userEmail 
														? <Btn value={reReply._id} onClick={e => handleDelete(e)}>지우기</Btn>
														: null
													)
										}
									</CmtDel>	
									<CmtDate>
										{reReply.createdAt 
										? reReply.createdAt.split("T")[0]
										: null}
									</CmtDate>
								</CommentContainer>
							)
						})
					))
				}
			</>
	)}

function Comment({post_id}) {

	const [ comments, setComments ] = useState([])
	const [ commentary, setCommentary] = useState('')

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await API.get(`/posts/${post_id}/replies`)
					setComments(res.data)
					console.log(res.data)
			} catch (error) {
				console.error('ErrorMessage: ', error)
				setComments(error)
			}
		}
		fetchData();
	}, [post_id])

	const handleSubmit = useCallback(async (e) => {
		try {
			const res = await API.post(`/replies`, { postId: post_id, parentId: null, contents: commentary })
		} catch (error) {
			console.error("ErrorMessage :", error)
			if (error.response.status === 401) {
				alert("로그인 정보가 없습니다.")
				localStorage.removeItem("token", "role", "email");
				window.location.replace(`/posts/${post_id}`)
			} else {
				alert("이야기를 바꾸지 못했습니다.")
				window.location.assign(`/posts/${post_id}`)
			}
			}
		}
	, [commentary]);

	const CommentListComp = useMemo(() => <CommentList commentList={comments}/>, [comments])

	return (
		<Container>
			<CommentRegisterBox onSubmit={handleSubmit}>
				<TextBox>공감의 말 달기</TextBox>
				<CommentInput value={commentary} placeholder={'공감의 말을 입력해주세요.'} onChange={e => setCommentary(e.target.value)}></CommentInput>
				<Btn type='submit'>등록</Btn>
			</CommentRegisterBox>
				<TextBox>공감 공간</TextBox>
				{CommentListComp}
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 30px 5px 30px 5px;

	width: 1200px;
	border: 1px solid lightgray;
`;

const CommentRegisterBox = styled.form`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	padding: 5px;
	margin: 0 5px 0 5px;

	width: 1180px;
	height: 100px;
`;

const TextBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 10px 0 10px 0;

	width: 80px;
	font-size: 18px;
	text-align: center;
`

const CommentInput = styled.input`
	display: flex;
	padding: 5px;
	
	width: 1000px;
	height: 50px;

	border: 1px solid lightgray;
`;

const Btn = styled.button`
	display: flex;
	flex-direction: column;
	flex: 0 1 60px;
	justify-content: center;
	align-items: center;

	height: 25px;

	background-color: white;
	border: 1px solid lightgray;
	border-radius: 5px;

	&:active {
		background-color: lightgray;
	}
	
`;

const CommentContainer = styled.div`
	display: flex;
	align-items: center;
	padding: 5px;
	margin: 5px;


	width: 1100px;
	height: 30px;

	border-bottom: 1px solid lightgray;
`

const CmtWriter = styled.div`
	display: flex;
	flex: 0 1 130px;
	padding: 5px;

	color : gray;

`

const Cmt = styled.div`
	display: flex;
	flex: 1 1 750px;
	width: 800px;

`

const CmtDel = styled.div`
	display: flex;
	justify-content: center;
	width: 80px;
`

const CmtDate = styled.div`
	display: flex;
	justify-content: right;
	flex: 1 1 50px;
	padding: 5px;
	
	
`


export default Comment;