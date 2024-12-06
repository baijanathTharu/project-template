import { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
} from '@nextui-org/react';

type AssessmentType = 'quiz' | 'assignment' | 'project';

interface AddAssessmentProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (assessment: {
    type: AssessmentType;
    title: string;
    description: string;
  }) => void;
}

export default function AddAssessment({
  isOpen,
  onClose,
  onAdd,
}: AddAssessmentProps) {
  const [type, setType] = useState<AssessmentType>('quiz');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    onAdd({ type, title, description });
    setType('quiz');
    setTitle('');
    setDescription('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Add Assessment</ModalHeader>
        <ModalBody>
          <Select
            label="Assessment Type"
            selectedKeys={[type]}
            onSelectionChange={(keys) =>
              setType(Array.from(keys)[0] as AssessmentType)
            }
          >
            <SelectItem key="quiz" value="quiz">
              Quiz
            </SelectItem>
            <SelectItem key="assignment" value="assignment">
              Assignment
            </SelectItem>
            <SelectItem key="project" value="project">
              Project
            </SelectItem>
          </Select>
          <Input
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onPress={handleSubmit}>
            Add
          </Button>
          <Button onPress={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
