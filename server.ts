import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import fs from 'fs';
import { Engagement, EngagementDetails } from './models';

dotenv.config();

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

type JSONData = {
  engagements: Engagement[];
  engagementDetails: EngagementDetails[];
};

const engagementsData = fs.readFileSync('./data/engagements.json', 'utf8');
const jsonData = JSON.parse(engagementsData) as JSONData;

app.get('/api/engagements', (req: Request, res: Response) => {
  // log request
  console.log('GET /api/engagements');

  res.json(jsonData.engagements);
});

app.get('/api/engagements/:id', (req: Request, res: Response) => {
  // log request
  console.log('GET /api/engagements/:id', req.params.id);

  const id = parseInt(req.params.id);
  const engagement = jsonData.engagementDetails.find((engagement) => engagement.id === id);

  if (engagement) {
    res.json(engagement);
  } else {
    res.status(404).json({ error: 'Engagement not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
