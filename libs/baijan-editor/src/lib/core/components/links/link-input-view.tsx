// components
import { LinkViewProps } from '.';

export const LinkInputView = ({}: {
  viewProps: LinkViewProps;
  switchView: (view: 'LinkPreview' | 'LinkEditView' | 'LinkInputView') => void;
}) => <p>LinkInputView</p>;
