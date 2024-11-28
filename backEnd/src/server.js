import dotenv from 'dotenv';
dotenv.config({ path: './variaveis.env' });

import express from 'express'
import  {connectDB} from './database.js'
import { routes } from './routes.js'
const server = express()
server.use(express.json())
connectDB(); 
server.use(routes)
server.listen(process.env.PORT_SERVER, () => {
    console.log(`Server Listening on http://localhost:${process.env.PORT_SERVER}`);
  });
  