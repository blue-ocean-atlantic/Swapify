import React, { useState } from 'react';
import { Image, Text } from '@mantine/core';

function Description({ description }) {
  return (
          <div>
            <h2>Description</h2>
            <p>{description}</p>
            <div>
              <Image
                width={700}
                height={300}
                // src={`https://www.mapquestapi.com/staticmap/v5/map?key=sTS6mcWJbTrsuieY33YkZojWLQQUSQhD&shape=radius:1.2mi|85304&size=700,300&zoom=13`}
                src={null}
                radius="lg"
                alt="With custom placeholder"
                withPlaceholder
                placeholder={<Text align="center">This image contained the map with radius</Text>}
              />
            </div>
          </div>
  )
}

export default Description;