import React, { useEffect } from "react";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Note from "../components/Note";
import "../styles/allnotes.css";
import { NavLink } from "react-router-dom";
import Loading from "../components/Loading";
import { getAllNotes } from "../helper/apiCall";
import { useContext } from "react";
import { NoteContext } from "../context/noteContext";
import { UserContext } from "../context/userContext";

function AllNotes() {
  const { notes, setNotes } = useContext(NoteContext);
  const { isLoading, setLoading } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await getAllNotes();
      setNotes(data);
      setLoading(false);
    })();
  }, []);

  return (
    <section className="allnotes-section">
      <div className="allnotes-container">
        <Heading text={"welcome back zen"} />
        {isLoading && <Loading />}
        <NavLink to={"/createnote"}>
          <Button text={"create new note"} />
        </NavLink>
        <div className="accordion" id="accordionExample">
          {notes?.map((note, i) => {
            return (
              <Note
                index={i}
                key={i}
                id={note._id}
                title={note.title}
                content={note.content}
                category={note.category}
                createdAt={note.createdAt}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default AllNotes;
