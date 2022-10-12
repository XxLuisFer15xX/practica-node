import express from 'express';
import dotenv from 'dotenv';
import accountRouter from './routes/account.js';
import authRouter from './routes/auth.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.text());
app.use('/account', accountRouter);
app.use('/auth', authRouter);

app.listen(PORT, () => console.log(`Servidro corriendo en el puerto ${PORT}`));
