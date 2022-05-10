import React, { useState } from 'react';
import { Card, Image, Text, Badge, Button, Group, useMantineTheme, Spoiler } from '@mantine/core';
import Rating from './Rating.jsx';

function OwnerProfile({ profilePhoto, firstName, lastName, profileDescription, rating }) {
  const theme = useMantineTheme();

  const secondaryColor = theme.colorScheme === 'dark'
    ? theme.colors.dark[1]
    : theme.colors.gray[7];

  function add(accumulator, a) {
    return accumulator + a;
  }
  const ratingStar = (rating.reduce(add, 0)) / rating.length;

  return (
    <div style={{ width: 340, margin: 'auto' }}>
      <Card shadow="sm" p="lg">
        <Group position="apart" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
          <Card.Section>
            <Image
              src={profilePhoto}
              height={160}
              width={160}
              alt="Owner's photo"
              radius={160}
              withPlaceholder
              placeholder={<Text align="center">This Owenr didn't provide a photo</Text>}/>
          </Card.Section>

            <Text weight={700} size="xl">
              {firstName}
              {' '}
              {lastName}
            </Text>
        </Group>

        <Group position="left" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
          <Badge color="yellow" variant="light">
            4 Star +
          </Badge>
          <Badge color="pink" variant="light">
            Fast responder
          </Badge>
          <Badge color="green" variant="light">
            Reliable
          </Badge>
        </Group>

        <Group spacing="lg">
          <Rating rating={ratingStar} size="20px"/>
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