import React, { useEffect } from 'react';
import styled from 'styled-components';

// * localStorage 이용하여 새로고침해도 현재 선택한 카테고리 유지
const LS_KEY_CATEGORY = 'LS_KEY_CATEGORY'

const CategoryFilter = ({ categories, categoryTitle, setCategory, setPosts }) => {

	const makeCategories = () => {
		if (categories.length === 0) return;

		return categories.map((cate, idx) => (
			<div
				key={idx}
				className={
					cate.title === categoryTitle ? 'category-child selected' : 'category-child'
				}
				onClick={() => {
					setCategory(cate.title);
					setPosts(cate._id);
					localStorage.setItem(LS_KEY_CATEGORY, cate.title);
				}}
				style={ cate.title === categoryTitle ? { borderBottom: '2px solid gray'} : {border: 'none'}}
			>
				{cate.title}
			</div>
		));
	;}

	const init = () => {
		let data = localStorage.getItem(LS_KEY_CATEGORY);
		if (data !== null) setCategory(data);
	}

	useEffect(init, []);

	return (
		<div>
			<CategoryWrap className='category-set' >{makeCategories()}</CategoryWrap>
		</div>
	)
}

const CategoryWrap = styled.div`
	display: flex;
	justify-content: space-between;
	width: 400px;
	padding: 10px;
	margin: 20px 0 20px 5px;
`

export default CategoryFilter;