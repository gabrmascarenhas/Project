import cors from 'cors';
import env from 'dotenv';
import express from 'express';
import routes from './routes/user.routes'
import productRoutes from './routes/product.routes';
import categoryRoutes from './routes/category.routes';

const app = express();
env.config();

app.use(cors());
app.use(express.json());
app.use('api/users', routes);
app.use('api/products', productRoutes);
app.use('api/categories', categoryRoutes)


export default app;