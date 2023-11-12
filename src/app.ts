import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';

const app: Application = express();
// app.use(
//   cors({
//     origin: '*',
//     // You can also specify an array of allowed origins:
//     // origin: ['https://dancing-licorice-2ec233.netlify.app', 'https://another-allowed-origin.com'],
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true, // include credentials like cookies, authorization headers, etc.
//   })
// );

const corsOption = {
  origin: ['https://dancing-licorice-2ec233.netlify.app','https://enjoy-the-world.vercel.app'],
  credentils: true,
};
app.use(cors(corsOption));

// app.options('*', cors());

// app.use((req, res, next) => {
//   res.setHeader(
//     'Access-Control-Allow-Origin',
//     'https://enjoy-the-world.vercel.app'
//   );
//   next();
// });

app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', routes);

//global error handler
app.use(globalErrorHandler);

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

export default app;
