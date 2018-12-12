import express from 'express';

const todosRouter = express.Router();

todosRouter
  .route('/')
  .get((req, res) => {
    res.json({ data: 'Get ToDos!' });
  })
  .post((req, res) => {
    const todo = req.body;
    res.json({ data: todo });
  });

todosRouter
  .route('/:todo')
  .get((req, res) => {
    res.json({ data: { query: req.query } });
  })
  .put((req, res) => {
    res.json({ data: { method: req.method, body: req.body } });
  })
  .delete((req, res) => {
    res.json({ data: { method: req.method, params: req.params } });
  });

export default todosRouter;
