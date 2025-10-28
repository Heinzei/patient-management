import express, { type Request, type Response } from 'express'
import cors from 'cors'
import fs from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'


// __filename und __dirname manuell erzeugen
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = 3000
const dataPath = path.join(__dirname, '../patients.json')


app.use(cors())
app.use(express.json())

interface Patient {
  id: number
  firstName: string
  lastName: string
  birthDate: string
  gender: string
}

function readData(): Patient[] {
  if (!fs.existsSync(dataPath)) return []
  return JSON.parse(fs.readFileSync(dataPath, 'utf8'))
}

function writeData(data: Patient[]) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2))
}

app.get('/patients', (req: Request, res: Response) => res.json(readData()))

app.get('/patients/:id', (req: Request, res: Response) => {
  const patient = readData().find(p => p.id === Number(req.params.id))
  patient ? res.json(patient) : res.status(404).send('Not found')
})

app.post('/patients', (req: Request, res: Response) => {
  const patients = readData()
  const newPatient: Patient = { id: Date.now(), ...req.body }
  patients.push(newPatient)
  writeData(patients)
  res.status(201).json(newPatient)
})

app.put('/patients/:id', (req: Request, res: Response) => {
  let patients = readData()
  const index = patients.findIndex(p => p.id === Number(req.params.id))
  if (index === -1) return res.status(404).send('Not found')
  patients[index] = { ...patients[index], ...req.body }
  writeData(patients)
  res.json(patients[index])
})

app.delete('/patients/:id', (req: Request, res: Response) => {
  const patients = readData().filter(p => p.id !== Number(req.params.id))
  writeData(patients)
  res.status(204).send()
})

app.listen(PORT, () => console.log(`✅ Backend läuft auf http://localhost:${PORT}`))
