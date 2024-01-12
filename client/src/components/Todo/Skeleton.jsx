import React from "react";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

import styles from "./Todo.module.scss";

export const TodoSkeleton = () => {
  return (
    <div className={styles.skeleton}>
      <Stack spacing={1}>
        <Skeleton variant="rectangular" width="100%" height={200} />
      </Stack>
    </div>
  );
};
