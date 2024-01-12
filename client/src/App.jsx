import Container from "@mui/material/Container";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Header from "./components/Header.jsx/Header";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAuthMe } from "./redux/slices/auth";
import AddTodo from "./pages/AddTodo/AddTodo";
import FullPost from "./pages/FullPost";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addTodo" element={<AddTodo />} />
          <Route path="/todos/:id" element={<FullPost />} />
          <Route path="/todos/:id/edit" element={<AddTodo />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
