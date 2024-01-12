import Todo from "../models/todo.model.js";

export const createTodo = async (req, res, next) => {
  try {
    const doc = new Todo({
      title: req.body.title,
      status: req.body.status,
      description: req.body.description,
    });

    const todo = await doc.save();

    res.json(todo);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось создать задачу",
    });
  }
};

export const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось создать задание",
    });
  }
};

export const getOneTodo = async (req, res) => {
  try {
    const todoId = req.params.id;

    const doc = await Todo.findById(todoId);

    if (!doc) {
      return res.status(404).json({
        message: "Статья не найдена",
      });
    }

    res.json(doc);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось вернуть задачу",
    });
  }
};

export const removeTodo = async (req, res) => {
  try {
    const todoId = req.params.id;

    const doc = await Todo.findByIdAndDelete(todoId);

    if (!doc) {
      return res.status(404).json({
        message: "Статья не найдена",
      });
    }

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось создать задачу",
    });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const todoId = req.params.id;

    await Todo.updateOne(
      {
        _id: todoId,
      },
      {
        title: req.body.title,
        status: req.body.status,
        description: req.body.description,
      }
    );

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось обновить задачу",
    });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const postId = req.params.id;

    const doc = await Todo.findOneAndDelete({ _id: postId });

    if (!doc) {
      return res.status(404).json({
        message: "Задача не найдена",
      });
    }
    return res.status(200).json({
      message: "Задача удалена успешна",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось создать задачу",
    });
  }
};
