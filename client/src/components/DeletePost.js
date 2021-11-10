import React from 'react'
import axios from 'axios';

const DeletePost = (props) => {
    const { id, loaded, setLoaded } = props;

    const DeletePost = e => {
        axios.delete('http://localhost:8000/api/post/' + id, { withCredentials: true })
            .then(res => {
                setLoaded(!loaded)
            })
    }

    return (
        <button style={{background: 'none', border: 'none', color: '#069', cursor: 'pointer'}} type="button" className="btn btn-danger" onClick={DeletePost}>Delete Post</button>
    )
}

export default DeletePost