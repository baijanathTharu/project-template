import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Accordion,
  AccordionItem,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import AddAssessment from '../components/AddAssessment';
import MarkdownEditor from '../components/MarkdownEditor';

interface Topic {
  id: number;
  title: string;
  content: string;
  assessments: Assessment[];
}

interface Chapter {
  id: number;
  title: string;
  topics: Topic[];
  assessments: Assessment[];
}

interface Assessment {
  id: number;
  type: 'quiz' | 'assignment' | 'project';
  title: string;
  description: string;
}

interface Course {
  id: number;
  title: string;
  chapters: Chapter[];
  assessments: Assessment[];
}

const initialCourse: Course = {
  id: 1,
  title: 'Introduction to React.js',
  chapters: [
    {
      id: 1,
      title: 'Getting Started with React',
      topics: [
        {
          id: 1,
          title: 'What is React?',
          content:
            'React is a JavaScript library for building user interfaces.',
          assessments: [],
        },
        {
          id: 2,
          title: 'Setting up your development environment',
          content:
            "To get started with React, you'll need Node.js and npm installed.",
          assessments: [],
        },
      ],
      assessments: [],
    },
    {
      id: 2,
      title: 'React Components',
      topics: [
        {
          id: 3,
          title: 'Functional Components',
          content:
            'Functional components are the modern way to write React components.',
          assessments: [],
        },
        {
          id: 4,
          title: 'Class Components',
          content:
            'Class components are an older way to write React components.',
          assessments: [],
        },
        {
          id: 5,
          title: 'Props and State',
          content:
            'Props and state are fundamental concepts in React for managing data.',
          assessments: [],
        },
      ],
      assessments: [],
    },
  ],
  assessments: [],
};

export default function CourseStructure() {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course>(initialCourse);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newItemType, setNewItemType] = useState<'chapter' | 'topic' | null>(
    null
  );
  const [newItemTitle, setNewItemTitle] = useState('');
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false);

  const handleAddItem = () => {
    if (newItemType === 'chapter') {
      setCourse({
        ...course,
        chapters: [
          ...course.chapters,
          { id: Date.now(), title: newItemTitle, topics: [], assessments: [] },
        ],
      });
    } else if (newItemType === 'topic' && selectedChapter !== null) {
      setCourse({
        ...course,
        chapters: course.chapters.map((chapter) =>
          chapter.id === selectedChapter
            ? {
                ...chapter,
                topics: [
                  ...chapter.topics,
                  {
                    id: Date.now(),
                    title: newItemTitle,
                    content: '',
                    assessments: [],
                  },
                ],
              }
            : chapter
        ),
      });
    }
    onClose();
    setNewItemTitle('');
  };

  const handleAddAssessment = (assessment: Omit<Assessment, 'id'>) => {
    const newAssessment = { ...assessment, id: Date.now() };
    if (selectedChapter === null && selectedTopic === null) {
      setCourse({
        ...course,
        assessments: [...course.assessments, newAssessment],
      });
    } else if (selectedChapter !== null && selectedTopic === null) {
      setCourse({
        ...course,
        chapters: course.chapters.map((chapter) =>
          chapter.id === selectedChapter
            ? {
                ...chapter,
                assessments: [...chapter.assessments, newAssessment],
              }
            : chapter
        ),
      });
    } else if (selectedChapter !== null && selectedTopic !== null) {
      setCourse({
        ...course,
        chapters: course.chapters.map((chapter) =>
          chapter.id === selectedChapter
            ? {
                ...chapter,
                topics: chapter.topics.map((topic) =>
                  topic.id === selectedTopic
                    ? {
                        ...topic,
                        assessments: [
                          ...(topic.assessments || []),
                          newAssessment,
                        ],
                      }
                    : topic
                ),
              }
            : chapter
        ),
      });
    }
    setIsAssessmentModalOpen(false);
  };

  const handleUpdateTopicContent = (
    chapterId: number,
    topicId: number,
    content: string
  ) => {
    setCourse({
      ...course,
      chapters: course.chapters.map((chapter) =>
        chapter.id === chapterId
          ? {
              ...chapter,
              topics: chapter.topics.map((topic) =>
                topic.id === topicId ? { ...topic, content } : topic
              ),
            }
          : chapter
      ),
    });
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{course.title}</h1>
      <Button
        onPress={() => {
          setNewItemType('chapter');
          onOpen();
        }}
      >
        Add Chapter
      </Button>
      <Button
        onPress={() => {
          setSelectedChapter(null);
          setSelectedTopic(null);
          setIsAssessmentModalOpen(true);
        }}
      >
        Add Course Assessment
      </Button>
      <Accordion>
        {course.chapters.map((chapter) => (
          <AccordionItem key={chapter.id} title={chapter.title}>
            <div className="space-y-2">
              <Button
                size="sm"
                onPress={() => {
                  setNewItemType('topic');
                  setSelectedChapter(chapter.id);
                  onOpen();
                }}
              >
                Add Topic
              </Button>
              <Button
                size="sm"
                onPress={() => {
                  setSelectedChapter(chapter.id);
                  setSelectedTopic(null);
                  setIsAssessmentModalOpen(true);
                }}
              >
                Add Chapter Assessment
              </Button>
              {chapter.topics.map((topic) => (
                <div key={topic.id} className="ml-4 space-y-2">
                  <h3 className="text-lg font-semibold">{topic.title}</h3>
                  <MarkdownEditor
                    initialContent={topic.content}
                    onSave={(content) =>
                      handleUpdateTopicContent(chapter.id, topic.id, content)
                    }
                  />
                  <Button
                    size="sm"
                    onPress={() => {
                      setSelectedChapter(chapter.id);
                      setSelectedTopic(topic.id);
                      setIsAssessmentModalOpen(true);
                    }}
                  >
                    Add Topic Assessment
                  </Button>
                </div>
              ))}
              <h4 className="font-semibold mt-4">Chapter Assessments:</h4>
              <ul className="list-disc list-inside">
                {chapter.assessments.map((assessment) => (
                  <li key={assessment.id}>
                    {assessment.type.charAt(0).toUpperCase() +
                      assessment.type.slice(1)}
                    : {assessment.title}
                  </li>
                ))}
              </ul>
            </div>
          </AccordionItem>
        ))}
      </Accordion>

      <h2 className="text-xl font-semibold mt-8">Course Assessments</h2>
      <ul className="list-disc list-inside">
        {course.assessments.map((assessment) => (
          <li key={assessment.id}>
            {assessment.type.charAt(0).toUpperCase() + assessment.type.slice(1)}
            : {assessment.title}
          </li>
        ))}
      </ul>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>
            {newItemType === 'chapter' ? 'Add Chapter' : 'Add Topic'}
          </ModalHeader>
          <ModalBody>
            <Input
              label={
                newItemType === 'chapter' ? 'Chapter Title' : 'Topic Title'
              }
              value={newItemTitle}
              onChange={(e) => setNewItemTitle(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onPress={handleAddItem}>
              Add
            </Button>
            <Button onPress={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <AddAssessment
        isOpen={isAssessmentModalOpen}
        onClose={() => setIsAssessmentModalOpen(false)}
        onAdd={handleAddAssessment}
      />
    </div>
  );
}
