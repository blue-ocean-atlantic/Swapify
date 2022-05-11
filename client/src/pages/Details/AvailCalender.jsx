import React, { useState } from 'react';
import { Calendar } from '@mantine/dates';
import { Indicator, Group, Button, useMantineTheme, Space } from '@mantine/core';
import emailjs from '@emailjs/browser';
import moment from 'moment';
import  { USER_ID, TEMPLATE_ID } from '../../../../config.js';

function AvailCalender({ availableDate }) {
  const theme = useMantineTheme();
  const available = new Date(availableDate);
  const [value, setValue] = useState(available);
  const scheduleButton = () => {
    console.log(moment(value).format("MMM Do YYYY"))
  }
 //...........................

  const sendEmail = (e) => {
    const templateParams = {
      user: 'James',
      owner: 'Check this out!',
      email: 'justinchen9387@gmail.com',
      message: 'hello',
      date: moment(value).format("MMM Do YYYY")
    };

    emailjs.send('service_0pikbde', TEMPLATE_ID, templateParams, USER_ID)
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
       console.log('FAILED...', error);
    });
  };

  return (
    <div>
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
        <Button radius="xl" size="lg" onClick={() => scheduleButton()}>Confirm</Button>
      </Group>
    </div>
  )
}

export default AvailCalender;