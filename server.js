import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose, { mongo } from 'mongoose';
import Employee from './models/employee';

const app = express();
const router = express.Router();

//attach cors and bpdyparser as data can be in json
app.use(cors());
app.use(bodyParser.json())

//will add mongoose url
mongoose.connect('mongodb://localhost:27017/Employee');

const connection = mongoose.connection;
//add listener to event of connection -as connection opens
connection.once('open',() =>{
    console.log('Mongoose DB connection established succesfully');
})

router.route('/employees').get((req, res) =>{
    Employee.find((err, employees) =>{
        if(err)
        console.log(err)
        else 
        res.json(employees);
    })
});

router.route('/employees/:id').get((req, res) =>{
    Employee.findById(req.params.id, (err, employee) =>{
        if(err)
        console.log(err)
        else 
        res.json(employee);
    })
});

router.route('/employees/add').post((req,res) => {
    let employee =new Employee(req.body);
    //to save to db ,its asynchronous to gives promise ack
    employee.save()
        .then( employee => {
            //send status 200, and send object in json format
            res.status(200).json({'employee': 'Added succesfully ','id':employee.id});
        })
        .catch( err => {
            //in case of error just send status 400 and text 
            res.status(400).send('Failed to create new recrd');
        })
});

router.route('/employees/update/:id').post((req, res) =>{
    Employee.findById(req.params.id, (err , employee) => {
        if (!employee)
         return next(new Error("There is no employee with this id"))
        else
            employee.name = req.body.name;
            employee.gender =req.body.gender;
            employee.skills =req.body.skills;
            employee.experience =req.body.experience;
            employee.position = req.body.position;
            employee.dob = req.body.dob;
            //save the updated employee
            employee.save()
            .then( employee => {
                //send status 200, and send object in json format
                res.status(200).json('Update Done');
            })
            .catch( err => {
                //in case of erro just send status 400 and text 
                res.status(400).send('Update Failed');
            })
    })
})

router.route('/employees/delete/:id').get((req, res) => {
    Employee.findByIdAndRemove({_id: req.params.id}, (err,employee) =>{
        if (err)
            res.json(err)
        else 
            res.json('Remove succesfully');
    })
})

router.route('/employees/upload/:id').post((req, res) =>{
    Employee.findById(req.params.id, (err , employee) => {
        if (!employee)
         return next(new Error("There is no employee with this id"))
        else
            employee.photo = req.body;
            //save the updated employee
            employee.save()
            .then( employee => {
                //send status 200, and send object in json format
                res.status(200).json('Update Done');
            })
            .catch( err => {
                //in case of erro just send status 400 and text 
                res.status(400).send('Update Failed');
            })
    })
})



app.use('/', router);

//print hello world
//app.get('/' ,(req ,res) => res.send('Hello World'));

//attach to port
app.listen(4000, () => console.log('Express server running on port 4000')) 
