import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useLogoutUserMutation } from '../redux/userApi'

const Navbar = () => {

    const [logoutUser] = useLogoutUserMutation()

    const { user } = useSelector(state => state.auth)
    console.log(user)
    return <>
        <nav class="navbar navbar-expand-lg bg-dark navbar-dark px-5">
            <div class="container-fluid">
                <Link class="navbar-brand" to="/" >Finance Management</Link>
                <div class="btn-group">
                    <button class="badge bg-primary px-5 px-5 fs-5 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {user && user.username}
                    </button>
                    <div class="dropdown-menu dropdown-menu-sm-end w-100" aria-labelledby="dropdownMenuButton">
                        <button
                            onClick={logoutUser}
                            type="button"
                            class="btn btn-danger w-100">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    </>
}

export default Navbar