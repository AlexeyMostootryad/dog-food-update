import { useState } from 'react';
import './AppComments.module.css'

function AppComments(){
	const [comment, setComment] = useState('');
	const [comments, setComments] = useState([]);	
	const onClickHandler = () => {
		setComments((comments) => [...comments, comment]);
	};
	const onChangeHandler = (e) => {
		setComment(e.target.value);
	}
	return (
	<div className='main-container-comment'>
		{comments.map((text) => (
			<div className='comment-container'>{text}</div>
		))}
		<div className='comment-flexbox'>
		<h3 className='comment-text'>Оставить комментарий</h3>
		<textarea 
		value={comment}
        onChange={onChangeHandler}
		className='comment-inputbox' 
		/>
		<button onClick={onClickHandler} className='comment-button'>
			Отправить
		</button>
		</div>
	</div>
	);
}
export default AppComments