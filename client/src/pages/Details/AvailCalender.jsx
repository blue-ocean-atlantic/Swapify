import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Calendar } from '@mantine/dates';
import {
  Indicator,
  Group,
  Button,
  useMantineTheme,
  Space,
  MantineProvider,
} from '@mantine/core';
import {
  showNotification,
  NotificationsProvider,
} from '@mantine/notifications';
import { TimeInput } from '@mantine/dates';
import emailjs from '@emailjs/browser';
import moment from 'moment';
import EMAIL_ID from '../../../../config.js';

function AvailCalender({
  availableDate,
  ownerEmail,
  userFirstName,
  userLastName,
  userEmail,
  location,
  ownerFirstName,
  ownerLastName,
  receiver_id,
  donor_id,
}) {
  const theme = useMantineTheme();
  const available = new Date(availableDate);
  const [value, setValue] = useState(available);
  const [timeValue, setTimeValue] = useState(new Date());
  const scheduleButton = () => {
    console.log({
      appointment_time:
        moment(value).format('MMM Do YYYY') +
        ' ' +
        moment(timeValue).format('LT'),
      receiver_id: receiver_id,
      donor_id: donor_id,
    });
    axios.post('http://localhost:3005/api/listing/appointment', {
      appointment_time:
        moment(value).format('MMM Do YYYY') +
        ' ' +
        moment(timeValue).format('LT'),
      receiver_id: receiver_id,
      donor_id: donor_id,
    });
  };
  //...........................

  const sendEmail = () => {
    const templateParams = {
      user: userFirstName + ' ' + userLastName,
      owner: ownerFirstName + ' ' + ownerLastName,
      email: 'joshandromidas@gmail.com',
      location: '78704',
      date:
        moment(value).format('MMM Do YYYY') +
        'at' +
        moment(timeValue).format('LT'),
    };

    emailjs
      .send(
        'service_0pikbde',
        EMAIL_ID.TEMPLATE_ID,
        templateParams,
        EMAIL_ID.USER_ID
      )
      .then(
        function (response) {
          console.log('SUCCESS!', response.status, response.text);
        },
        function (error) {
          console.log('FAILED...', error);
        }
      );
  };

  return (
    <div>
      <MantineProvider>
        <NotificationsProvider>
          <Group position="center">
            <Calendar
              value={value}
              onChange={setValue}
              minDate={available}
              dayStyle={(date) =>
                date.getMonth() === available.getMonth() &&
                date.getDate() === available.getDate()
                  ? { backgroundColor: theme.colors.red[9], color: theme.white }
                  : null
              }
            />
          </Group>
          <Space h="xl" />
          <Group position="center">
            <TimeInput
              defaultValue={new Date()}
              onChange={setTimeValue}
              label="Pick time"
              size="md"
              format="12"
              required
              clearable
            />
          </Group>
          <Space h="xl" />
          <Group position="center">
            <Button
              radius="xl"
              size="lg"
              component={Link}
              to="/"
              onClick={() => {
                showNotification({
                  title: 'Confirmed',
                  message: 'You will receive a confirmation email soon.',
                });
                scheduleButton();
                sendEmail();
              }}
            >
              Confirm
            </Button>
          </Group>
        </NotificationsProvider>
      </MantineProvider>
    </div>
  );
}

export default AvailCalender;
