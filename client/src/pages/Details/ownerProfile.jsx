import React, { useState } from 'react';
import { Card, Image, Text, Badge, Button, Group, useMantineTheme, Spoiler, Avatar, Space } from '@mantine/core';
import Rating from './Rating.jsx';

function OwnerProfile({ profilePhoto, firstName, lastName, profileDescription, rating }) {
  const theme = useMantineTheme();

  const secondaryColor = theme.colorScheme === 'dark'
    ? theme.colors.dark[1]
    : theme.colors.gray[7];

  function add(accumulator, a) {
    return accumulator + a;
  }
  let ratingStar = 0;

  if (rating.length !== 0) {
    ratingStar = (rating.reduce(add, 0)) / rating.length;
  }

  return (
    <div style={{ width: 340, margin: 'auto' }}>
      <h2>Meet the owner/provider</h2>
      <Space h="lg" />
      <Card p="xl" radius="md">
        <Card.Section sx={{ backgroundImage: `url(https://i.pinimg.com/originals/8d/4e/17/8d4e17743cd519366c861b8db007284a.jpg)`, height: 140 }} />
        <Avatar src={profilePhoto} size={100} radius={100} mx="auto" mt={-50} />
        <Text align="center" size="lg" weight={500} mt="sm">
          {firstName}
          {' '}
          {lastName}
        </Text>

        <Group position="left" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
          {ratingStar >= 4 &&
            <Badge color="yellow" variant="light">
              4 Star +
            </Badge>
          }
          <Badge color="pink" variant="light">
            Fast responder
          </Badge>
          {ratingStar >= 3.7 &&
            <Badge color="green" variant="light">
              Reliable
            </Badge>
          }
        </Group>

        <Group spacing="lg">
          <Rating rating={ratingStar} size="20px" />
          <p>{rating.length} Ratings</p>
        </Group>
        <Spoiler maxHeight={70} showLabel="Show more" hideLabel="Hide">
          {profileDescription}
        </Spoiler>

      </Card>
    </div>
  );
}

export default OwnerProfile;