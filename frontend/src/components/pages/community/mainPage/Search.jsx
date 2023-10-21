import React, { useState, useEffect, useCallback } from 'react';
import * as API from '../../../../utils/api';
import styled from 'styled-components';

function Search({setPosts}) {
	
	const [search, setSearch] = useState('');

	// * 추후 디바운스 처리 필요 
	const handleSearch = (e) => {
		setSearch(e.target.value);
	}
	
	const handleSubmit = async () => {
		try { 
			const res = await API.get(`posts/search/search/${search}`)
			if (res.data) {
				setPosts(res.data)
				console.log(res.data)
			}
		} catch (error) {
			console.error("에러 :", error)
		}
	}

	return (
			<SearchForm onSubmit={handleSubmit}>
				<SearchBox type='text' value={search} placeholder='검색어를 입력해주세요.' onChange={handleSearch} />
				<SearchBtn type='submit'> 검색 </SearchBtn>
			</SearchForm>
	);
};

const SearchForm = styled.form`
	display: flex;
	align-items: center;
`

const SearchBox = styled.input`
	display: flex;
	width: 500px;
	height: 30px;
	border: 1px solid lightgray;
	padding-left: 10px;
	margin: 0px 20px 0 30px;
`

const SearchBtn = styled.button`
	height: 25px;
	border: 0.5px solid gray;
	border-radius: 5px;
	background-color: white;
	&:active {
	background-color: lightgray;
	}
`

export default Search;