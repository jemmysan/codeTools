import 'dotenv/config';

//---- INSTANCE OF THE SERVER ----------//
export const {PORT, JWT_SECRET, MONGO_URI } = process.env


//-------- ROUTE HANLDER  -----------//
export const Router = (server) => {
    server.get('/', (req , res) => {
        try {
            res.send('Server is running ....')
        } catch (error) {
            res.status(500).send('An internal server error occured !')
        }
    } )
}



