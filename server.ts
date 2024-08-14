import cors from 'cors';
import express, { Request, Response } from 'express';
import jsonData from './data/engagements.json';

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

app.get('/users/self/messages/sellers', (req: Request, res: Response) => {
  console.log(`GET /users/self/messages/ ', limit: ${req.query.limit}, offset: ${req.query.offset}`);

  const limit = parseInt(req.query.limit as string);
  const offset = parseInt(req.query.offset as string);

  // simple pagination with limit and offset
  const content = jsonData.messages.content.slice(offset, offset + limit);

  console.log('here', content.length, offset, limit);

  const messages = {
    content,
    size: content.length,
    page: offset / limit,
    totalPages: Math.ceil(jsonData.messages.content.length / limit),
    totalElements: jsonData.messages.content.length,
  };

  return res.json(messages);
});

app.get('/users/self/messages/sellers/:seller_id', (req: Request, res: Response) => {
  console.log(`GET /users/self/messages/sellers/${req.params.seller_id}`);

  const sellerId = parseInt(req.params.seller_id);

  const messageDetails = jsonData.messagesDetails.find((message) => message.seller.id === sellerId);

  return res.json(messageDetails);
});

app.get('/users/self/unread-messages-counter', (req: Request, res: Response) => {
  console.log(`GET /users/self/unread-messages-counter`);

  const unreadMessagesCounter = jsonData.unseenMessagesCount;

  return res.json(unreadMessagesCounter);
});

app.post('/users/self/sellers/:seller_id/mute', (req: Request, res: Response) => {
  console.log(`POST /users/self/sellers/${req.params.seller_id}/mute`);

  return res.sendStatus(201);
});

app.delete('/users/self/sellers/:seller_id/mute', (req: Request, res: Response) => {
  console.log(`DELETE /users/self/sellers/${req.params.seller_id}/mute`);

  return res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
