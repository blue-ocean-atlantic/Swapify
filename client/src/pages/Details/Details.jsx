import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@mantine/core';
import { Title } from '@mantine/core';
import { ownerProfile, listingInfo } from './dummyData.js';
import NavBar from '../../components/NavBar/NavBar.jsx';
import ImagesGallery from './ImageGallery.jsx';
import ListingDetails from './ListingDetails.jsx';
import OwnerProfile from './OwnerProfile.jsx';
import Description from './Description.jsx';
import ownerProfileStore from '../../store.js';
import axios from 'axios';

function Details() {
  const { listingId } = useParams();
  // console.log(listingId);
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
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [userInfo, setUserInfo] = useState('');
  const [ownerId, setOwnerId] = useState('');
  const ownerProfileUpdate = ownerProfileStore(state => state.updateOwnerProfile);

  useEffect(() => {
    const username = document.cookie.split('=')[1];

    const fetchData = async () => {
         await axios.get(`http://localhost:3005/api/listing/?id=${listingId}`)
          .then((results) => {
            console.log('listing data', results.data)
            setType(results.data.type);
            setImages(results.data.image_urls);
            setTitle(results.data.title);
            setCategory(results.data.category);
            setCondition(results.data.condition);
            setDescription(results.data.description);
            setAvailableDate(results.data.available_date);
            setPostTime(listingInfo.postTime);
            setLocation(results.data.zipcode);
            setProfilePhoto(results.data.donor[0].photo_url);
            setFirstName(results.data.donor[0].first_name);
            setLastName(results.data.donor[0].last_name);
            setProfileDescription(results.data.donor[0].bio);
            setRating(results.data.donor[0].ratings);
            setEmail(results.data.donor[0].email);
            setOwnerId(results.data.donor[0].user_id);
            ownerProfileUpdate({toUserName: results.data.donor[0].username, toUserProfile: results.data.donor[0].photo_url})
          })
          .catch((err) => console.log(err))
        await axios.get(`http://localhost:3005/api/username?username=${username}`)
          .then((user) => {
            if (user.data[0] === undefined) {
              user.data[0] = {first_name: '', last_name: '', email:'', user_id: 0}
            }
            console.log('user info', user.data[0])
            setUserInfo(user.data[0])
          })
          .catch((err) => console.log(err))
    }
    fetchData();
  }, []);

  return (
    <div className="details-page">
      <NavBar />
      <main>
        <Title order={1} className="type-of-transcation">{type ? type.toUpperCase() : 'SWAP'}</Title>
        <Grid justify="space-between">
          <Grid.Col span={8}><ImagesGallery images={images} /></Grid.Col>
          <Grid.Col span={4}><ListingDetails
            title={title}
            category={category}
            condition={condition}
            availableDate={availableDate}
            postTime={postTime}
            ownerEmail={email}
            userFirstName={userInfo.first_name}
            userLastName={userInfo.last_name}
            userEmail={userInfo.email}
            location={location}
            ownerFirstName={firstName}
            ownerLastName={lastName}
            receiver_id={userInfo.user_id}
            donor_id={ownerId}
          /></Grid.Col>
          <Grid.Col span={8}><Description description={description} location={location} /></Grid.Col>
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
