import React, { useEffect, useState } from 'react'
import { useLoginUserMutation } from '../redux/userApi'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {

    const [userData, setUserData] = useState({})

    const [loginUser, { isSuccess, isError }] = useLoginUserMutation()

    const navigate = useNavigate()

    const handleChange = e => {
        const { name, value } = e.target

        setUserData({ ...userData, [name]: value })

    }

    useEffect(() => {
        if (isSuccess) {
            toast.success("Login Success")
            navigate("/")
        }
    }, [isSuccess])


    useEffect(() => {
        if (isError) {
            toast.error("Invalid User")
        }
    }, [isError])

    return <>
        <div class="container">
            <div class="row">
                <div class="col-sm-6 offset-sm-3">
                    <div class="card">
                        <div class="card-header">Login</div>
                        <div class="card-body">
                            <div>
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
                                    type="password"
                                    class="form-control"
                                    id="password"
                                    placeholder="Enter Your Password"
                                />
                                <div class="valid-feedback">Looks good!</div>
                                <div class="invalid-feedback">Please choose a username.</div>
                            </div>
                            <button onClick={e => loginUser(userData)} type="button" class="btn btn-primary w-100 mt-3">
                                Login
                            </button>
                            <p class="text-center mt-3">
                                Dont Have Account? <Link to="/register" >Create Account</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Login