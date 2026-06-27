# ScoreCast Backend

A secure and scalable backend for a real-time sports match tracking application built with **Node.js**, **Express.js**, **PostgreSQL**, **Drizzle ORM**, **WebSockets**, **Arcjet**, and **Site24x7 APM**.

## Features

- RESTful APIs for match and commentary management
- Real-time updates using WebSockets
- PostgreSQL with Drizzle ORM
- Request validation using Zod
- Arcjet security (Shield, Bot Detection, Rate Limiting)
- Site24x7 APM monitoring

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Drizzle ORM
- WebSocket (ws)
- Zod
- Arcjet
- Site24x7 APM

## API Endpoints

| Method | Endpoint |
|--------|----------|
| GET | `/matches` |
| POST | `/matches` |
| GET | `/matches/:id/commentary` |
| POST | `/matches/:id/commentary` |


## Application Monitoring (Site24x7)

The backend is monitored using **Site24x7 APM Insight** to track application health and performance in real time.

**Monitoring Metrics**
- Apdex Score: **0.95**
- Average Response Time: **289 ms**
- Request Throughput: **0.1 rpm**
- Total Requests: **210**
- Error Rate: **1.4%**
- Data Throughput: **27 bytes/min (IN)**
- Exceptions: **0 Fatal, 0 Warnings**
- Agent Status: **Connected and communicating**

