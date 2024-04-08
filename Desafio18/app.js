const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi'); 

const PORT = 3000;
const HOST = 'localhost';
const MONGOURL = 'mongodb://127.0.0.1:27017/tareas';

const app = express();
app.use(express.json());

const validate = (schema, property) => { 
  return (req, res, next) => { 
    const { error } = schema.validate(req.body); 
    const valid = error == null; 

    if (valid) { 
      next(); 
    } else { 
      const { details } = error; 
      const message = details.map(i => i.message).join(',');
      res.status(422).json({ error: message }) 
    } 
  } 
} 



const Tarea = mongoose.model('Tarea', {
  titulo: String,
  descripcion: String
});

const tareaSchema = Joi.object().keys({
  titulo: Joi.string().min(3).required(),
  descripcion: Joi.string().min(3).required()
});


app.post('/tareas', validate(tareaSchema), async (req, res) => {
  try {
    const { titulo, descripcion } = req.body;
    const nuevaTarea = new Tarea({ titulo, descripcion });
    await nuevaTarea.save();
    res.status(201).json(nuevaTarea);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.get('/tareas', async (req, res) => {
  try {
    const tareas = await Tarea.find();
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/tareas/:id', async (req, res) => {
  try {
    const tarea = await Tarea.findById(req.params.id + "");
    if (!tarea) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    res.json(tarea);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.use("*", (req, res) => {
  const resp = { "Por favor use alguna de las siguientes rutas": 
    [
      {"POST": "/tareas", "Description": "Crear una tarea nueva con TITULO y DESCRIPCION"}, 
      {"GET": "/tareas", "Description": "Obtener listado de tareas"}, 
      {"GET": "/tareas/:id", "Description": "Obtener una tarea especifica"}] };
  res.status(404).json(resp);
});

app.listen(PORT, HOST, async () => {
  console.log(`Server NodeJS version: ${process.version}`);
  console.log(`Ejecutandose en http://${HOST}:${PORT}`);
  // Conexión a la base de datos MongoDB
  mongoose.connect(MONGOURL);
  mongoose.connection.on('connected', () => {
    console.log('Conectado a MongoDB')
  });
  mongoose.connection.on('error', (error) => {
    console.log('Error al conectar a MongoDB', error)
    process.exit(1);
  });
});