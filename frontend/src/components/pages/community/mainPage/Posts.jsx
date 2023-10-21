import React, { useState } from 'react';
import styled from 'styled-components';
import loadingImg from '../../../../images/loadingImg.png';
import { Link } from 'react-router-dom';

function Posts({contents, currPage}){

		return (
			<ContentWrap>
				{
					contents !== undefined ? contents.map((post, idx) => { 
						return (
							<Content key={idx}>
								<SpanNo className="no">{((currPage-1)*10)+(idx+1)}</SpanNo>
								<SpanCate className="category">{post.categoryId.title}</SpanCate>
								<SpanTitle className="title">
									<LinkDiv to={`/posts/${post._id}`}>{post.title}</LinkDiv>
								</SpanTitle>
								<SpanWriter className="writer">{post.userId.role === 'user' ? '익명' : post.userId.role}</SpanWriter>
								<SpanDate className="date">{post.createdAt.split('T')[0]}</SpanDate>
							</Content>
						)
					})
					: (
							<ImageWrap>
								<img src={loadingImg} alt="loadingImg" style={{width: 100}}/>
							</ImageWrap>
					)
				}	
			</ContentWrap>
		)
	};

	const ContentWrap = styled.div`

`;

const Content = styled.div`
	display: flex;
	width: 1200px;
	flex-direction: row;
	justify-content: space-between;
	margin-top: 10px;
	padding-top: 15px;
`;

const SpanNo = styled.span`
	display: flex;
	width: 50px;
	padding-left: 30px;
`;

const SpanCate = styled.span`
	display: flex;
	width: 150px;
	padding-left: 30px;
`;

const SpanTitle = styled.span`
	display: flex;
	width: 550px;
`;

const SpanWriter = styled.span`
	display: flex;
	width: 200px;
`;

const SpanDate = styled.span`
	display: flex;
	width: 200px;
	padding-right: 15px;
`;

const ImageWrap = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
`;

const LinkDiv = styled(Link)`
	text-decoration : none;
	color: inherit;
	&:hover {
		color: green;
	}
`

export default Posts;