import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Main = ({ activeNote, onUpdateNote }) => {
  const onEditField = (field, value) => {
    onUpdateNote({
      ...activeNote,
      [field]: value,
      lastModified: Date.now(),
    });
  };

  if (!activeNote) return <div className="no-active-note">No Active Note</div>;
  return (
    <div className="app-main">
      <h1>Lotion</h1>
      <div className="app-main-note-edit">
        <input
          type="text"
          id="title"
          placeholder="Note Title"
          value={activeNote.title}
          onChange={(e) => onEditField("title", e.target.value)}
          autoFocus
        />
        <ReactQuill
          id="body"
          placeholder="Write your note here..."
          value={activeNote.body}
          onChange={(value) => onEditField("body", value)}
        />
      </div>
      <div className="app-main-note-preview">
        <h1 className="preview-title">{activeNote.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: activeNote.body }} />
      </div>
    </div>
  );
};

export default Main;
