import { useState } from 'react';
import {
  Input,
  Textarea,
  Button,
  Card,
  CardBody,
  CardHeader,
} from '@nextui-org/react';

export default function CreateCourse() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log({ title, description });
  };

  return (
    <Card className="max-w-xl mx-auto">
      <CardHeader>
        <h1 className="text-2xl font-bold">Create New Course</h1>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Course Title"
            placeholder="Enter course title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Textarea
            label="Course Description"
            placeholder="Enter course description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <Button type="submit" color="primary">
            Create Course
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
