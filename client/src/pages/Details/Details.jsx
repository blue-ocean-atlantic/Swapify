import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@mantine/core';
import { Title } from '@mantine/core';
import { ownerProfile, listingInfo}  from './dummyData.js';
import NavBar from '../../components/NavBar/NavBar.jsx';
import ImagesGallery from './ImageGallery.jsx';
import ListingDetails from './ListingDetails.jsx';
import OwnerProfile from './OwnerProfile.jsx';
import Description from './Description.jsx';

function Details() {
  const { listingId } = useParams();
  console.log(listingId);
  const [images, setImages] = useState(['https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640']);
  const [type, setType] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [description, setDescription] = useState('');
  const [availableDate, setAvailableDate] = useState('');
  const [postTime, setPostTime] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profileDescription, setProfileDescription] = useState('');
  const [rating, setRating] = useState([]);

  useEffect(() => {
    setType(listingInfo.typeOfTranscation);
    setImages(listingInfo.listingImages);
    setTitle(listingInfo.listingTitle);
    setCategory(listingInfo.listingCategory);
    setCondition(listingInfo.listingCondition);
    setDescription(listingInfo.listingDescription);
    setAvailableDate(listingInfo.availableDate);
    setPostTime(listingInfo.postTime);
    setProfilePhoto(ownerProfile.profilePicture);
    setFirstName(ownerProfile.profileFirstName);
    setLastName(ownerProfile.profileLastName);
    setProfileDescription(ownerProfile.profileDescription);
    setRating(ownerProfile.profileRatings);
  });

  return (
          <div className="details-page">
            <NavBar />
            <main>
              <Title order={1} className="type-of-transcation">{type.toUpperCase()}</Title>
              <Grid justify="space-between">
                <Grid.Col span={8}><ImagesGallery images={images}/></Grid.Col>
                <Grid.Col span={4}><ListingDetails
                                      title={title}
                                      category={category}
                                      condition={condition}
                                      availableDate={availableDate}
                                      postTime={postTime}
                                    /></Grid.Col>
                <Grid.Col span={8}><Description description={description}/></Grid.Col>
                <Grid.Col span={4}><OwnerProfile
                                     profilePhoto={profilePhoto}
                                     firstName={firstName}
                                     lastName={lastName}
                                     profileDescription={profileDescription}
                                     rating={rating}
                                   /></Grid.Col>
              </Grid>
            </main>
          </div>
  )
}

export default Details;
