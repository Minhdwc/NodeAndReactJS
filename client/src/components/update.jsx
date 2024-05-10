import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import "../scss/Main.css"
import { useParams } from 'react-router-dom';
import partWeb from "../config/config";

export function Update() {
    const { id } = useParams();
    const [courseData, setCourseData] = useState({});

    useEffect(() => {
        axios.get(`${partWeb}course/update/${id}`)
            .then((response) => {
                setCourseData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching course:', error);
            });
    }, [id]);

    const changeValue = (e) => {
        const { name, value } = e.target;
        setCourseData({ ...courseData, [name]: value });
    };

    async function updateCourse() {
        try {
            const { name, description, videoId, level } = courseData;
            const image = `https://img.youtube.com/vi/${videoId}/sddefault.jpg`;
            await axios.put(`http://localhost:3003/course/update/${courseData._id}`, {
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
            <div className="modal modal-comfirm" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Thông báo</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Bạn có muốn cập nhật</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                            <button type="button" className="btn btn-primary" onClick={updateCourse}>Lưu thay đổi</button>
                        </div>
                    </div>
                </div>
            </div>
            <form className="m-3 detail container pb-3">
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Tên phim</label>
                    <input type="text" className="form-control w-100" id="name" name="name" value={courseData.name || ''} onChange={changeValue} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Mô tả khóa học</label>
                    <input type="text" className="form-control w-100" id="description" name="description" value={courseData.description || ''} onChange={changeValue} />
                </div>
                <div className="mb-3">
                    <label htmlFor="videoId" className="form-label">Video ID</label>
                    <input type="text" className="form-control w-100" id="videoId" name="videoId" value={courseData.videoId || ''} onChange={changeValue} />
                </div>
                <div className="mb-3">
                    <label htmlFor="video" className="form-label">Video</label>
                    <div className="embed-responsive embed-responsive-16by9">
                        <ReactPlayer
                            url={`https://www.youtube.com/watch?v=${courseData.videoId}`}
                            controls={true}
                            className="embed-responsive-item w-100"
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control w-100" id="level" name="level" value={courseData.level || ''} onChange={changeValue} />
                </div>
            </form>
            <button data-bs-toggle="modal" data-bs-target=".modal-comfirm" className="btn btn-success">Update</button>
        </div>
    )
}
