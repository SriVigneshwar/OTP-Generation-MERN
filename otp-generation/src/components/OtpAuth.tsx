import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { PostInputs, saveBody } from "../utils/Types";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { IUser } from "../hooks";


export const OtpAuth = ({type, user} : {type: 'Edit' | 'Add', user?: IUser}) =>{
    const navigate = useNavigate();
    const [btnState, setBtnState] = useState<'Generate OTP'| 'Submit' | 'Update'>('Generate OTP');
    const [otp, setOtp] =useState('');
    const [id, setId] = useState('');
    const [postInputs, setPostInputs] = useState<PostInputs>({
       username: "",
       phone: "" 
    });
    

    useEffect(()=>{
        if(type === 'Edit'){
            setPostInputs({
                ...postInputs,
                username: user?.username || '', 
                phone: user?.phone || ''
            });
            setId(user?._id || '');
        }
    }, []);

    const canSave = btnState === 'Generate OTP' ? [postInputs.username, postInputs.phone].every(Boolean) :[postInputs.username, postInputs.phone, otp].every(Boolean);

    function generateOtp(){
        if(btnState === 'Generate OTP'){
            var digits = '0123456789abcdefghijklmnopqrstuvwxyz';

            var otpLength = 6;

            var otp = '';

            for(let i=1; i<=otpLength; i++)

            {

                var index = Math.floor(Math.random()*(digits.length));

                otp += digits[index];

            }

            setOtp(otp);
            if(type ==='Add')
                setBtnState('Submit');
            else
                setBtnState('Update');
        }
        else{
            if(type ==='Add')
                addUser();
            else
                updateUser();
        }
    }
    async function addUser(){
        try{
            const {success} = saveBody.safeParse(postInputs);

            if(!success){
                alert('Inputs are Incorrect');
            }
            else{
                const response = await axios.post(`${BACKEND_URL}/save`, postInputs);
                if(response.status == 200){
                    alert(response.data.message);
                    navigate('/users');
                }
                else{
                    alert(response.data.message);
                }
            }
        }
        catch(e){
            alert('Error while Adding user');
        }
    }

    async function updateUser(){
        try{
            const {success} = saveBody.safeParse(postInputs);
            if(!success){
                alert('Inputs are Incorrect');
            }
            else{
                const response = await axios.post(`${BACKEND_URL}/update/${id}`, postInputs);
                if(response.status == 200){
                    alert(response.data.message);
                    navigate('/users');
                }
                else{
                    alert(response.data.message);
                }
            }
        }
        catch(e){
            alert('Error while Adding user');
        }
    }
    return (
        <div key={id} className="h-screen flex flex-col justify-center">
            <div className="flex justify-center ">
                <form>
                <div className="px-10 py-3">
                        <div className="text-3xl font-extrabold">
                            {type} User
                        </div>
                        <div className="text-slate-700 text-center mt-2">
                            <Link className="pl-2 underline" to='/users'>
                                Click to View all users
                            </Link>
                        </div>
                    </div>
                    <div>
                        <LabelledInput label="Username" placeholder="m@reactdev" readonly={false} isEdit={type==='Edit'? true: false} value={postInputs.username} onChange={(e)=>{
                            setPostInputs({
                                ...postInputs,
                                username: e.target.value
                            });
                        }}></LabelledInput>
                        <LabelledInput label="Phone" placeholder="9999999999" isEdit={type==='Edit'? true: false} readonly={false} value={postInputs.phone} onChange={(e)=>{
                            setPostInputs({
                                ...postInputs,
                                phone: e.target.value
                            });
                        }}></LabelledInput>
                        <LabelledInput label="OTP" placeholder="" readonly={true} isEdit={type==='Edit'? true: false} value={otp}></LabelledInput>
                    </div>
                    <div>
                        <button type="button" onClick={generateOtp} disabled={!canSave} className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none 
                        focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 my-2">{btnState}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}



interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    readonly: boolean;
    value?:string;
    isEdit: boolean;
}

function LabelledInput({label, placeholder, onChange, type, readonly, value, isEdit} : LabelledInputType){
    if(isEdit){
        return(
            <div className="my-4">
            <label className="block mb-2 text-sm font-semibold text-black">{label}</label>
            {readonly ? 
                <input onChange={onChange} type={type || "text"} className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required={true} value={value} readOnly/>    
            :   <input onChange={onChange} type={type || "text"} className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required={true} value={value}/> 
            }
        </div>
        )
    }
    return (
        <div className="my-4">
            <label className="block mb-2 text-sm font-semibold text-black">{label}</label>
            {readonly ? 
                <input onChange={onChange} type={type || "text"} className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required={true} value={value} readOnly/>    
            :   <input onChange={onChange} type={type || "text"} className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required={true} /> 
            }
        </div>
    )
}