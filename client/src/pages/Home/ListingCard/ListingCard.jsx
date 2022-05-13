import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  Container,
  Image,
  Group,
  Text,
  Badge,
  Space,
} from '@mantine/core';

function ListingCard({ listing, displayLocation = false }) {
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
          <Image height={160} src={listing.images_urls[0]} />
          <Badge
            variant="light"
            color={listing.type === 'favor' ? 'violet' : 'blue'}
            style={{ position: 'absolute', top: 10, right: 10 }}
          >
            {listing.type}
          </Badge>
        </Card.Section>
        <Text
          weight="bold"
          transform="uppercase"
          style={{ marginBottom: 5, marginTop: 10 }}
        >
          {listing.title}
        </Text>
        {displayLocation && (
          <>
            <Group position="apart">
              <Text>{listing.zipcode}</Text>
              <Text>{listing.distance} mi. away</Text>
            </Group>
            <Space h="sm" />
          </>
        )}
        <Text size="sm" lineClamp={3} component="em">
          {listing.description}
        </Text>
      </Card>
    </Container>
  );
}

export default ListingCard;
