import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getCurrentUser } from '../../redux/user.selectors';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { auth } from '../../firebase/firebase.utils';
import {
    HeaderContainer,
    LogoContainer,
    OptionsContainer,
    OptionLink
} from './header.styles';
import { useAppSelector } from '../../app/hooks';
import { Link } from 'react-router-dom';


const Header = () => {
    const currentUser = useAppSelector((state) => state.currentUser);
    const { user } = currentUser;
    useEffect(() => {
    }, [user]);
    return (
        <HeaderContainer>
            <LogoContainer to='/home/feed'>
                <Logo className='logo' />
            </LogoContainer>
            <OptionsContainer>
                {user ? (
                    <OptionLink onClick={() => auth.signOut()}>
                        <span>SIGN OUT</span>
                    </OptionLink>
                ) : (
                    <OptionLink >
                        <Link style={{ textDecoration: 'none' }} to='/aboutus'>
                            <span style={{ fontFamily: 'inherit' }}>ABOUT US</span>
                        </Link>
                    </OptionLink>
                )}
            </OptionsContainer>
        </HeaderContainer>
    )
};

const mapStateToProps = (state: any) => ({
    currentUser: getCurrentUser(state),
});

export default connect(mapStateToProps)(Header);