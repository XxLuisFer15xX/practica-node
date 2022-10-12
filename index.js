import express from 'express';
import dotenv from 'dotenv';
import accountRouter from './routes/account.js';
import authRouter from './routes/auth.js';
import authTokenRouter from './routes/token.js';
import authSessionRouter from './routes/session.js';
import cookieParser from 'cookie-parser';

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

app.listen(PORT, () => console.log(`Servidro corriendo en el puerto ${PORT}`));
