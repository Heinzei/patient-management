import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Diese zwei Zeilen ersetzen __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
app.use(cors());
app.use(express.json());
const dataPath = path.join(__dirname, 'patients.json');

// Patientenliste abrufen
app.get('/patients', (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  res.json(data);
});

// Einzelnen Patienten abrufen
app.get('/patients/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const patient = data.find((p: any) => p.id === parseInt(req.params.id));
  if (patient) res.json(patient);
  else res.status(404).json({ message: 'Patient nicht gefunden' });
});

// Patienten hinzufügen
app.post('/patients', (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const newPatient = { id: Date.now(), ...req.body };
  data.push(newPatient);
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  res.status(201).json(newPatient);
});

// Patienten aktualisieren
app.put('/patients/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const index = data.findIndex((p: any) => p.id === parseInt(req.params.id));
  if (index !== -1) {
    data[index] = { ...data[index], ...req.body };
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    res.json(data[index]);
  } else {
    res.status(404).json({ message: 'Patient nicht gefunden' });
  }
});

// Patienten löschen
app.delete('/patients/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const newData = data.filter((p: any) => p.id !== parseInt(req.params.id));
  fs.writeFileSync(dataPath, JSON.stringify(newData, null, 2));
  res.status(204).send();
});

const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Server läuft auf Port ${PORT}`));
