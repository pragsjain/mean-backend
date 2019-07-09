import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Emp = new Schema({
    name:{
        type:String
    },
    position:{
        type:String,
        default:'Trainee'
    },
    experience:{
        type:String
    },
    dob:{
        type: Date,
        default: Date.now
    },
    gender:{
        type:String
    },
    salary:{
        type:Number
    },
    skills: {
        type:Array
    },
    photo: {
        type: String,
        default:"https://picsum.photos/id/231/200/300"
    }

});

//exporting model name -Employee of type Emp
export default mongoose.model('Employee',Emp);

