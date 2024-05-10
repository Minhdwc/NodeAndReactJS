import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../scss/Main.css"
import { useParams } from 'react-router-dom';
import partWeb from "../config/config";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

export function Detail() {
    const { id } = useParams();
    const [courseData, setCourseData] = useState({});

    useEffect(() => {
        axios.get(`${partWeb}course/detail/${id}`)
            .then((response) => {
                setCourseData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching course:', error);
            });
    }, [id]);

    return (
        <div className="container">
            <form className="mt-3 detail">
                <div className="row">
                    <div className="col-4">
                        <img className="w-100" src={courseData.image} alt={courseData._id} />
                    </div>
                    <div className="col-8">
                        <div className="row">
                            <div className="col-2">
                                <p><strong>Tên: </strong></p>
                            </div>
                            <div className="col-10">
                                <p>{courseData.name}</p>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-2">
                                <p><strong>Mô tả: </strong></p>
                            </div>
                            <div className="col-10">
                                <p>{courseData.description}</p>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-2">
                                <p><strong>Đánh giá: </strong></p>
                            </div>
                            <div className="col-10">
                                <p>{courseData.level}</p>
                            </div>
                        </div>
                        <hr />
                        <button className="p-2 m-2 btn-xem"><FontAwesomeIcon icon={faPlay} />Xem phim</button>
                    </div>
                </div>
            </form>
            <Link to={`/course/update/${courseData._id}`} className="btn update-btn">Update</Link>
        </div>
    )
}
