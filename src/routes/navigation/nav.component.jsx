import { Outlet } from 'react-router-dom'
import { Fragment, useContext } from 'react'
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'
import { UserContext } from '../../contexts/user.context'
import { CartContext } from '../../contexts/cart.context'
import { signOutUser } from '../../utils/firebase/firebase.utils'

import './nav.styles.scss'



const Nav = () =>{

    const { currentUser } = useContext(UserContext)
    const { isCartOpen } = useContext(CartContext)
    // console.log(currentUser)

    return(
    <Fragment>
        <div className="navigation">
                <a className="logo-container" href="/">
                    <CrwnLogo className="logo" />
                </a>
            <div className="nav-links-container">
                <a className='nav-link' href='/shop'>SHOP</a>
                <a className='nav-link' href='/contact'>CONTACT</a>
                { currentUser ? 
                    (<span className="nav-link" onClick={signOutUser}>SIGN OUT</span>)
                : (
                <a className='nav-link' href='/signin'>SIGN IN</a> )}
                <CartIcon />
            </div>
            { isCartOpen && <CartDropdown/> }
        </div>
        <Outlet />
    </Fragment>
    )
}

export default Nav