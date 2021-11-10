import React, {useState} from 'react'
import axios from 'axios';
import LikeForm from '../components/LikeForm';

const CommentForm = (props) => {
    const {postId, loaded, setLoaded} = props; 

    const [commentTxt, setCommentTxt] = useState('');
    const [errors, setErrors] = useState({})

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        const newComment = {
        text: commentTxt,
        };
        console.log(postId)
        try {
        const response = await axios.post(
            `http://localhost:8000/api/comment/${postId}`,
            newComment,
            { withCredentials: true }
        );

        setCommentTxt('')
        console.log(response);
        setLoaded(!loaded)
        } catch (error) {
        console.log(error);
        setErrors(error.response.data.errors)
        }

    }

    return (
        <div>
            <form onSubmit={handleSubmitComment}>
                <label htmlFor="text">Leave your comment:</label>
                <input type='text' className='form-control' name={commentTxt} value={commentTxt} onChange={(e) => setCommentTxt(e.target.value)} />
                {errors && errors.text && (
                        <p style={{color: 'red'}}>{errors.text.message}</p>
                    )}
                {/* <button style={{background: 'none', border: 'none', color: '#069', textDecoration: 'underline', cursor: 'pointer'}} >comment</button>  */}
            </form>
        </div>
    )
}

export default CommentForm;