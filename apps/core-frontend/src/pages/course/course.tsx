import CourseStructure from './pages/CourseStructure';
import CreateCourse from './pages/CreateCourse';
import Dashboard from './pages/Dashboard';

export function CoursePage() {
  return (
    <div className="px-8">
      <div className="py-8">
        <Dashboard />
      </div>
      <div className="py-8">
        <CreateCourse />
      </div>
      <div className="py-8">
        <CourseStructure />
      </div>
    </div>
  );
}
