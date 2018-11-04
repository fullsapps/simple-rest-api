import express from 'express';

const todosRouter = express.Router();

todosRouter
  .route('/')
  .get((req, res) => {
    res.json('Get ToDos!');
  })
  .post((req, res) => {
    res.json('Post ToDos!');
  });

todosRouter.get('/:todo', (req, res) => {
  res.json(req.params);
});

export default todosRouter;
