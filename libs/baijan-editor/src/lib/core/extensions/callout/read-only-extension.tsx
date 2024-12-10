import { ReactNodeViewRenderer } from '@tiptap/react';
// extensions
import { CustomCalloutBlock } from '..';
// config
import { CustomCalloutExtensionConfig } from './extension-config';

export const CustomCalloutReadOnlyExtension =
  CustomCalloutExtensionConfig.extend({
    selectable: false,
    draggable: false,

    addNodeView() {
      return ReactNodeViewRenderer(CustomCalloutBlock);
    },
  });
