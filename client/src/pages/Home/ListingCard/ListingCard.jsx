import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Container, Image, Group, Text, Badge } from '@mantine/core';

function ListingCard({ listing }) {
  console.log('🚀 ~ ListingCard ~ listing', listing);
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
          '&:hover': {
            transform: 'scale(1.03)',
          },
        })}
      >
        <Card.Section>
          <Image height={160} src={listing.image_url} />
        </Card.Section>
        <Group position="apart" style={{ marginBottom: 5, marginTop: 15 }}>
          <Text weight={500}>{listing.title}</Text>
          <Badge
            variant="light"
            color={listing.type === 'favor' ? 'violet' : 'blue'}
          >
            {listing.type}
          </Badge>
        </Group>
        <Text lineClamp={3} component="em">
          {listing.description}
        </Text>
      </Card>
    </Container>
  );
}

export default ListingCard;
