import express from 'express';
import userRouter from './routes/user-route';
import authRouter from './routes/auth-route';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});


app.use('/api/user', userRouter);
app.use('/api/auth', authRouter)


export default app;