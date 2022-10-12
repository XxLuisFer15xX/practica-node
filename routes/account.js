import { Router } from 'express';
import { USERS_BBDD } from '../bbdd.js';

const accountRouter = Router();

// Log de la ip
accountRouter.use((req, res, next) => {
  console.log(req.ip);
  next();
});

// Consultar un usuario
accountRouter.get('/', (req, res) => {
  const { guid } = req.query;
  const user = USERS_BBDD.find(user => user.guid === guid);
  if (!user) return res.status(404).send();
  return res.send(user);
});

// Crear un usuario
accountRouter.post('/', (req, res) => {
  const { guid, name } = req.body;
  if (!guid || !name) return res.status(400).send();
  const user = USERS_BBDD.find(user => user.guid === guid);
  if (user) return res.status(409).send();
  USERS_BBDD.push({ guid, name });
  return res.send();
});

// Modificar un usuario
accountRouter.patch('/', (req, res) => {
  const { guid } = req.query;
  const { name } = req.body;
  if (!name) return res.status(400).send();
  const user = USERS_BBDD.find(user => user.guid === guid);
  if (!user) return res.status(404).send();
  user.name = name;
  return res.send();
});

// Eliminar un usuario
accountRouter.delete('/', (req, res) => {
  const { guid } = req.query;
  const userIndex = USERS_BBDD.findIndex(user => user.guid === guid);
  if (userIndex === -1) return res.status(404).send();
  USERS_BBDD.splice(userIndex, 1);
  return res.send();
});

export default accountRouter;
