import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextInput, Transition, ActionIcon } from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';

function SearchBar({ size = 'xl' }) {
  const navigate = useNavigate();
  const [query, setQuery] = useInputState('');

  const handleSearch = () => {
    navigate(`/results?query=${query.toLowerCase()}`);
  };

  return (
    <Container style={{ position: 'relative', width: '70%' }}>
      <TextInput
        size={size}
        placeholder="Search for swaps or favors"
        radius="xl"
        icon={
          <FontAwesomeIcon
            size={size === 'md' ? 'sm' : size}
            icon={faMagnifyingGlass}
          />
        }
        value={query}
        onChange={setQuery}
        onKeyUp={(e) => {
          if (e.code === 'Enter') {
            handleSearch();
          }
        }}
        rightSection={
          <Transition
            mounted={query.length > 0}
            transition="slide-right"
            duration={200}
            timingFunction="ease"
          >
            {(styles) => (
              <ActionIcon
                variant="transparent"
                style={{
                  ...styles,
                  position: 'absolute',
                  right: '40%',
                }}
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
    </Container>
  );
}

export default SearchBar;
