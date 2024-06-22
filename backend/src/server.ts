import express from 'express';
import { createServer } from 'http';
import SocketService from './services/socket';

async function startServer() {

    const app = express();
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