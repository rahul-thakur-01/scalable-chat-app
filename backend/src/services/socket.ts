import {Server, Socket} from 'socket.io';

class SocketService{
    private _io: Server;

    constructor(){
        this._io = new Server( {
            cors: {
                origin: '*',
                methods: '*',
                allowedHeaders: '*'
            }
        });
    }

    public getIO = () => this._io;

    public async initListeners(){
        const io = this._io;
        io.on('connection', (socket:Socket) => {
            console.log('Client connected', socket.id);
            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }
}

export default SocketService;