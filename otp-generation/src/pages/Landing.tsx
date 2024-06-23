import { OtpAuth } from "../components/OtpAuth"
import { Quote } from "../components/Quote"


export const Landing =() =>{
    return <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
            <OtpAuth type="Add"/>
        </div>
        <div className="hidden lg:block">
            <Quote/>
        </div>
    </div>
}