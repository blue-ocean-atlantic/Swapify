import React, { useState } from 'react';
import { Calendar } from '@mantine/dates';
import { Indicator, Group, Button, useMantineTheme, Space } from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import emailjs from '@emailjs/browser';
import moment from 'moment';
import USER_ID from '../../../../config.js';
import TEMPLATE_ID from '../../../../config.js';

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
        <Button radius="xl" size="lg" onClick={() => scheduleButton()}>Confirm</Button>
      </Group>
    </div>
  )
}

export default AvailCalender;