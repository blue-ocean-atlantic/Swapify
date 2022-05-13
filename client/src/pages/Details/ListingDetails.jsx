import React, { useState } from 'react';
import { Title } from '@mantine/core';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Modal, Button, Group, Popover, Text, Space } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons'
import { ActionIcon } from '@mantine/core';
import { FacebookShareButton, FacebookIcon, RedditShareButton, RedditIcon, TwitterShareButton, TwitterIcon } from "react-share";
import './details.scss';
import AvailCalender from './AvailCalender.jsx';


function ListingDetails({ title, category, condition, availableDate, postTime,
  ownerEmail, userFirstName, userLastName, userEmail, location, ownerFirstName, ownerLastName, receiver_id, donor_id})
  {
  const [opened, setOpened] = useState(false);
  const [conditionOpened, setConditionOpened] = useState(false);

  return (
          <div className='listing-details'>
              <Title order={2} className="listing-title">{title}</Title>
              <Space h="lg" />
              <Text size="xl">Category: {category}</Text>
              <Space h="lg" />
              { condition !== '' &&
                <div>
                <Group spacing="xs">
                <Text size="xl">
                  Condition:
                </Text>
                <Popover
                  opened={conditionOpened}
                  onClose={() => setConditionOpened(false)}
                  target={<FontAwesomeIcon icon={faCircleQuestion} onClick={() => setConditionOpened((o) => !o)} />}
                  width={260}
                  position="bottom"
                  withArrow
                >
                  <div>
                    <Text size='lg'>New</Text>
                    <Text size='sm'>Unused, sealed and in the original packaging.</Text>
                    <Text size='lg'>Like New</Text>
                    <Text size='sm'>Lightly used and fully functional, but does not include the original packaging.</Text>
                    <Text size='lg'>Good</Text>
                    <Text size='sm'>Gently used and may have minor cosmetic flaws, but is fully functional.</Text>
                    <Text size='lg'>Fair</Text>
                    <Text size='sm'>Used and has multiple cosmetic flaws, but overall functional.</Text>
                    <Text size='lg'>Poor</Text>
                    <Text size='sm'>Heavily used, has major cosmetic flaws or damage. Non-functional or sold as parts.</Text>
                  </div>
                </Popover>
                <Text size="xl">
                  {condition}
                </Text>
              </Group>
              <Space h="lg" />
            </div>
            }
              <Text size="xl">Available Date: {moment(availableDate).format("MMM Do YY")}</Text>
            <Modal
              opened={opened}
              onClose={() => setOpened(false)}
              title="Available Date"
            >
              <AvailCalender
                availableDate={availableDate}
                ownerEmail={ownerEmail}
                userFirstName={userFirstName}
                userLastName={userLastName}
                userEmail={userEmail}
                location={location}
                ownerFirstName={ownerFirstName}
                ownerLastName={ownerLastName}
                donor_id={donor_id}
                receiver_id={receiver_id}
              />
            </Modal>
            <Space h="lg" />
            <Text size="xl">Posted: {moment(postTime).endOf('day').fromNow()} </Text>
            <Space h="xl" />
            {userFirstName === ''
              ? <Button
                  leftIcon={<FontAwesomeIcon icon={faCalendar} />} variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}
                  onClick={() => setOpened(true)}
                  size='xl'
                  disabled
                >
                  Schedule
                </Button>
              : <Button
                  leftIcon={<FontAwesomeIcon icon={faCalendar} />} variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}
                  onClick={() => setOpened(true)}
                  size='xl'
                >
                  Schedule
                </Button>
            }
            <Space h="xl" />
            {userFirstName === ''
              ? <Button
                  leftIcon={<FontAwesomeIcon icon={faComment}/>} variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}
                  size='xl'
                  disabled
                  >
                  Chat Now
                </Button>
              : <Button
                  leftIcon={<FontAwesomeIcon icon={faComment}/>} variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}
                  size='xl'
                  component={Link}
                  to="/chat"
                  >
                  Chat Now
                </Button>
            }
            <Space h="xl" />
            <Group>
              <FacebookShareButton
                url={window.location.href}
                quote={title}
              >
                <FacebookIcon size={32} borderRadius={5}/>
              </FacebookShareButton>
              <RedditShareButton
                url={window.location.href}
                title={title}
              >
                <RedditIcon size={32} borderRadius={5}/>
              </RedditShareButton>
              <TwitterShareButton
                url={window.location.href}
                title={title}
              >
                <TwitterIcon size={32} borderRadius={5}/>
              </TwitterShareButton>
            </Group>
          </div>
  )
}

export default ListingDetails;