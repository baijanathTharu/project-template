import { forwardRef } from 'react';
// components
import { ReadOnlyEditorWrapper } from '..';
// types
import { EditorReadOnlyRefApi, ILiteTextReadOnlyEditor } from '../../../types';

const LiteTextReadOnlyEditorWithRef = forwardRef<
  EditorReadOnlyRefApi,
  ILiteTextReadOnlyEditor
>((props, ref) => (
  <ReadOnlyEditorWrapper
    {...props}
    forwardedRef={ref as React.MutableRefObject<EditorReadOnlyRefApi | null>}
  />
));

LiteTextReadOnlyEditorWithRef.displayName = 'LiteReadOnlyEditorWithRef';

export { LiteTextReadOnlyEditorWithRef };
