import express from 'express';
import { createServer } from 'http';

async function startServer() {

    const app = express();
    const port = process.env.PORT || 3000;
    const httpServer = createServer(app);

    
    httpServer.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`)
    });


}
startServer();