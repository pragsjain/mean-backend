import mongoose from 'mongoose';
import { FILE } from 'dns';

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
        //default: Date.now
    },
    gender:{
        type:String
    },
    salary:{
        type:Number
    },
    skills: {
        type:Array,
        default:['None']
    },
    photo: {
        type: String,
        default: 'https://picsum.photos/id/1005/5760/3840'
    }

});

//exporting model name -Employee of type Emp
export default mongoose.model('Employee',Emp);

