import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  Stack,
  TextInput,
  Group,
  ActionIcon,
  Center,
  Space,
  Transition,
  Container,
} from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';

import NavBar from '../../components/NavBar/NavBar.jsx';
import { useInputState } from '@mantine/hooks';

function Home() {
  const [query, setQuery] = useInputState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/results?query=${query}`);
  };

  return (
    <>
      <NavBar />
      <main>
        <Space h={50} />
        <Stack spacing={50}>
          {/* <Group position="center"> */}
          <Container style={{ position: 'relative', width: '70%' }}>
            <TextInput
              size="xl"
              placeholder="Search for swaps or favors"
              radius="xl"
              icon={<FontAwesomeIcon size="xl" icon={faMagnifyingGlass} />}
              // style={{ width: '70%', transition: 300 }}
              value={query}
              onChange={setQuery}
              onKeyUp={(e) => {
                if (e.code === 'Enter') {
                  handleSearch();
                }
              }}
            />
            <Transition
              mounted={query.length > 0}
              transition="slide-right"
              duration={200}
              timingFunction="ease"
            >
              {(styles) => (
                <ActionIcon
                  style={{
                    ...styles,
                    position: 'absolute',
                    right: 30,
                    top: 16,
                  }}
                  onClick={handleSearch}
                  // color="gray"
                >
                  <FontAwesomeIcon size="xl" icon={faArrowRight} />
                </ActionIcon>
              )}
            </Transition>
          </Container>
          {/* </Group> */}
          <Center>
            <Button radius="xl" size="lg">
              Get Started
            </Button>
          </Center>
          <Space />
          {query.length ? (
            <Center>
              <strong>{query}</strong>
            </Center>
          ) : null}
        </Stack>
      </main>
    </>
  );
}

export default Home;

// const request = '/api/listings/landing'; // GET
// const dreamData = {
//   results: [
//     {
//       listing_id: Number,
//       type: String, // "swap" or "favor"
//       title: String,
//       description: String,
//       image_url: String,
//       user_id: String, // Should be same as email I think
//       user_avatar_url: String,
//     },
//   ],
// };

// const request = "/api/listings";
// const dreamData = {
//   "results": [
//      {
//         "listing_id":19975,
//         "type":"swap",
//         "title":"Chair",
//         "description":"This is a chair in good condition, I bought it a while ago but don't need it anymore. Open to see what you want to trade!",
//         "image_url":"https://imagekit.io/url-path",
//         "username":"joshandromidas@gmail.com",
//         "user_avatar_url":"https://imagekit.io/avatar-pic-url-path"
//      },
//      ...
//   ]
// }
