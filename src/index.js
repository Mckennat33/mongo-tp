const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground') 
.then(() => console.log('connected to mongo db')) 
.catch(err => console.error("Could not connect to mongo db", err))


// Define the schema
const courseSchema = new mongoose.Schema({
    name: String,
    author: String, 
    tags: [ String ], 
    data: { type: Date, default: Date.now }, 
    isPublished: Boolean
})

// Model for schema
const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Node.js Course', 
        author: 'Thomas', 
        tags: ['node', 'backend'], 
        isPublished: true
    });
    
    // Saving a document / asynchronous
    const result = await course.save();
    console.log(result);
}

createCourse();