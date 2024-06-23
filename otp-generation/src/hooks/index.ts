import { useState, useEffect } from "react";
import {BACKEND_URL} from '../config';
import axios  from "axios";

export interface IUser{
    _id: string;
    username: string;
    phone: string;
}

export const useUsers = () =>{
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/users`)
        .then(response=> {
            setUsers(response.data.users);
            setLoading(false);
        });
    });

    return {
        loading,
        users
    }
}


export const useUser = ({id} : {id: string}) =>{
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<IUser>();

    useEffect(()=>{ 
            axios.get(`${BACKEND_URL}/users/${id}`)
            .then(response=> {
                setUser(response.data.user);
                setLoading(false);
            });
    }, []);
    
    return {
        loading,
        user
    }
}