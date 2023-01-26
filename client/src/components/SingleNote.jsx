import React, { useState } from "react";
import Button from "./Button";
import Heading from "./Heading";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import { setNote, editNote } from "../helper/apiCall";
import { toast } from "react-hot-toast";
import { UserContext } from "../context/userContext";
import { useContext } from "react";
import Loading from "../components/Loading";

function SingleNote({
  titleText,
  btnText,
  defTitle,
  defContent,
  defCategory,
  type,
  id,
}) {
  const [title, setTitle] = useState(defTitle);
  const [content, setContent] = useState(defContent);
  const [category, setCategory] = useState(defCategory);
  const navigate = useNavigate();
  const { isLoading, setLoading } = useContext(UserContext);

  const noteHandle = async (e) => {
    e.preventDefault();
    if (type === "create") {
      setLoading(true);
      const data = await setNote({ title, content, category });
      setLoading(false);
      if (!data) {
        return toast.error("Unable to create note");
      }
      toast.success(data);
    } else {
      setLoading(true);
      const data = await editNote({ id, title, content, category });
      setLoading(false);
      if (!data) {
        return toast.error("Unable to create note");
      }
      toast.success(data);
    }
    return navigate("/allnotes");
  };

  return (
    <section className="edit-section">
      <div className="allnotes-container">
        {isLoading && <Loading />}
        <Heading text={titleText} />
        <form onSubmit={noteHandle}>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Enter title"
              name="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput2" className="form-label">
              Content
            </label>
            <textarea
              type="text"
              className="form-control"
              id="exampleFormControlInput2"
              placeholder="Enter content in markdown"
              name="content"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
              cols="30"
              rows="4"
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput2" className="form-label">
              Preview
            </label>
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput2" className="form-label">
              Category
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput2"
              placeholder="Enter category"
              name="category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            />
          </div>

          <Button text={btnText} />
        </form>
      </div>
    </section>
  );
}

export default SingleNote;
