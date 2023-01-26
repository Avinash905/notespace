import axios from "axios";
import jwt_decode from "jwt-decode";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

export async function login({ email, password }) {
  try {
    const { data } = await axios.post("/user/login", {
      email,
      password,
    });
    return data;
  } catch (error) {
    return { error };
  }
}

export async function register({ username, email, password, profile }) {
  try {
    const { data } = await axios.post("/user/register", {
      username,
      email,
      password,
      profile,
    });
    return data;
  } catch (error) {
    return { error };
  }
}

export async function updateProfile({ username, email, password, profile }) {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.put(
      "/user/updateprofile",
      {
        username,
        email,
        password,
        profile,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    return { error };
  }
}

export async function getAllNotes() {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.get("/notes/getallnotes", {
      headers: { authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    return { error };
  }
}

export async function setNote({ title, content, category }) {
  try {
    const token = localStorage.getItem("token");
    const { userId } = jwt_decode(token);
    const { data } = await axios.post(
      "/notes/setnote",
      {
        userId,
        title,
        content,
        category,
      },
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
    return data;
  } catch (error) {
    return { error };
  }
}

export async function editNote({ id, title, content, category }) {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.put(
      `/notes/editnote/${id}`,
      {
        title,
        content,
        category,
      },
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
    return data;
  } catch (error) {
    return { error };
  }
}

export async function deleteNote(id) {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.delete(`/notes/deletenote/${id}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    return { error };
  }
}
