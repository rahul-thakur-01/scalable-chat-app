import { createServer } from 'http';
import dotenv from 'dotenv';

import SocketService from './services/socket';
import initDatabase from './config/db';
import app from './app';

dotenv.config();

async function startServer() {

    await initDatabase();
    const port = process.env.PORT || 3000;
    const httpServer = createServer(app);
    
    const socketService = new SocketService();
    socketService.getIO().attach(httpServer);
    
    httpServer.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`)
    });

    await socketService.initListeners();

}
startServer();