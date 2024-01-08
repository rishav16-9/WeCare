import { useState } from "react";
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import usericon from '../../images/user_icon.png'

const UserLogin = () => {
    let navigate = useNavigate();
    const [id, setId] = useState("");
    const [pwd, setPwd] = useState("");
    const [message, setMessage] = useState("")
    const [idflag, setIdFlag] = useState(false)
    const [passflag, setPassFlag] = useState(false)
    const [state, setState] = useState(false)


    const hadleIdChange = (e) => {
        setId(e.target.value)
    }
    const hadlePassChange = (e) => {
        setPwd(e.target.value)
    }
    const handleLogin = (e) => {
        e.preventDefault();
        setState(false)
        if (id.length === 0) {
            setIdFlag(true)
        }
        else if (pwd.length < 5 || pwd.length > 10) {
            setPassFlag(true)
        }
        else {
            axios.get('  http://localhost:4000/users?id=' + id + '&password' + pwd).then((res) => {
                if (res.data.length === 0) {
                    setState(true)
                }
                else {
                    navigate('/userhome')
                }
            })
        }


    };
    return (
        <>

            <div className='card bg-black text-white mx-auto my-4 text-center' style={{ width: "45rem" }}>
                        <div className='card-body my-3'>
                            <div className='card-title text-center'>
                                <img src={usericon} alt="User" className="mx-3" />
                                <span style={{ fontSize: '25px' }}>User Profile</span>
                            </div>
                            <form onSubmit={handleLogin} className='formsk' >
                                <div>
                                    <label className='form-label'>Id</label>
                                    <input style={{ width: "40%" }} type="text" className="form-control" onChange={hadleIdChange} /><br />
                                </div>
                                <div>
                                    <label htmlFor='password' className='form-label'>Password</label>
                                    <input style={{ width: "40%"}} type="password" className="form-control" onChange={hadlePassChange} /><br />
                                </div>
                                <div className="text-danger">{message}</div>
                                <button type="submit" className="btn btn-primary">
                                    Login
                                </button>
                            </form>
                        </div>
                        </div>
        </>
    );
}

export default UserLogin