import React from "react";
import SingleNote from "../components/SingleNote";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { NoteContext } from "../context/noteContext";

function EditNote() {
  const { notes } = useContext(NoteContext);
  const { id } = useParams();
  const val = notes.filter((note) => note._id === id);

  return (
    <SingleNote
      defTitle={val[0].title || ""}
      defContent={val[0].content || ""}
      defCategory={val[0].category || ""}
      btnText={"update"}
      titleText={"edit note"}
      type={"edit"}
      id={id}
    />
  );
}

export default EditNote;
