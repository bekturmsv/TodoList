import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Todo from "../components/Todo/Todo";
import axiosBaseUrl from "../axios";
import ReactMarkdown from "react-markdown";

const FullPost = () => {
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    axiosBaseUrl
      .get(`/api/todo/todos/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert("Error in obtaining an article");
      });
  }, []);
  if (isLoading) {
    return <Todo isLoading={isLoading} isFullPost />;
  }

  return (
    <>
      <Todo
        id={data._id}
        title={data.title}
        status={data.status}
        isFullPost
        isEditable={true}
        children={data.description}
      ></Todo>
    </>
  );
};

export default FullPost;
