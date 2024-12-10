import { HocuspocusProvider } from '@hocuspocus/provider';
import { Extensions } from '@tiptap/core';
import { SlashCommands } from '../../core/extensions';
// plane editor types
import { TIssueEmbedConfig } from '../types';
// types
import { TExtensions, TUserDetails } from '../../core/types';

type Props = {
  disabledExtensions?: TExtensions[];
  issueEmbedConfig: TIssueEmbedConfig | undefined;
  provider: HocuspocusProvider;
  userDetails: TUserDetails;
};

export const DocumentEditorAdditionalExtensions = (_props: Props) => {
  const { disabledExtensions } = _props;
  const extensions: Extensions = disabledExtensions?.includes('slash-commands')
    ? []
    : [
        SlashCommands({
          disabledExtensions,
        }),
      ];

  return extensions;
};