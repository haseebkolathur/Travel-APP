import React,{useContext} from 'react'
import { Link } from 'react-router-dom';
import styled from "styled-components";
import { UserContext } from '../App';
import logo from "../assets/image/logo.svg"

export default function Header() {
    const {userData, updateUserData} = useContext(UserContext);
    const handleLogout = () =>{
        updateUserData({type: "LOGOUT"})
    }
    return (
        <HeaderContainer>
            <LogoContainer>
                <LogoImg src={logo} alt="logo"/>
            </LogoContainer>
            <RightContainer>
                {userData ?(<LoginButton onClick={()=>handleLogout()} to={'auth/login/'}>Logout</LoginButton>) : (<LoginButton to="/auth/login/">Login</LoginButton>)}
            </RightContainer>
        </HeaderContainer>
      );
}

const HeaderContainer = styled.header`
    width: 90%;
    margin: 0 auto;
    padding: 30px 0;
    display: flex;
    justify-content: space-between;
`;
const LogoContainer = styled.div``;
const LogoImg = styled.img`
    width: 150px;
    display: block;
    cursor: pointer;
`;
const RightContainer = styled.div`
    display: flex;
    align-items: center;
`;
const LoginButton = styled(Link)`
    background: #046bf6;
    border-radius: 4px;
    padding: 13px 45px;
    color: #fff;
    font-size: 18px;
    border: none;
    font-weight: bold;
    cursor: pointer;
`;
