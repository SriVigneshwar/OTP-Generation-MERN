import { OtpAuth } from "../components/OtpAuth";
import { useParams } from "react-router-dom";
import { useUser } from "../hooks";


export const EditUser = () =>{
    const {id} = useParams();
    const {user,loading} = useUser({id: id || ""});
    if(loading){
        return (
            <div className=" w-screen h-screen flex items-center justify-center">
                <div className="flex flex-col items-center justify-center text-slate-800 text-3xl font-semibold">
                    Loading....
                </div>
            </div>
        )
    }

    return (
        <div>
            <OtpAuth type="Edit" user={user}/>
        </div>
    )
}