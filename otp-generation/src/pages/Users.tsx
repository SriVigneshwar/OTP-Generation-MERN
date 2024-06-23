import { useEffect } from "react";
import { UserCard } from "../components/UserCard";
import { useUsers } from "../hooks";
import { useNavigate } from "react-router-dom";


export const Users =()=>{
    const {loading, users} = useUsers();
    const navigate = useNavigate();

    useEffect(()=>{
        if(!users){
            alert('No users Found!');
            navigate('/');
        }
    }, [users]);

    if(loading){
        return (
            <div className=" w-screen h-screen flex items-center justify-center">
                <div className="flex flex-col items-center justify-center text-slate-800 text-3xl font-semibold">
                    Loading....
                </div>
            </div>
        )
    }

    

    return(
        <div className="mt-6 p-3 h-full flex space-x-2 flex-wrap gap-2 items-center justify-center w-full">
            {users.map(user => <UserCard  key={user._id} _id={user._id} username={user.username} phone={user.phone}/>)}
        </div>
    )
}