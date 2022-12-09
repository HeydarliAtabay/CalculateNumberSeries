import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { InputBody, progressions } from "./interfaces";
import { arithmetic, geometric, fibbonaci } from "./functions";

dotenv.config();

const app: Express = express();
app.use(express.json()); // <==== parse request body as JSON

const port = 3001;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

const tickets: number[] = [];
const inputs: InputBody[] = [];
let reads:number[]=[]

app.post("/endpoint.com/input", (req: Request, res: Response) => {
  const input = req.body;
  if (!input) {
    res.status(400).send("No input body");
  } else {
    if (input.data !== undefined) {
      tickets.push(tickets.length + 1);
      inputs.push(input);
      res.status(201).json({ ticket: tickets[tickets.length - 1] });
    }
  }
});

app.get(
  "/endpoint.com/output/ticket=:ticket_id",
  (req: Request, res: Response) => {
    const ticket_id = req.params.ticket_id;
    if (ticket_id) {
      tickets.forEach((ticket, index) => {
        if (ticket !== undefined && ticket === Number(ticket_id)) {
          reads.push(ticket)
          console.log(reads)
          if (inputs[index].data !== undefined) {
            let result = 0;
            if (inputs[index].type === 1) {
              result = arithmetic(
                inputs[index].number,
                inputs[index].data?.start,
                inputs[index].data?.common
              );
            }
            if (inputs[index].type === 2) {
              result = geometric(
                inputs[index].number,
                inputs[index].data?.start,
                inputs[index].data?.common
              );
            }
            if (inputs[index].type === 4) {
              result = fibbonaci(inputs[index].number);
            }
            console.log(result);
          }
        }
      });
    }
    else{
      res.status(500).json(`There is no ticket with id ${ticket_id}`)
    }
  }
);

app.get("/endpoint.com/inProgress", (req: Request, res: Response) => {
  reads.forEach((read)=>{
    res.send(tickets.filter((ticket)=>ticket!==read))
  })
 
});

app.post("/endpoint.com", (req: Request, res: Response) => {
  res.send(req.body);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
