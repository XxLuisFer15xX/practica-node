import { Router } from 'express';
import jwt from 'jsonwebtoken';
import * as fs from 'fs';

// DB
import { USERS_BBDD } from '../bbdd.js';

// Validates
import authByEmailPwd from '../helpers/authByEmailPwd.js';
import validateLoginDTO from '../validations/validateLoginDTO.js';

const authTokenRouter = Router();

authTokenRouter.post('/login', validateLoginDTO, async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = authByEmailPwd(email, password);
    const payload = {
      guid: user.guid,
      role: user.role,
    };
    const jwtOptions = {
      algorithm: 'RS256',
      expiresIn: '10m',
    };
    const privateKey = fs.readFileSync('./certs/private.key');
    const token = jwt.sign(
      payload,
      { key: privateKey, passphrase: process.env.JWT_PASSPHRASE },
      jwtOptions,
    );
    return res.send({
      message: 'Token obtenido',
      data: { token },
    });
  } catch (error) {
    return res.sendStatus(401);
  }
});

authTokenRouter.get('/profile', (req, res) => {
  const { token } = req.query;
  if (!token) return res.sendStatus(401);
  const publicKey = fs.readFileSync('./certs/public.key');
  const jwtOptions = {
    algorithms: ['RS256'],
  };
  try {
    const userToken = jwt.verify(token, publicKey, jwtOptions);
    const user = USERS_BBDD.find(user => user.guid === userToken.guid);
    if (!user) return res.sendStatus(401);
    delete user.password;
    return res.send(user);
  } catch (error) {
    console.log(error);
    return res.sendStatus(401);
  }
});

export default authTokenRouter;
