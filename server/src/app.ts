import express, {Request, Response} from 'express';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import cookieParser from "cookie-parser";
import userRoutes from './routes/userRoutes';
import roleRoutes from './routes/roleRoutes';
import errorHandler from './middlewares/errorHandler';


const app = express();
app.use(cookieParser());

const limiter = rateLimit({
    max:1000,
    windowMs: 60*1000*1000,
    message: 'Too many requests from this ip. Try again later.' 
});
app.use(cors({
    credentials: true,
    // origin: "http://3.6.178.87/", 
    origin: "http://localhost:3001", 
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  }));
app.use(helmet());
app.use('/api', limiter);


app.use(express.json({limit:'25kb'}));
app.use(mongoSanitize());
app.get('/', (req:Request,res:Response)=>{
    res.send('TBD');
});

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/roles', roleRoutes);


app.use(errorHandler);

export default app;
