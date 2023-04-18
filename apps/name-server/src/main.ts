import { Prisma, PrismaClient } from '@prisma/client';
import dns2, { DnsAnswer, Packet } from 'dns2';

const server = dns2.createServer({
  udp: true,
  tcp: true,
  handle: async (request, send, rinfo) => {
    const response = Packet.createResponseFromRequest(request);

    const prisma = new PrismaClient();

    for (const question of request.questions) {
      const nameMatch = question.name.match(/([a-z0-9-]+)\.gamza\.club/);

      if (!nameMatch) {
        continue;
      }

      const domains = await prisma.domain.findMany({
        where: {
          name: nameMatch[1],
        },
      });

      for (const domain of domains) {
        if (!domain.record || typeof domain.record !== 'object') {
          continue;
        }

        const record = domain.record as Prisma.JsonObject;

        const answer: DnsAnswer = {
          name: question.name,
          type: Packet.TYPE[domain.type],
          class: Packet.CLASS.IN,
          ttl: domain.ttl,
        };

        switch (domain.type) {
          case 'A':
            answer.address = (record.address as string) ?? '';
        }

        response.answers.push(answer);
      }
    }

    send(response);
  },
});

server.on('request', (request, response, rinfo) => {
  console.log(request.header.id, request.questions[0]);
});

server.on('requestError', (error) => {
  console.log('Client sent an invalid request', error);
});

server.on('listening', () => {
  console.log(server.addresses());
});

server.on('close', () => {
  console.log('server closed');
});

server.listen({
  udp: 5333,
  tcp: 5333,
});

// // eventually
// server.close();

// /**
//  * This is not a production server yet!
//  * This is only a minimal backend to get started.
//  */

// import express from "express";
// import * as path from "path";

// const app = express();

// app.use("/assets", express.static(path.join(__dirname, "assets")));

// app.get("/api", (req, res) => {
//   res.send({ message: "Welcome to name-server!" });
// });

// const port = process.env.PORT || 3333;
// const server = app.listen(port, () => {
//   console.log(`Listening at http://localhost:${port}/api`);
// });
// server.on("error", console.error);
