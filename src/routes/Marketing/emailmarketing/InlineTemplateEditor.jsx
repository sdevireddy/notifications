import StudioEditor from '@grapesjs/studio-sdk/react';
import { rteTinyMce, canvasEmptyState, canvasFullSize, layoutSidebarButtons } from '@grapesjs/studio-sdk-plugins';
import '@grapesjs/studio-sdk/style';
import { useRef } from 'react';

export default function App() {
  const editorRef = useRef(null);

  const handleExport = () => {
    const editor = editorRef.current;
    if (!editor) return;

    const { html, css } = editor.exportHtml();
    const fullHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>${css}</style>
        </head>
        <body>${html}</body>
      </html>`;

    console.log(fullHtml); // or send to backend
  };
  return (
    <>
    <StudioEditor
      options={{
        licenseKey: 'e76f0c12522c4dc090b6f6eff1535de361c0a98c39e44621a8dfb6d7870f1970',
      project: {
        type: 'email',
        // TODO: replace with a unique id for your projects. e.g. an uuid
        id: 'UNIQUE_PROJECT_ID'
      },
      identity: {
        // TODO: replace with a unique id for your end users. e.g. an uuid
        id: 'UNIQUE_END_USER_ID'
      },
      assets: {
        storageType: 'cloud'
      },
      storage: {
        type: 'cloud',
        autosaveChanges: 100,
        autosaveIntervalMs: 10000
      },
      plugins: [
        rteTinyMce.init({ /* Plugin options: https://app.grapesjs.com/docs-sdk/plugins/rte/tinymce */ }),
        canvasEmptyState.init({ /* Plugin options: https://app.grapesjs.com/docs-sdk/plugins/canvas/emptyState */ }),
        canvasFullSize.init({ /* Plugin options: https://app.grapesjs.com/docs-sdk/plugins/canvas/full-size */ }),
        layoutSidebarButtons.init({ /* Plugin options: https://app.grapesjs.com/docs-sdk/plugins/layout/sidebar-buttons */ })
      ]
      }}
      
    />
          <button onClick={handleExport}>Export HTML</button>

</>
  );
}