import React from 'react';
import {
  Button,
} from '@mantine/core';
import {
  faAngleLeft
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Button
        variant="subtle"
        onClick={() => {
          navigate(-1);
        }}
        leftIcon={<FontAwesomeIcon icon={faAngleLeft} />}
      >
        Back
      </Button>
    </div>
  )
}

export default BackButton;
