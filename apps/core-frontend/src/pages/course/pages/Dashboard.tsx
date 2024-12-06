import { Card, CardBody, CardHeader, Button } from '@nextui-org/react';
import { Link } from 'react-router-dom';

const courses = [
  { id: 1, title: 'Introduction to React.js', chapters: 5, topics: 15 },
  { id: 2, title: 'Node.js Fundamentals', chapters: 4, topics: 12 },
  { id: 3, title: 'Advanced JavaScript Concepts', chapters: 6, topics: 18 },
];

export default function Dashboard() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Course Management Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <Card key={course.id}>
            <CardHeader className="flex justify-between">
              <h2 className="text-lg font-semibold">{course.title}</h2>
              <Link to={`/course/${course.id}`}>
                <Button size="sm">Manage</Button>
              </Link>
            </CardHeader>
            <CardBody>
              <p>Chapters: {course.chapters}</p>
              <p>Topics: {course.topics}</p>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
