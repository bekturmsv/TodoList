import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import { useSelector, useDispatch } from "react-redux";
import { Avatar } from "@mui/material";
import { logout, selectIsAuth } from "../../redux/slices/auth";
import { Typography } from "@mui/material";
import styles from "./Header.module.scss";

const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const userData = useSelector((state) => state.auth.data);

  const onClickLogout = () => {
    if (window.confirm("Are you sure you want to get out?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
    }
  };
  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>Todo List</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/addTodo">
                  <Button variant="contained">Добавить задачу</Button>
                </Link>
                <Button
                  onClick={onClickLogout}
                  variant="contained"
                  color="error"
                >
                  Выйти
                </Button>
                <Avatar
                  className={styles.avatarLogo}
                  sx={{ width: 40, height: 40 }}
                />
                <Typography style={{ padding: "10px" }}>
                  {userData.name}{" "}
                </Typography>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
