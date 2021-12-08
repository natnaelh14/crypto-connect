import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getCurrentUser } from '../../redux/user.selectors';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { auth } from '../../firebase/firebase.utils';
import {
    HeaderContainer,
    LogoContainer,
    OptionsContainer,
    OptionLink,
    OptionTag
} from './header.styles';
import { useAppSelector } from '../../app/hooks';

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
            <>
                {user ? (
                    <OptionsContainer>
                        <OptionTag onClick={() => auth.signOut()}>
                            <span>SIGN OUT</span>
                        </OptionTag>
                    </OptionsContainer>
                ) : (
                    <OptionsContainer>
                        <OptionLink to='/about-us' >
                            <span>ABOUT US</span>
                        </OptionLink>
                    </OptionsContainer>
                )}
            </>
        </HeaderContainer>
    )
};

const mapStateToProps = (state: any) => ({
    currentUser: getCurrentUser(state),
});

export default connect(mapStateToProps)(Header);