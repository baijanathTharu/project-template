import React, { useState } from 'react';
import { Textarea, Button } from '@nextui-org/react';
import ReactMarkdown from 'react-markdown';

interface MarkdownEditorProps {
  initialContent: string;
  onSave: (content: string) => void;
}

export default function MarkdownEditor({
  initialContent,
  onSave,
}: MarkdownEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    onSave(content);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="space-y-2">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          placeholder="Enter markdown content here..."
        />
        <div className="flex justify-end space-x-2">
          <Button color="primary" onPress={handleSave}>
            Save
          </Button>
          <Button onPress={() => setIsEditing(false)}>Cancel</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="prose max-w-none">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
      <Button onPress={() => setIsEditing(true)}>Edit</Button>
    </div>
  );
}
