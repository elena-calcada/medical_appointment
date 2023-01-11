import 'dotenv/config';
import express from 'express';
import { specialityRouter } from './routes/speciality.routes';
import { userRouter } from './routes/user.routes';

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import { doctorRouter } from './routes/doctor.routes';
import { doctorInfoRouter } from './routes/doctor-info.routes';
import { router } from './routes';

const app = express();

app.use(express.json());

app.use(router);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (request, response) => {
  return response.send('A aplicação está funcionando!');
});

app.listen(3000, () => console.log('Server is running on PORT 3000'));