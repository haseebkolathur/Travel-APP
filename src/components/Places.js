import React, { useEffect, useState } from 'react'
import place from "../assets/image/place.svg";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Helmet from "react-helmet";


export default function Places() {
    const [Categories, setCategories] = useState([]);
    const history = useNavigate("")
    useEffect(() =>{
        axios 
            .get("https://traveller.talrop.works/api/v1/places/")
            .then(function (response) {
                // handle success
                console.log(response.data.data);
                setCategories(response.data.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }, []);

    let renderItems = () => {
        return Categories.map((user) => (
            <PlaceCard key={user.id} onClick={()=>{history(`/places/${user.id}`)}}>
                <PlaceImgContainer>
                    <PlaceImage src={user.image} alt="image" />
                </PlaceImgContainer>
                <BottomContainer>
                    <PlaceTitle>{user.name}</PlaceTitle>
                    <Location>
                        <LocationIcon src={place} alt="Place"/>
                        <LocationName>{user.name}</LocationName>
                    </Location>
                </BottomContainer>
            </PlaceCard>
        ));
    };
  return (
    <>
        <Helmet>
            <title>Places | Moke Travel</title>
        </Helmet>
        <PlaceMain>
            <TopContainer>
                <Heading>Welcome</Heading>
                <Paragraph>Explore the world around you</Paragraph>
            </TopContainer>
            <PlaceContainer>
                {renderItems()}
            </PlaceContainer>
        </PlaceMain>
    </>
  );
}

const PlaceMain = styled.div`
    width: 90%;
    margin: 100px auto 0;
`;
const PlaceContainer = styled.ul`
    display: flex;
    flex-wrap: wrap;
    list-style: none;
`;
const TopContainer = styled.div`
    margin-bottom: 40px;
    
`;
const Heading = styled.h1`
    font-size: 36px;
    margin-bottom: 20px;
`;
const Paragraph = styled.p`
    font-size: 22px;
    color: #dfdfe2;
`;
const PlaceCard = styled.li`
    width: 23.5%;
    margin-right: 2%;
    margin-bottom: 25px;
    &:nth-child(4n) {
        margin-right: 0;
    }
`;
const PlaceImgContainer = styled.div``;
const PlaceImage = styled.img`
    width: 100%;
    display: block;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`;
const BottomContainer = styled.div`
    padding: 10px 15px;
`;
const PlaceTitle = styled.h3`
    margin-bottom: 10px;
    font-size: 20px;
`;
const Location = styled.div`
    display: flex;
    cursor: pointer;
`;
const LocationIcon = styled.img`
    margin-right: 10px;
`;
const LocationName = styled.span`
    font-size: 18px;
`;

