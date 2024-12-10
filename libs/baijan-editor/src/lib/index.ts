// styles
// import "./styles/tailwind.css";
import './styles/variables.css';
import './styles/editor.css';
import './styles/table.css';
import './styles/github-dark.css';
import './styles/drag-drop.css';

// editors
export {
  CollaborativeDocumentEditorWithRef,
  CollaborativeDocumentReadOnlyEditorWithRef,
  DocumentReadOnlyEditorWithRef,
  LiteTextEditorWithRef,
  LiteTextReadOnlyEditorWithRef,
  RichTextEditorWithRef,
  RichTextReadOnlyEditorWithRef,
} from './core/components/editors';

export { isCellSelection } from './core/extensions/table/table/utilities/is-cell-selection';

// constants
export * from './core/constants/common';

// helpers
export * from './core/helpers/common';
export * from './core/helpers/editor-commands';
export * from './core/helpers/yjs';
export * from './core/extensions/table/table';

// components
export * from './core/components/menus';

// hooks
export { useEditor } from './core/hooks/use-editor';
export {
  type IMarking,
  useEditorMarkings,
} from './core/hooks/use-editor-markings';
export { useReadOnlyEditor } from './core/hooks/use-read-only-editor';

// types
export type { CustomEditorProps } from './core/hooks/use-editor';
export * from './core/types';
