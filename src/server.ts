import dotenv from 'dotenv';
import app from './app';
import sequelize from './config/db';
dotenv.config();

/* Set-up */
const PORT = parseInt(`${process.env.PORT || 3000}`);

/* Start-up */ 
sequelize.sync().then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
});