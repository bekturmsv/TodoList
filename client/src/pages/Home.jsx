import React, { useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import Todo from "../components/Todo/Todo";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../redux/slices/todo";
const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const todo = useSelector((state) => state.todo);

  const isTodoLoading = todo.status === "loading";

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);
  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={0}
        aria-label="basic tabs example"
      >
        <Tab label="Задания" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isTodoLoading ? [...Array(5)] : todo.items).map((obj, index) =>
            isTodoLoading ? (
              <Todo isLoading={true} key={index} />
            ) : (
              <Todo
                key={obj._id}
                id={obj._id}
                title={obj.title}
                status={obj.status}
                createdAt={obj.createdAt}
                isEditable={true}
              />
            )
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
