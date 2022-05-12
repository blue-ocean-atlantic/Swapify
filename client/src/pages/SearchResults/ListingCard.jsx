import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Container, Image, Group, Text, Badge } from '@mantine/core';

function ListingCard({ listing }) {
  // console.log('🚀 ~ ListingCard ~ listing', listing);
  return (
    <Container px={0}>
      <Card
        radius="lg"
        shadow="md"
        p="lg"
        component={Link}
        to={`/details/${listing.listing_id}`}
        sx={() => ({
          transition: '.3s',
          height: '100%',
          '&:hover': {
            transform: 'scale(1.03)',
          },
        })}
      >
        <Card.Section>
          <Image height={160} src={listing.image_url} />
          <Badge
            variant="light"
            color={listing.type === 'favor' ? 'violet' : 'blue'}
            style={{ position: 'absolute', top: 10, right: 10 }}
          >
            {listing.type}
          </Badge>
        </Card.Section>
        {/* <Group position="apart" style={{ marginBottom: 5, marginTop: 15 }}> */}
        <Text
          weight="bold"
          transform="uppercase"
          style={{ marginBottom: 5, marginTop: 10, 'letter-spacing': '1px' }}
        >
          {listing.title}
        </Text>
        <Text
          style={{ marginBottom: 5, marginTop: 10, 'letter-spacing': '1px' }}
        >
          Located at {listing.zipcode}
        </Text>
        <Text
          style={{ marginBottom: 5, marginTop: 10, 'letter-spacing': '1px' }}
        >
          Distance from: {listing.distance} mi
        </Text>
        {/* <Badge
            variant="light"
            color={listing.type === 'favor' ? 'violet' : 'blue'}
            // style={{ position: 'absolute', top: 10, right: 10 }}
          >
            {listing.type}
          </Badge> */}
        {/* </Group> */}
        <Text size="sm" lineClamp={3} component="em">
          {listing.description}
        </Text>
      </Card>
    </Container>
  );
}

export default ListingCard;
