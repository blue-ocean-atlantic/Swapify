import React, { useState } from 'react';
import { Image, Text, Divider } from '@mantine/core';

function Description({ description, location }) {
  return (
    <div>
      <h2>Description</h2>
      <p>{description}</p>
      <Divider my="lg" />
      <div>
        <Image
          width={700}
          height={300}
          src={`https://www.mapquestapi.com/staticmap/v5/map?key=sTS6mcWJbTrsuieY33YkZojWLQQUSQhD&shape=radius:1.2mi|${location}&size=700,300&zoom=13`}
          // src={null}
          radius="md"
          alt="With custom placeholder"
          withPlaceholder
          placeholder={
            <Text align="center">This image contained the map with radius</Text>
          }
        />
        <Text align="center" color="grey">
          Map is approximate to keep seller’s location private.
        </Text>
      </div>
    </div>
  );
}

export default Description;
