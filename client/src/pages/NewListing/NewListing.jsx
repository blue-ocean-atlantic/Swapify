import React, { useState } from 'react';
import { z } from 'zod';
import axios from 'axios';
import uuid from 'react-uuid';
import {
  Button,
  Center,
  Container,
  SegmentedControl,
  Space,
  Text,
  Textarea,
  TextInput,
  Title,
  Group,
  Stack,
  SimpleGrid,
  Image,
  Select,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm, zodResolver } from '@mantine/form';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';

import NavBar from '../../components/NavBar/NavBar.jsx';
import { categories, conditions } from './categories.js';

const schema = z.object({
  title: z.string().min(2, { message: 'Name should have at least 2 letters' }),
  description: z.string().min(10, {
    message: 'Please give a longer description (at least 10 characters)',
  }),
});

function NewListing() {
  const [type, setType] = useState('swap');
  const [uploadedImages, setUploadedImages] = useState([]);

  const form = useForm({
    initialValues: {
      title: '',
      description: '',
      available_date: new Date(),
      category: '',
      condition: '',
    },
    schema: zodResolver(schema),
  });

  const DropzoneChildren = (props) => {
    return uploadedImages.length === 0 ? (
      <Group
        position="center"
        spacing="xl"
        style={{ minHeight: 220, pointerEvents: 'none' }}
      >
        <div>
          <Text size="xl" inline>
            Drag images here or click to select files
          </Text>
          <Text size="sm" color="dimmed" inline mt={7}>
            Attach as many files as you like, each file should not exceed 5mb
          </Text>
        </div>
      </Group>
    ) : (
      <SimpleGrid style={{ minHeight: 220, pointerEvents: 'none' }} cols={4}>
        {uploadedImages.map((url) => (
          <Center key={url}>
            <Image height={100} width={100} key={uuid()} src={url} />
          </Center>
        ))}
      </SimpleGrid>
    );
  };

  const handleUpload = async (file) => {
    try {
      const auth = await axios.get('api/imagekit');

      const formData = new FormData();
      formData.append('file', file);
      formData.append('publicKey', 'public_FMjtxsWyzDWFsDCkU+3LPha1J2E=');
      formData.append('fileName', file.name);
      formData.append('signature', auth.data.signature);
      formData.append('expire', auth.data.expire);
      formData.append('token', auth.data.token);
      formData.append('useUniqueFileName', true);

      const response = await axios.post(
        'https://upload.imagekit.io/api/v1/files/upload',
        formData
      );

      setUploadedImages((curr) => [...curr, response.data.url]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <NavBar />
      <Space h="lg" />
      <Container
        radius="xl"
        p={30}
        style={{ backgroundColor: 'white', borderRadius: 15 }}
      >
        <Title order={1}>New Listing</Title>
        <Center>
          <SegmentedControl
            value={type}
            onChange={setType}
            radius="xl"
            size="lg"
            data={[
              { label: 'Swap', value: 'swap' },
              { label: 'Favor', value: 'favor' },
            ]}
          />
        </Center>
        <Container style={{ width: '70%' }}>
          <form
            onSubmit={form.onSubmit((values) => {
              console.log('Submitted!', { ...values, images: uploadedImages });
            })}
          >
            <Stack spacing="lg">
              <TextInput
                required
                size="lg"
                label="Title"
                placeholder="My cool item"
                {...form.getInputProps('title')}
              />
              <Textarea
                required
                size="lg"
                label="Description"
                placeholder="This item is cool"
                autosize
                minRows={2}
                {...form.getInputProps('description')}
              />
              <DatePicker
                required
                size="lg"
                label="Available date"
                placeholder="Pick date"
                firstDayOfWeek="sunday"
                minDate={new Date()}
                {...form.getInputProps('available_date')}
              />
              <Select
                required
                size="lg"
                label="Category"
                data={categories}
                {...form.getInputProps('category')}
              />
              {type === 'swap' && (
                <Select
                  required
                  size="lg"
                  label="Condition"
                  data={conditions}
                  {...form.getInputProps('condition')}
                />
              )}
              <Group grow direction="column" spacing="xs">
                <Text weight={500} size="lg">
                  Upload photos
                </Text>
                <Dropzone
                  onDrop={(files) => {
                    console.log('🚀 ~ NewListing ~ ALL UPLOADED files', files);
                    files.forEach((file) => {
                      console.log('🚀 ~ files.forEach ~ file', file);
                      handleUpload(file);
                    });
                  }}
                  onReject={(files) => console.log('rejected files', files)}
                  maxSize={3 * 1024 ** 2}
                  accept={IMAGE_MIME_TYPE}
                >
                  {() => DropzoneChildren()}
                </Dropzone>
              </Group>
              <Space h="xl" />
              <Button size="xl" type="submit">
                Submit
              </Button>
            </Stack>
          </form>
        </Container>
        <Space h="xl" />
      </Container>
      <Space h="xl" />
    </>
  );
}

export default NewListing;

// const request = '/api/listings'; // POST
// // Should an authorization header be sent as well to make sure a listing can
// // be made only when a user is logged in? (i.e. nobody can create a listing
// // using only someone's ID/username)
// const body = {
//   user_id: String,
//   title: String,
//   description: String,
//   type: String, // swap or trade
//   images: [String, String], // should be imagekit.io urls, I'll figure out how to get that functionality to work
//   avaiable_date: String, // timecode -- backend team can decide what format exactly
//   created_date: String, // timecode -- maybe this is better generated on the backend? i.e. I wouldn't send it, you'd generate it upon DB write
// };
