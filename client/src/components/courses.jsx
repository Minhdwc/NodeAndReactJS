import React, { useState, useEffect } from 'react';
import axios from 'axios';
import partWeb from '../config/config';

const $ = document.querySelector.bind(document);

export function ListCourses() {
    const [courseData, setCourseData] = useState([]);
    const [id, setId] = useState(null);

    useEffect(() => {
        getCourse();
    }, []);

    const getCourse = () => {
        axios.get(partWeb + 'courses')
            .then((response) => {
                setCourseData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching courses:', error);
            });
    };

    const deleteCourse = (id) => {
        axios.delete(`${partWeb + 'courses/' + id}`)
            .then((response) => {
                console.log('deleted courses:', response);
            })
            .catch(error => {
                console.error('Error deleting courses:', error);
            })
    }

    useEffect(() => {
        var exampleModal = document.getElementById('delete-course-modal')
        exampleModal.addEventListener('show.bs.modal', function (event) {
            var button = event.relatedTarget
            var recipient = button.getAttribute('data-bs-whatever')
            setId(recipient);
        })
        $('#btn-delete-course').addEventListener('click', () => {
            deleteCourse(id);
        })
    }, [id])

    return (
        <div>
            <div className="modal fade" id="delete-course-modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Xóa khóa học??</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Bạn chắc chắn muốn xóa khóa học này
                        </div>
                        <div className="modal-footer">
                            <button onClick={setId} id="btn-delete-course" type="button" className="btn btn-danger">Xóa bỏ</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className='row'>
                    {courseData.map((course, index) => (
                        <div key={index} className='col-sm-6 col-lg-4 mt-4'>
                            <div className="card">
                                <div className='box-zoom-out' style={{ height: "220px" }}>
                                    <img src={course.image} className="card-img-top" alt={course.name} />
                                </div>
                                <div className="card-body">
                                    <a href={`/course/detail/${course._id}`} className="card-title">{course.name}</a>
                                    <p className="card-text">{course.description}</p>
                                    <button data-bs-whatever={course._id} data-bs-toggle="modal" data-bs-target="#delete-course-modal" className="btn mx-3 bg-danger">Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
}
