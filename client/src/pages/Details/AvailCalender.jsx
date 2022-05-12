import React, { useState } from 'react';
import { Calendar } from '@mantine/dates';
import { Indicator, Group } from '@mantine/core';

function AvailCalender({ availableDate }) {
  const today = new Date();
  const [value, setValue] = useState(today);
  const available = new Date(availableDate);
  const availableDay = available.getDate();

  return (
    <Group position="center">
      <Calendar
        disableOutsideEvents
        value={value}
        onChange={setValue}
        renderDay={(date) => {
          const day = date.getDate();
          return (
            <Indicator size={10} color="red" offset={8} inline label="Available" disabled={day !== availableDay}>
              <div>{day}</div>
            </Indicator>
          );
        }}
      />
    </Group>
  )
}

export default AvailCalender;