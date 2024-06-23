import express from 'express';
import cors from 'cors'
import {User} from './db';
import zod from 'zod';

const app = express();


app.use(express.json());
app.use(cors());


const saveBody = zod.object({
    username: zod.string().max(20),
    phone:  zod.string().max(10).refine((value) => /^[6-9]{1}[0-9]{9}$/.test(value))
});


app.post('/save', async (req, res)=>{
    try{
        const {success} = saveBody.safeParse(req.body);

        if(!success){
            return res.status(411).json({
                message: 'Incorrect Inputs'
            });
        }


        const existingUser = await User.findOne( { $or:[ {'username':req.body.username}, {'phone':req.body.phone} ]});


        if(existingUser){
            return res.status(411).json({
                message: 'Username / Phone already taken'
            });
        }

        const user = await User.create({
            username: req.body.username,
            phone: req.body.phone
        });

        if(user){
            return res.json({
                message: 'User created successfully',
                userId: user._id
            });
        }
    }
    catch(e){
        return res.status(403).json({
            message: 'Sorry, Something went wrong'
        });
    }
});

app.get('/users', async (req, res) =>{
    try{
        const users = await User.find({});

        if(!users){
            return res.status(411).json({
                message: 'No users found'
            });
        }

        return res.json({users});
    }
    catch(e){
        return res.status(403).json({
            message: 'Sorry, Something went wrong'
        });
    }
});

app.get('/users/:userId', async (req, res)=>{
    try{
        const id = req.params['userId'];

        const user = await User.findOne({
            _id: id
        });

        if(!user){
            return res.status(411).json({
                message: 'User Not Found'
            });
        }

        return res.json({user});
    }
    catch(e){
        return res.status(403).json({
            message: 'Sorry, Something went wrong'
        });
    }
});

app.delete('/delete/:userId', async (req, res)=>{
    try{
        const id = req.params['userId'];

        await User.deleteOne({
            _id: id
        });

        return res.json({
            message: 'User deleted'
        });
    }
    catch(e){
        return res.status(403).json({
            message: 'Sorry, Something went wrong'
        });
    }
});

app.post('/update/:userId', async (req, res)=>{
    try{
        const {success} = saveBody.safeParse(req.body);

        if(!success){
            return res.status(411).json({
                message: 'Incorrect Inputs'
            });
        }

        const id = req.params['userId'];

        const existingUser = await User.findOne( { $or:[ {'username':req.body.username}, {'phone':req.body.phone} ]});

        if(existingUser){
            if(id != existingUser._id.toString()){
                return res.status(411).json({
                    message: 'Username / Phone already taken'
                });
            }
        }

        
        
        const updatedUser = await User.findOneAndUpdate({
            _id: id
        },
        {
            username: req.body.username,
            phone: req.body.phone
        });

        return res.json({
            message: 'User data Updated successfully',
            updatedUser
        });
    }
    catch(e){
        return res.status(403).json({
            message: 'Sorry, Something went wrong'
        });
    }
});

app.listen('3000');
