const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}) 
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
        name: 'Angular Course', 
        author: 'Thomas', 
        tags: ['angular', 'frontend'], 
        isPublished: true
    });
    
    // Saving a document / asynchronous
    const result = await Course.save();
    console.log(result);
}

async function getCourses() {
    const courses = await Course
        .find({ author: 'Thomas', isPublished: true })
        .limit(10) 
        .sort({ name: 1 }) // can sort the document, -1 would sort in a decending order. 
        .select({ name: 1, tags: 1 }) // select the properties that we want returned.
    console.log(courses)

}

getCourses();