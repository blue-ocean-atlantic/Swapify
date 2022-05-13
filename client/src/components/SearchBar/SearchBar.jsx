import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  TextInput,
  Transition,
  ActionIcon,
  Grid,
  ThemeIcon,
  Group,
  Box,
} from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faArrowRight,
  faLocationCrosshairs,
} from '@fortawesome/free-solid-svg-icons';

function SearchBar({ variant = 'large' }) {
  const navigate = useNavigate();
  const [query, setQuery] = useInputState('');
  const [zip, setZip] = useState();

  useEffect(() => {
    const getZip = async () => {
      const ipResults = await axios.get('https://ipapi.co/json');
      setZip(ipResults.data.postal);
    };
    getZip();
  }, []);

  const handleSearch = () => {
    if (query) {
      navigate(`/results?query=${query.toLowerCase()}&zipcode=${zip}`);
    }
  };

  let height, size, iconSize, border, width;
  if (variant === 'large') {
    height = 50;
    iconSize = 'lg';
    size = 'lg';
    width = 750;
  } else if (variant === 'nav') {
    height = 42;
    border = '1px solid #bdbdbd';
    // iconSize = 'sm';
    size = 'md';
    width = 550;
  }

  return (
    <Box
      align="center"
      px={5}
      sx={() => ({
        backgroundColor: 'white',
        height,
        width,
        borderRadius: 50,
        border,
        margin: 'auto',
      })}
    >
      <Grid align="center" gutter="xs">
        <Grid.Col span={1}>
          <ThemeIcon variant="white" radius="xl" size={size} color="gray">
            <FontAwesomeIcon size={iconSize} icon={faMagnifyingGlass} />
          </ThemeIcon>
        </Grid.Col>
        <Grid.Col span={7}>
          <TextInput
            size={size}
            variant="unstyled"
            placeholder="Search for swaps or favors"
            onChange={setQuery}
            onKeyUp={(e) => {
              if (e.code === 'Enter') {
                handleSearch();
              }
            }}
          />
        </Grid.Col>
        <Grid.Col span={1}>
          <ThemeIcon variant="white" radius="xl" size={size} color="gray">
            <FontAwesomeIcon size={iconSize} icon={faLocationCrosshairs} />
          </ThemeIcon>
        </Grid.Col>
        <Grid.Col span={3}>
          <TextInput
            size={size}
            variant="unstyled"
            placeholder="ZIP"
            onChange={(e) => {
              setZip(e.target.value);
            }}
            onKeyUp={(e) => {
              if (e.code === 'Enter') {
                handleSearch();
              }
            }}
            rightSection={
              <Transition
                mounted={query}
                transition="slide-right"
                duration={150}
              >
                {(styles) => (
                  <ActionIcon
                    variant="transparent"
                    style={styles}
                    onClick={handleSearch}
                    color="blue"
                    radius="xl"
                  >
                    <FontAwesomeIcon size="xl" icon={faArrowRight} />
                  </ActionIcon>
                )}
              </Transition>
            }
          />
        </Grid.Col>
      </Grid>
    </Box>
    // <Container style={{ position: 'relative', width: '70%' }}>
    //   <TextInput
    //     size={size}
    //     placeholder="Search for swaps or favors"
    //     radius="xl"
    //     icon={
    //       <FontAwesomeIcon
    //         size={size === 'md' ? 'sm' : size}
    //         icon={faMagnifyingGlass}
    //       />
    //     }
    //     value={query}
    //     onChange={setQuery}
    //     onKeyUp={(e) => {
    //       if (e.code === 'Enter') {
    //         handleSearch();
    //       }
    //     }}
    //     rightSection={
    //       <Transition
    //         mounted={query.length > 0}
    //         transition="slide-right"
    //         duration={200}
    //         timingFunction="ease"
    //       >
    //         {(styles) => (
    //           <ActionIcon
    //             variant="transparent"
    //             style={{
    //               ...styles,
    //               position: 'absolute',
    //               right: '40%',
    //             }}
    //             onClick={handleSearch}
    //             color="blue"
    //             radius="xl"
    //           >
    //             <FontAwesomeIcon size="xl" icon={faArrowRight} />
    //           </ActionIcon>
    //         )}
    //       </Transition>
    //     }
    //   />
    // </Container>
  );
}

export default SearchBar;
