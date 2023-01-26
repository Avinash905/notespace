import React from "react";
import Button from "../components/Button";
import "../styles/note.css";
import { NavLink, useNavigate } from "react-router-dom";
import { deleteNote } from "../helper/apiCall";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import toast from "react-hot-toast";

function Note({ title, content, category, createdAt, index, id }) {
  const navigate = useNavigate();

  const delFunc = async (id) => {
    const sureity = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (sureity) {
      const data = await deleteNote(id);
      if (!data) {
        return toast.error("Error while deleting note");
      }
      toast.success("Note deleted successfully");
      return window.location.reload(false);
    }
  };

  return (
    <div className="accordion-item my-2">
      <h2 className="accordion-header" id={index}>
        <div
          className="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#collapse${index}`}
          aria-expanded="true"
          aria-controls="collapseOne"
        >
          <strong>{title}</strong>
          <div className="edit-del-btn">
            <NavLink to={`/note/${id}`}>
              <Button text={"edit"} />
            </NavLink>
            <button
              className="button"
              onClick={() => {
                delFunc(id);
              }}
            >
              delete
            </button>
          </div>
        </div>
      </h2>
      <div
        id={`collapse${index}`}
        className="accordion-collapse collapse show"
        aria-labelledby="headingOne"
        data-bs-parent="#accordionExample"
      >
        <div className="accordion-body">
          <span className="badge">{category}</span>
          <ReactMarkdown className="accordion-text">{content}</ReactMarkdown>
          <footer className="blockquote-footer">
            Created at: {Date(createdAt).split("G")[0] || ""}
          </footer>
        </div>
      </div>
    </div>
  );
}

export default Note;
