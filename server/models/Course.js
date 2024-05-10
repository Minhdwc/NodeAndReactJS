const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const moonngoseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;
const Course = new Schema(
    {
        name: { type: String, maxLength: 255, required: true },
        slug: { type: String, slug: 'name' },
        description: { type: String, maxLength: 600 },
        image: { type: String },
        videoId: { type: String, required: true, unique: true },
        level: { type: String },
    },
    { timestamps: true },
);
Course.plugin(moonngoseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});
mongoose.plugin(slug);

module.exports = mongoose.model('Course', Course);
