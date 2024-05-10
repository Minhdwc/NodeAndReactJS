const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const Course = require('./models/Course');

connect();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('OK rồi đó fen');
});

app.get('/courses', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/courses', async (req, res) => {
    try {
        const course = new Course(req.body);
        await course.save();
        res.status(201).send('Course added successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.delete('/courses/:id', async (req, res) => {
    try {
        const courseId = req.params.id;
        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({ message: "Không tìm thấy khóa học" });
        }

        await course.deleteOne();

        res.status(200).json({ message: "Xóa khóa học thành công" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi trong quá trình xóa khóa học" });
    }
});
app.get('/course/detail/:id', async (req, res) => {
    try {
        const courseId = req.params.id;
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Không tìm thấy " });
        }
        res.status(200).json(course)
    } catch (error) {
        console.error(error);
    }
})
app.get('/course/update/:id', async (req, res) => {
    try {
        const courseId = req.params.id;
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Không tìm thấy " });
        }
        res.status(200).json(course)
    } catch (error) {
        console.error(error);
    }
})
app.put('/course/update/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course)
            return res.status(404).json({ message: "Không tìm thấy" });

        course.name = req.body.name;
        course.description = req.body.description;
        course.videoId = req.body.videoId;
        course.level = req.body.level;
        course.image = req.body.image;

        await course.save();
        res.status(200).json(course);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Lỗi server" });
    }
})
app.get('/course/:slug', async (req, res) => {
    try {
        const courses = await Course.find(req.params.name);
        res.json(courses);
    }
    catch (error) {
        console.log(error);
    }
})

async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1/f8_education_dev');
        console.log('Connected to database successfully');
    } catch (error) {
        console.log('Error connecting to database');
    }
}

app.listen(3003, () => {
    console.log('listening on port 3003');
});
