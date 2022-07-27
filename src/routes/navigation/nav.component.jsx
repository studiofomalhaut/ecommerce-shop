import { Outlet } from 'react-router-dom'
import { Fragment } from 'react'
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import './nav.styles.scss'

const Nav = () =>{
    return(
    <Fragment>
        <div className="navigation">
                <a className="logo-container" href="/">
                    <CrwnLogo className="logo" />
                </a>
            <div className="nav-links-container">
                <a className='nav-link' href='/shop'>SHOP</a>
                <a className='nav-link' href='/contact'>CONTACT</a>
                <a className='nav-link' href='/signin'>SIGN IN</a>
            </div>
        </div>
        <Outlet />
    </Fragment>
    )
}

export default Nav