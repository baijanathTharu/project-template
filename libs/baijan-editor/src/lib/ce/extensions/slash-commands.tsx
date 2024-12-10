// extensions
import { TSlashCommandAdditionalOption } from '../../core/extensions';
// types
import { TExtensions } from '../../core/types';

type Props = {
  disabledExtensions: TExtensions[];
};

export const coreEditorAdditionalSlashCommandOptions = (
  props: Props
): TSlashCommandAdditionalOption[] => {
  const {} = props;
  const options: TSlashCommandAdditionalOption[] = [];
  return options;
};
