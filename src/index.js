const { kMaxLength } = require('buffer');
const { create } = require('domain');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}) 
.then(() => console.log('connected to mongo db')) 
.catch(err => console.error("Could not connect to mongo db", err))


// Define the schema // 2. Validation with Mongoose
const courseSchema = new mongoose.Schema({
    name: {
        type: String, // validation
        required: true,
        minlength: 5, 
        maxlenth: 255, 
        //match: /patter/
    }, 
    catogory: {
        type: String, 
        enum: ['web', 'mobile', 'network']
    },
    author: String, 
    tags: {
        type: Array,
        validate: {
            isAsync: true, 
            validator: function(v, callback)  {
                setTimeout(() => {
                    // Do some async work.
                    const result = v && v.length > 0;
                    callback(result)
                }, 4000)
            }, 
            message: 'A course should have at least one tag.'
        }
    }, 
    data: { type: Date, default: Date.now }, 
    isPublished: Boolean,
    price: {
        type: Number, 
        required: function() {
            return this.isPublished;  // this will return if isPublished is true (arrow functions will not work)
        }
    }
})

// Model for schema
const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        //name: 'Angular Course', 
        catogory: '-',
        author: 'Thomas', 
        tags: null, 
        isPublished: true,
        //price: 15
    });

    try {
        const result = await course.save()
    }
    catch (ex) {
        console.log(ex.message)
    }
    
    // Saving a document / asynchronous
    //const result = await Course.save();
    //console.log(result);
}

async function getCourses() {
 
    const pageNumbers = 2
    const pageSize = 10
    
     const courses = await Course
     // Starts with Thomas
        .find({ author: /^Thomas/})
        .skip((pageNumbers - 1) * pageSize)
        .limit(pageSize)
        .sort({ name: 1 })
        //.select({ name: 1, tags: 1 })
        .count()
    console.log(courses)
}

getCourses();


async function updateCourse(id) { 
    // Approach: Update First 
    // Update directly
    // Optionally: get the update document
    const course = await Course.findByIdAndUpdate(id, {
        $set: {
            author: 'Jason', 
            isPublished: false
        }
    }, { new: true })
    //console.log(result)
}

// updateCourse() // pass in a course id 


async function removeCourse(id) { 
    const course = await Course.findByIdAndRemove(id)

}

createCourse() // pass in a course id 


////////////////////////////////////////////////

