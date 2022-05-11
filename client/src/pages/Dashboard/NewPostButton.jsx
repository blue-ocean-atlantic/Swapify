import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mantine/core';

function NewPostButton() {

  return (
    <Button color="blue" radius="xl" size={25} component={Link}
      to="/new" className="dash-new-listing">
      +
    </Button>
  );
}

export default NewPostButton;