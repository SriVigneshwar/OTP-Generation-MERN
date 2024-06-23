import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

export interface UserCardProps {
    _id:string;
    username: string;
    phone: string;
}

export const UserCard = ({_id, username, phone} : UserCardProps) =>{
    const navigate = useNavigate();


    async function deletUser(){
        const response = await axios.delete(`${BACKEND_URL}/delete/${_id}`);
        if(response.status == 200){
            alert(response.data.message);
        }
        else{
            alert(response.data.message);
        }
    }

    return(
        <div key={_id} className="flex items-center p-4 w-10/12 md:w-2/4 lg:w-1/5 h-1/3 justify-center rounded-md border border-orange-200 hover:ring-2 hover:ring-orange-500 hover:shadow-slate-500/50">
            <div className="flex flex-col items-center justify-center space-y-4">
                <Avatar name={username}/>
                <div className=" text-xl text-slate-800 font-semibold font-serif">
                    {username}
                </div>
                <div className=" text-sm text-slate-800 font-thin font-serif">
                    {phone}
                </div>
                <div className="flex flex-row gap-2">
                    <button type="button" onClick={()=>{
                        navigate(`/user/${_id}`);
                    }} className="text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 shadow-lg shadow-orange-500/50 dark:shadow-lg font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Edit</button>
                    <button type="button" onClick={deletUser} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 shadow-lg shadow-red-500/50 dark:shadow-lg font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Delete</button>
                </div>
            </div>
        </div>
        
    )
}


export  const Avatar = ({name, size = 'small'} : {name : string, size?: string}) =>{
    return (
        <div className={`relative inline-flex items-center justify-center overflow-hidden  bg-gray-600 rounded-full ${size === "small" ? "w-6 h-6" : " w-2/3 h-2/3" }`}>
            <span className={`font-thin ${size === "small" ? "text-xs" : "text-3xl"}   text-gray-300`}>{name[0].toUpperCase()}</span>
        </div>
    )
}