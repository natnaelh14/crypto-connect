import React, { useEffect, useState } from 'react';
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

const Header = (props: any) => {
    const currentUser = useAppSelector((state) => state.currentUser);
    const { user } = currentUser;

    return (
        <HeaderContainer>
            <LogoContainer to='/home/feed'>
                <Logo className='logo' />
            </LogoContainer>
            <>
                {user && (
                    <OptionsContainer>
                        <OptionTag onClick={() => auth.signOut()}>
                            <span>SIGN OUT</span>
                        </OptionTag>
                    </OptionsContainer>
                )}
            </>
        </HeaderContainer >
    )
};

const mapStateToProps = (state: any) => ({
    currentUser: getCurrentUser(state),
});

export default connect(mapStateToProps)(Header);