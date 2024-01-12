import React, { useState, useEffect, useRef } from "react";
import {
  Select,
  Paper,
  Button,
  TextField,
  MenuItem,
  InputLabel,
} from "@mui/material";
import SimpleMDE from "react-simplemde-editor";
import axiosBaseUrl from "../../axios";
import "easymde/dist/easymde.min.css";
import styles from "./AddTodo.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import "easymde/dist/easymde.min.css";

const AddTodo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const isEditing = Boolean(id);
  const [postObj, setPostObj] = useState({
    title: "",
    status: "",
    description: "",
  });

  useEffect(() => {
    if (id) {
      axiosBaseUrl
        .get(`api/todo/todos/${id}`)
        .then(({ data }) => {
          setPostObj({
            title: data.title,
            status: data.status,
            description: data.description,
          });
        })
        .catch((err) => {
          console.warn(err);
          alert(err);
        });
    }
  }, []);

  const onSubmit = async () => {
    try {
      setLoading(true);
      const { data } = isEditing
        ? await axiosBaseUrl.patch(`/api/todo/todos/${id}`, postObj)
        : await axiosBaseUrl.post("/api/todo/createTodo", postObj);

      const _id = isEditing ? id : data._id;
      navigate(`/todos/${_id}`);
    } catch (error) {
      console.warn(error);
    }
  };

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Введите описание...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
        uniqueId: 123,
      },
    }),
    []
  );
  return (
    <Paper style={{ padding: 30 }}>
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Название задачи..."
        value={postObj.title}
        onChange={(e) => {
          setPostObj({ ...postObj, title: e.target.value });
        }}
        fullWidth
      />

      <InputLabel id="select-label" classes={{ root: styles.tags }}>
        {isEditing ? "Обновите " : "Выберите"} статус задачи
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={postObj.status}
        defaultValue={"Ожидает выполнения"}
        onChange={(e) => {
          setPostObj({ ...postObj, status: e.target.value });
        }}
      >
        <MenuItem value={"Ожидает выполнения"}>Ожидает выполнения</MenuItem>
        <MenuItem value={"В процессе"}>В процессе</MenuItem>
        <MenuItem value={"Выполнено"}>Выполнено</MenuItem>
      </Select>
      <SimpleMDE
        className={styles.editor}
        value={postObj.description}
        onChange={(newContent) => {
          setPostObj({ ...postObj, description: newContent });
        }}
        options={options}
      />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditing ? "Сохранить" : "Добавить"}
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};

export default AddTodo;
