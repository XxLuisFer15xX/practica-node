import express from 'express';
import dotenv from 'dotenv';
import accountRouter from './routes/account.js';
import authRouter from './routes/auth.js';
import authTokenRouter from './routes/token.js';
import authSessionRouter from './routes/session.js';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.text());
app.use('/account', accountRouter);
app.use('/auth', authRouter);
app.use('/auth-session', authSessionRouter);
app.use('/auth-token', authTokenRouter);

const bootstrap = async () => {
  await mongoose.connect(process.env.MONGODB_URL);

  app.listen(PORT, () =>
    console.log(`Servidro corriendo en el puerto ${PORT}`),
  );
};

bootstrap();
