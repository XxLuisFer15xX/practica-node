import { Router } from 'express';
import userModel from '../schema/userSchema.js';

const accountRouter = Router();

// Log de la ip
accountRouter.use((req, res, next) => {
  console.log(req.ip);
  next();
});

// Consultar un usuario
accountRouter.get('/', async (req, res) => {
  const { guid } = req.query;
  const user = await userModel.findById(guid).exec();
  if (!user) return res.status(404).send();
  return res.send(user);
});

// Crear un usuario
accountRouter.post('/', async (req, res) => {
  const { guid, name } = req.body;
  if (!guid || !name) return res.status(400).send();
  const user = await userModel.findById(guid).exec();
  if (user) return res.status(409).send();
  const newUser = new userModel({
    _id: guid,
    name,
  });
  await newUser.save();
  return res.send();
});

// Modificar un usuario
accountRouter.patch('/', async (req, res) => {
  const { guid, name } = req.body;
  if (!name) return res.status(400).send();
  const user = await userModel.findById(guid).exec();
  if (!user) return res.status(404).send();
  user.name = name;
  await user.save();
  return res.send();
});

// Eliminar un usuario
accountRouter.delete('/', async (req, res) => {
  const { guid } = req.query;
  const user = await userModel.findById(guid).exec();
  if (!user) return res.status(404).send();
  await user.remove();
  return res.send();
});

export default accountRouter;
