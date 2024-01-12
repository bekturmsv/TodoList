import React from "react";
import clsx from "clsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import styles from "./Todo.module.scss";
import { TodoSkeleton } from "./Skeleton";
import { useDispatch, useSelector } from "react-redux";
import { fetchRemoveTodo } from "../../redux/slices/todo";
import { selectIsAuth } from "../../redux/slices/auth";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import PendingIcon from "@mui/icons-material/Pending";
const Todo = ({
  id,
  title,
  status,
  children,
  isFullPost,
  isLoading,
  isEditable,
}) => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  if (isLoading) {
    return <TodoSkeleton />;
  }

  const onClickRemove = () => {
    if (window.confirm("Вы уверены что хотите удалить задание?"))
      dispatch(fetchRemoveTodo(id));
  };

  const setStatusIcon = (status) => {
    if (status == "В процессе") {
      return <PendingIcon />;
    } else if (status == "Выполнено") {
      return <CheckCircleIcon />;
    } else {
      return <HourglassEmptyIcon />;
    }
  };

  const setStatusColor = (status) => {
    if (status == "В процессе") {
      return "#ff9900";
    } else if (status == "Выполнено") {
      return "#00cc00";
    } else {
      return "#999999";
    }
  };
  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      {isEditable && isAuth && (
        <div className={styles.editButtons}>
          <Link to={`/todos/${id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      <Link to={`/todos/${id}`}>
        <div className={styles.wrapper}>
          <div className={styles.indention}>
            <h2
              className={clsx(styles.title, { [styles.titleFull]: isFullPost })}
            >
              {title}
            </h2>
            <div
              className={styles.statusTodo}
              style={{ color: setStatusColor(status) }}
            >
              Статус задания: {status} {setStatusIcon(status)}
            </div>

            {children && (
              <div className={styles.content}>
                <h3>Описание:</h3>
                {children}
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Todo;
