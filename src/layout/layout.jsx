import ReactMarkdown from "react-markdown";

const Main = ({ activeNote, onUpdateNote }) => {
  const onEditField = (field, value) => {
    onUpdateNote({
      ...activeNote,
      [field]: value,
      lastModified: Date.now(),
    });
  };

  if (!activeNote) return <div className="no-active-note">No Active Note</div>;

  const onAddMarkdown = (startTag, endTag) => {
    const field = document.getElementById("body");
    const start = field.selectionStart;
    const end = field.selectionEnd;
    const selectedText = field.value.substring(start, end);
    const beforeText = field.value.substring(0, start);
    const afterText = field.value.substring(end);
    let newText = `${startTag}${selectedText}${endTag}`;

    field.value = beforeText + newText + afterText;
    field.setSelectionRange(start + startTag.length, end + startTag.length);
    onEditField("body", field.value);
    if (startTag === "\n1. ") {
      newText = selectedText
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line !== "")
        .map((line) => `1. ${line}`)
        .join("\n");
    } else if (startTag === "\n- ") {
      newText = selectedText
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line !== "")
        .map((line) => `- ${line}`)
        .join("\n");
    } else {
      newText = `${startTag}${selectedText}${endTag}`;
    }
    field.value = beforeText + newText + afterText;
    onEditField("body", field.value);
  };
  

  const onChangeFont = (font) => {
    const field = document.getElementById("body");
    field.style.fontFamily = font;
    onEditField("body", field.value);
  };

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
        <div className="toolbar">
          <select onChange={(e) => onChangeFont(e.target.value)}>
            <option value="">Font</option>
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
          </select>
          <button onClick={() => onAddMarkdown("**", "**")}>&#119809;</button>
          <button onClick={() => onAddMarkdown("_", "_")}>&#8520;</button>
          <button onClick={() => onAddMarkdown("~~", "~~")}>&#9089;</button>
          <button onClick={() => onAddMarkdown("\n1. ", "")}>1&#9776;</button>
          <button onClick={() => onAddMarkdown("\n- ", "")}>&#176;&#9776;</button>
        </div>
        <textarea
          id="body"
          placeholder="Write your note here..."
          value={activeNote.body}
          onChange={(e) => onEditField("body", e.target.value)}
        />
      </div>
      <div className="app-main-note-preview">
        <h1 className="preview-title">{activeNote.title}</h1>
        <ReactMarkdown className="markdown-preview">
          {activeNote.body}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Main;
