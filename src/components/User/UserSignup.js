import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import usericon from '../../images/user_icon.png'

const UserSignup = () =>{
    let navigate = useNavigate();

    const [inputs, setInputs] = useState({ name: '', password: '', email: '', mobileNumber: '', dateOfBirth: '', speaciality: '', pincode: '', city: '', state: '', country: '' })
    const [id, setId] = useState('')


    const [state, setState] = useState({ nameFlag: false, passFlag: false, emailFlag: false, mobileFlag: false, specFlag: false, ageFlag: false, pincodeFlag: false, cityFlag: false, stateFlag: false, countryFlag: false})

    const [success, setSuccess] = useState(false)

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    // const handleChangeSpec = (e) => {
    //     const value = e.target.value
    // }

    let getAge = (dateString) => {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    let handleRegister = (e) => {
        e.preventDefault()
        setState(false)
        var age = getAge(inputs.dateOfBirth)
        if (inputs.name.length < 3 || inputs.name.length > 50) {
            setState(val => ({ ...val, nameFlag: true }))
        }
        else if (inputs.password.length < 5 || inputs.password.length > 10) {
            setState(val => ({ ...val, passFlag: true }))
        }
        else if (inputs.mobileNumber.length !== 10) {
            setState(val => ({ ...val, mobileFlag: true }))
        }
        else if (inputs.mobileNumber ===  "") {
            setState(val => ({ ...val, emailFlag: true }))
        }
        else if (inputs.pincode.length !== 6) {
            setState(val => ({ ...val, pincodeFlag: true }))
        }
        else if (inputs.city.length <= 6 || inputs.city.length >= 20) {
            setState(val => ({ ...val, cityFlag: true }))
        }

        else if (inputs.state.length <= 6 || inputs.state.length >= 20) {
            setState(val => ({ ...val, stateFlag: true }))
        }
        else if (inputs.country.length <= 6 || inputs.country.length >= 20) {
            setState(val => ({ ...val, countryFlag: true }))
        }
        else if (age < 20 || age > 100) {
            setState(val => ({ ...val, ageFlag: true }))
        }
        else {
            const newUser = inputs
            newUser.mobileNumber = Number(newUser.mobileNumber)
            console.log(newUser.mobileNumber)
            axios.post('http://localhost:4000/users', newUser).then((res) => {
                setId(res.data.id)
                setSuccess(true)
            })
        }

    }

    return (<>
        {
            success ? (
                <div className='text-center my-5'>
                    <img src={usericon} alt='user' />
                    <h2>Account created successfully</h2>
                    <h4>Your User ID is {id}</h4>
                    <button onClick={() => navigate('/userlogin')}>Login Now</button>
                </div>)

                :
                (
                    <div className='card bg-black text-white mx-auto my-4' style={{ width: "45rem" }}>
                        <div className='card-body my-3'>
                            <div className='card-title text-center'>
                                <img src={usericon} alt="User" className="mx-3" />
                                <span style={{ fontSize: '25px' }}>User Profile</span>
                            </div>
                            <form>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label htmlFor='name' className='form-label'>Name</label>
                                        <input type="text" className="form-control" name='name' value={inputs.name} onChange={handleChange} />
                                        {
                                            state.nameFlag ? (
                                                <span>Name should be have 3 to 50 character</span>): null
                                        }
                                    </div>

                                    <div className="col-md-6" >
                                        <label htmlFor='password' className='form-label'>Password</label>
                                        <input type="password" className="form-control" name='password' value={inputs.password} onChange={handleChange} />
                                        {
                                            state.passFlag ? (
                                                <span>Password should be have 5 to 10 character</span>): null
                                        }
                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor='mobilenumber' className='form-label'>Mobile Number</label>
                                        <input type="number" className="form-control" name='mobileNumber' value={inputs.mobileNumber} onChange={handleChange} />

                                        {
                                            state.mobileFlag ? (
                                                <span>Mobile Number should have 10 digit</span>): null
                                        }
                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor='email' className='form-label'>Email</label>
                                        <input type="email" className="form-control" name='email' value={inputs.email} required onChange={handleChange} />
                                        {
                                            state.emailFlag ? (
                                                <span>Write Corerct email</span>): null
                                        }
                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor='date' className='form-label'>Date of Birth</label>
                                        <input type="Date" className="form-control" name='dateOfBirth' value={inputs.dateOfBirth} onChange={handleChange} />
                                        {
                                            state.ageFlag ? (
                                                <span>Age should be have 20 to 100 character</span>): null
                                        }
                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor='gender' className='form-label'>Gender</label>
                                        <div onChange={handleChange}>
                                            <div className='form-check form-check-inline'>
                                                <input type="radio" className='form-check-input' name='gender' id="male" value="M" required />
                                                <label htmlFor='male' className='form-label'>Male</label>
                                            </div>
                                            <div className='form-check form-check-inline'>
                                                <input type="radio" className='form-check-input' name='gender' id="female" value="F" required />
                                                <label htmlFor='female' className='form-label'>Female</label>
                                            </div>
                                        </div>
                                    </div>

                                    

                                    <div className="col-md-6">
                                        <label htmlFor='pincode' className='form-label'>Pincode</label>
                                        <input type="number" className="form-control" name='pincode' value={inputs.pincode} onChange={handleChange} />

                                        {
                                            state.pincodeFlag ? (
                                                <span>Pincode should have 6 digits
                                                </span>): null
                                        }
                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor='city' className='form-label'>City</label>
                                        <input type="text" className="form-control" name='city' value={inputs.city} onChange={handleChange} />

                                        {
                                            state.cityFlag ? (
                                                <span>City should have 6 to 20 characters
                                                </span>): null
                                        }
                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor='state' className='form-label'>State</label>
                                        <input type="text" className="form-control" name='state' value={inputs.state} onChange={handleChange} />

                                        {
                                            state.stateFlag ? (
                                                <span>State should have 6 to 20 characters
                                                </span>): null
                                        }
                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor='country' className='form-label'>Country</label>
                                        <input type="text" className="form-control" name='country' value={inputs.country} onChange={handleChange} />

                                        {
                                            state.countryFlag ? (
                                                <span>Country should have 6 to 20 characters
                                                </span>): null
                                        }
                                    </div>

                                    <div className='text-center d-grid col-6 mx-auto py-3'>
                                        <button onClick={handleRegister} className='btn btn-primary'>Register</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                )
        }
    </>
    )
}

export default UserSignup