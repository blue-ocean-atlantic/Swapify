import React, { useState } from 'react';
import { Title } from '@mantine/core';
import moment from 'moment';
import { Modal, Button, Group } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons'
import { ActionIcon } from '@mantine/core';
import './details.scss';
import AvailCalender from './AvailCalender.jsx';


function ListingDetails({ title, category, condition, availableDate, postTime }) {
  const [opened, setOpened] = useState(false);

  return (
          <div className='listing-details'>
            <Title order={2} className="listing-title">{title}</Title>
            <p>Category: {category}</p>
            <p>Condition: {condition}</p>
            <Group spacing="lg">
              <p>Available Date: {moment(availableDate).format("MMM Do YY")}</p>
              <ActionIcon color="blue" size="lg" radius="md">
                <FontAwesomeIcon icon={faCalendar} onClick={() => setOpened(true)}/>
              </ActionIcon>
            </Group>
            <Modal
              opened={opened}
              onClose={() => setOpened(false)}
              title="Available Date"
            >
              <AvailCalender availableDate={availableDate}/>
            </Modal>
            <p>Posted: {moment(postTime).endOf('day').fromNow()} </p>
            <Button leftIcon={<FontAwesomeIcon icon={faComment}/>} variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>Chat Now</Button>
          </div>
  )
}

export default ListingDetails;