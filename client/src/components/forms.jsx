import axios from 'axios';
import React, { useState } from 'react';

function Form() {
    const [course, setCourse] = useState({
        name: '',
        description: '',
        videoId: '',
        difficulty: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourse({ ...course, [name]: value });
    };

    async function postDB() {
        try {
            const { name, description, videoId, level } = course;
            const image = `https://img.youtube.com/vi/${videoId}/sddefault.jpg`;
            await axios.post("http://localhost:3003/courses", {
                name,
                description,
                videoId,
                level,
                image
            });
            window.location.href = "/";

        } catch (error) {
            console.error("Error sending data to server", error);
        }
    }

    return (
        <div className="container">
            <div className="m-4">
                <h3>Create Course</h3>
                <form className='form' method='post'>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Tên khóa học</label>
                        <input type="text" className="form-control w-100" id="name" name="name" onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Mô tả khóa học</label>
                        <input type="text" className="form-control w-100" id="description" name="description" onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="videoId" className="form-label">Video ID</label>
                        <input type="text" className="form-control w-100" id="videoId" name="videoId" onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="level" className="form-label">Trình độ</label>
                        <input type="text" className="form-control w-100" id="level" name="level" onChange={handleChange} />
                    </div>
                </form>
                <button onClick={postDB} className="btn btn-primary">Thêm khóa học</button>

            </div>
        </div>
    );
}

export default Form;
