import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRegisterUserMutation } from '../redux/userApi'
import { toast } from 'react-toastify'

const Register = () => {

    const [userData, setUserData] = useState({})

    const [registerUser, { isSuccess, isError }] = useRegisterUserMutation()

    const navigate = useNavigate()


    const handleChange = e => {
        const { name, value } = e.target

        setUserData({ ...userData, [name]: value })

    }


    useEffect(() => {
        if (isSuccess) {
            toast.success("Register Success")
            navigate("/login")
        }
    }, [isSuccess])





    return <>
        <div class="container">
            <div class="row">
                <div class="col-sm-6 offset-sm-3">
                    <div class="card">
                        <div class="card-header">Signup</div>
                        <div class="card-body">
                            <div>
                                <label for="username" class="form-label">Username</label>
                                <input
                                    onChange={handleChange}
                                    name='userName'
                                    type="text"
                                    class="form-control"
                                    id="username"
                                    placeholder="Enter your username"
                                />
                                <div class="valid-feedback">Looks good!</div>
                                <div class="invalid-feedback">Please choose a username.</div>
                            </div>
                            <div class="mt-2">
                                <label for="email" class="form-label">Email</label>
                                <input
                                    onChange={handleChange}
                                    name='email'
                                    type="text"
                                    class="form-control"
                                    id="email"
                                    placeholder="Enter Your Email"
                                />
                                <div class="valid-feedback">Looks good!</div>
                                <div class="invalid-feedback">Please choose a username.</div>
                            </div>
                            <div class="mt-2">
                                <label for="password" class="form-label">Password</label>
                                <input
                                    onChange={handleChange}
                                    name='password'
                                    type="text"
                                    class="form-control"
                                    id="password"
                                    placeholder="Enter Your Password"
                                />
                                <div class="valid-feedback">Looks good!</div>
                                <div class="invalid-feedback">Please choose a password.</div>
                            </div>
                            <button onClick={e => registerUser(userData)} type="button" class="btn btn-primary w-100 mt-3">
                                Signup
                            </button>
                            <p class="text-center mt-3">
                                Already Have Account? <Link to="/login">Login</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Register