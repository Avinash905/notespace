import React from "react";
import SingleNote from "../components/SingleNote";

function CreateNote() {
  return (
    <SingleNote
      defTitle={""}
      defContent={""}
      defCategory={""}
      btnText={"create"}
      titleText={"create note"}
      type={"create"}
      id={""}
    />
  );
}

export default CreateNote;
