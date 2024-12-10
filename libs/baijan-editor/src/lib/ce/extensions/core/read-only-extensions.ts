import { Extensions } from '@tiptap/core';
// types
import { TExtensions } from '../../../core/types';

type Props = {
  disabledExtensions: TExtensions[];
};

export const CoreReadOnlyEditorAdditionalExtensions = (
  props: Props
): Extensions => {
  const {} = props;
  return [];
};
