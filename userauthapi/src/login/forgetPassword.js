import axios from "axios";
import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
const ForgetPassword = () => {
    const navigate = useNavigate();
    const [email,setEmail] = useState('');
    const handleInputChange = (e)=>{
       const {name,value} = e.target;
       setEmail(value)
       console.log(email)
    };

    const handleSubmit = async(e)=>{
        try{
        e.preventDefault();
        const response = await axios.post('http://localhost:5000/password-reset/',{email: email});
        console.log(response.data)
        navigate('/')}
        catch(error){
            console.log(error)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Email:
                <input
                    type="email"
                    name="email"
                    onChange={handleInputChange}
                />
            </label>
            <button type="submit">Reset Password</button>
        </form>
    );
}
export default ForgetPassword
