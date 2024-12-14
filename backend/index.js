import express from 'express';
import 'dotenv/config';
import userRouter from './routes/user.route.js';
import commentRouter from './routes/comment.route.js';
import postRouter from './routes/post.route.js';
import webHookRouter from './routes/webhook.route.js';
import { clerkClient, clerkMiddleware, requireAuth } from '@clerk/express';
import connectDB from './lib/connectDB.js';
import cors from 'cors';

connectDB();

const app = express();
app.use(cors(process.env.CLIENT_URL));
app.use('/webhooks', webHookRouter);

app.use(express.json());
app.use(clerkMiddleware());
app.use('/users', userRouter);
app.use('/comments', commentRouter);
app.use('/posts', postRouter);

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message || 'Something went wrong',
    status: error.status,
    stack: error.stack,
  });
});

//Will get null
// app.get('/auth-state', (req, res) => {
//   res.json(req.auth);
// });

app.listen(3000, () => {
  console.log('running');
});
