import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
    const { userId, token } = useParams();
    const [formdata, setFormData] = useState({
        password: "",
        confirmPassword: ""
    });
    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formdata, [name]: value })
    };
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            console.log(userId)
            const {password,confirmPassword} = formdata
            const response = await axios.post(`http://localhost:5000/password-reset/${userId}/${token}`,{password,confirmPassword})
            console.log(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="password" name="password" placeholder="Password" onChange={handleInput} />
                <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleInput} />
                <button type="submit">Submit</button>
            </form>
        </>
    )
}
export default ResetPassword;