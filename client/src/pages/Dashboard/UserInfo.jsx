import React, { useEffect, useState } from 'react';
import { Avatar, Button, Modal, Space, Title } from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import { IKContext, IKUpload } from 'imagekitio-react';

import axios from 'axios';

import dashStore from './dashStore.js';
import Rating from '../Details/Rating.jsx';
import '../Details/Rating.scss';
import './UserInfo.scss';

function UserInfo({ userInfo }) {
  console.log(userInfo);

  const [showEdit, toggleShowEdit] = useToggle(false, [false, true]);

  const handleUpload = (response) => {
    const newUrl = response.url;
    // console.log('🚀 ~ handleUpload ~ newUrl', newUrl);

    // UPDATE request with Axios to update DB with new profile image url (newUrl from above)
    // axios
    //   .put('/api/profile', { username: 'josh', url: newUrl })
    //   .then(() => {
    //     // Close modal after success
    //     toggleShowEdit();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    toggleShowEdit();
    // Maybe trigger a refresh or rerender to allow new profile image to be shown on page?
  };

  function add(accumulator, a) {
    return accumulator + a;
  }

  let ratingStar = 0;
  if (Object.keys(userInfo).length !== 0) {
    if (userInfo.ratings.length !== 0) {
      ratingStar = userInfo.ratings.reduce(add, 0) / userInfo.ratings.length;
    }
  }

  return (
    <div>
      <Modal
        opened={showEdit}
        onClose={() => {
          toggleShowEdit();
        }}
        title="Change Profile Picture"
      >
        <Title order={3}>Upload an image below</Title>
        <Space h="xl" />
        <IKContext
          publicKey="public_FMjtxsWyzDWFsDCkU+3LPha1J2E="
          urlEndpoint="https://ik.imagekit.io/joshandromidas"
          authenticationEndpoint="/api/imagekit"
        >
          <IKUpload
            onError={() => {
              console.log('something went wrong uploading the file');
            }}
            onSuccess={handleUpload}
          />
        </IKContext>
      </Modal>
      <Avatar
        src={userInfo.photo_url}
        alt={`${userInfo.first_name} ${userInfo.last_name}`}
        radius="xl"
        size={300}
      >
        {`${userInfo.first_name} ${userInfo.last_name}`}
      </Avatar>
      <Button
        onClick={() => {
          toggleShowEdit();
        }}
        fullWidth
        variant="subtle"
      >
        Edit profile picture
      </Button>
      <div className="user-info">
        <h4>username: {userInfo.username}</h4>
        <Rating rating={ratingStar} size="20px" />
      </div>
    </div>
  );
}

export default UserInfo;
