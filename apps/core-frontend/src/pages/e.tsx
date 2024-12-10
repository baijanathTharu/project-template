import { IMentionHighlight, RichTextEditorWithRef } from '@libs/baijan-editor';

export function EPage() {
  return (
    <div className="p-8">
      <RichTextEditorWithRef
        bubbleMenuEnabled={true}
        dragDropEnabled={true}
        disabledExtensions={[]}
        fileHandler={{
          getAssetSrc: function (path: string): Promise<string> {
            throw new Error('Function not implemented.');
          },
          cancel: function (): void {
            throw new Error('Function not implemented.');
          },
          delete: function (assetUrlWithWorkspaceId: string): Promise<void> {
            throw new Error('Function not implemented.');
          },
          upload: function (file: File): Promise<string> {
            throw new Error('Function not implemented.');
          },
          restore: function (assetUrlWithWorkspaceId: string): Promise<void> {
            throw new Error('Function not implemented.');
          },
          validation: {
            maxFileSize: 0,
          },
        }}
        id={''}
        initialValue={''}
        mentionHandler={{
          highlights: function (): Promise<IMentionHighlight[]> {
            throw new Error('Function not implemented.');
          },
          suggestions: undefined,
        }}
      />
    </div>
  );
}
