import 'dotenv/config';
import express from 'express';
import { specialityRouter } from './routes/speciality.routes';
import { userRouter } from './routes/user.routes';

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';

const app = express();

app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(userRouter);
app.use(specialityRouter);

app.get('/', (request, response) => {
  return response.send('A aplicação está funcionando!');
});

app.listen(3000, () => console.log('Server is running on PORT 3000'));