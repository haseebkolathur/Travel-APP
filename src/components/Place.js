import React, { useState, useEffect,useContext } from "react";
import place from "../assets/image/place.svg";
import styled from 'styled-components';
import axios from "axios";
import Helmet from "react-helmet";
import { useParams } from "react-router-dom";
import { UserContext } from "./../App";

export default function Place() {
    const [MainImage, setPlace] = useState();
    const [gallery, setGallery] = useState([]);
    const [Details,setDetails] = useState({
        name:"",
        category_name:"",
        location:"",
        description:"",
    })
    const {id} = useParams()

    const galleryImages = () => {
        return(
            gallery.map((image)=>(
                <GalleryRightImage key={image.id}>
                    <GalleryImage src={image.image} alt="Image"/>
                </GalleryRightImage>
            ))
        );
    }

    const {userData} = useContext(UserContext);

    useEffect(() =>{
        console.log(userData)
        axios 
            .get(`https://traveller.talrop.works/api/v1/places/protected/${id}`,{
                headers:{
                    authorization:`Bearer ${userData?.access}`,
                }
            })
            .then(function (response) {
                console.log(response.data.data);
                setPlace(response.data.data.image);
                setGallery(response.data.data.gallery);
                setDetails(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

  return (
    <>
        <Helmet>
            <title>{`${Details.name}`} | Moke Travel</title>
        </Helmet>
        <MainContainer>
            <Title>{Details.name}</Title>
            <InfoContainer>
                <CategoryName>{Details.category_name}</CategoryName>
                <LocationContainer>
                    <LocationIcon src={place} alt="Place"/>
                    <LocationName>{Details.location}</LocationName>
                </LocationContainer>
            </InfoContainer>
            <GalleryContainer>
                <GalleryLeftImage>
                    <GalleryImage src={MainImage} alt="Image"/>
                </GalleryLeftImage>
                {galleryImages()}
            </GalleryContainer>
            <SubHeading>Place Details</SubHeading>
            <Discription>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, auis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. sunt in culpa aui officia deserunt
                        mollit anim id est laborum.
            </Discription>
        </MainContainer>    
    </>
  );
}

const MainContainer = styled.div`
    width: 70%;
    margin: 70px auto 0;
`;
const Title = styled.h1`
    font-size: 48px;
    margin-bottom: 15px;
`;
const InfoContainer = styled.div`
    display: flex;
    margin-bottom: 15px;
`;
const CategoryName = styled.span`
    padding: 5px 10px;
    border-radius: 20px;
    display: inline-block;
    border: 1px solid #9c9c9c;
    color: #9c9c9c;
    margin-right: 15px;
`;
const LocationContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const LocationIcon = styled.img`
    margin-right: 5px;
`;
const LocationName = styled.span`
    color: #9c9c9c;
    font-weight: bold;
    font-size: 14px;
`;
const GalleryContainer = styled.ul`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;
    border-radius: 15px;
    overflow: hidden;
    margin-bottom: 35px;
`;
const GalleryLeftImage = styled.li`
    &:first-child {
        grid-column-end: span 2;
        grid-row-end: span 2;
    }
`;
const GalleryRightImage = styled.li`
    &:first-child {
        grid-column-end: span 2;
        grid-row-end: span 2;
    }
`;
const GalleryImage = styled.img`
    width: 100%;
    display: block;
`;
const SubHeading = styled.h3`
    font-size: 28px;
    margin-bottom: 20px;
`;
const Discription = styled.p`
    font-size: 16px;
    line-height: 1.6em;
`;

