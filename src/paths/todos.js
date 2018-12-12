import express from "express";

import middleware from "../utils/middleware";

const todosRouter = express.Router();

todosRouter.use(middleware);

todosRouter
  .route("/")
  .get((req, res) => {
    res.json("Get ToDos!");
  })
  .post((req, res) => {
    res.json("Post ToDos!");
  });

todosRouter.get("/:todo", (req, res) => {
  res.json(req.params);
});

export default todosRouter;
