import React, { useState } from 'react';
import { Calendar } from '@mantine/dates';
import { Indicator, Group, Button, useMantineTheme, Space, MantineProvider } from '@mantine/core';
import { showNotification, NotificationsProvider } from '@mantine/notifications';
import { TimeInput } from '@mantine/dates';
import emailjs from '@emailjs/browser';
import moment from 'moment';
import EMAIL_ID from '../../../../config.js';

function AvailCalender({ availableDate }) {
  const theme = useMantineTheme();
  const available = new Date(availableDate);
  const [value, setValue] = useState(available);
  const [timeValue, setTimeValue] = useState(new Date());
  const scheduleButton = () => {
    console.log(moment(value).format("MMM Do YYYY"))
    console.log(moment(timeValue).format('LT'))
  }
 //...........................

  const sendEmail = () => {
    const templateParams = {
      user: 'James',
      owner: 'Check this out!',
      email: 'justinchen9387@gmail.com, siennaj1121@gmail.com',
      location: '12345',
      date: moment(value).format("MMM Do YYYY") + 'at' +  moment(timeValue).format('LT')
    };

    emailjs.send('service_0pikbde', EMAIL_ID.TEMPLATE_ID, templateParams, EMAIL_ID.USER_ID)
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
       console.log('FAILED...', error);
    });
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
        date.getMonth() === available.getMonth() && date.getDate() === available.getDate()
          ? { backgroundColor: theme.colors.red[9], color: theme.white }
          : null
      }
    />
      </Group>
      <Space h="xl"/>
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
      <Space h="xl"/>
      <Group position="center">
        <Button radius="xl" size="lg" onClick={() =>
          showNotification({
            title: 'Confirmed',
            message: 'You will receive a confirmation email soon.'
          })
        }>Confirm</Button>
      </Group>
      </NotificationsProvider>
      </MantineProvider>
    </div>
  )
}

export default AvailCalender;