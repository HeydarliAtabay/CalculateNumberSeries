"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const functions_1 = require("./functions");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json()); // <==== parse request body as JSON
const port = 3001;
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
const tickets = [];
const inputs = [];
let reads = [];
app.post("/endpoint.com/input", (req, res) => {
    const input = req.body;
    try {
        if (!input) {
            res.status(400).send("No input body");
        }
        else {
            if (input.data !== undefined) {
                tickets.push(tickets.length + 1);
                inputs.push(input);
                res.status(201).json({ ticket: tickets[tickets.length - 1] });
            }
        }
    }
    catch (_a) {
        res.status(500).json(`The problem occures during input addition process`);
    }
});
app.get("/endpoint.com/output/ticket=:ticket_id", (req, res) => {
    const ticket_id = req.params.ticket_id;
    if (ticket_id) {
        tickets.forEach((ticket, index) => {
            var _a, _b, _c, _d;
            if (ticket !== undefined && ticket === Number(ticket_id)) {
                reads.push(ticket);
                console.log(reads);
                if (inputs[index].data !== undefined) {
                    let result = 0;
                    if (inputs[index].type === 1) {
                        result = (0, functions_1.arithmetic)(inputs[index].number, (_a = inputs[index].data) === null || _a === void 0 ? void 0 : _a.start, (_b = inputs[index].data) === null || _b === void 0 ? void 0 : _b.common);
                    }
                    if (inputs[index].type === 2) {
                        result = (0, functions_1.geometric)(inputs[index].number, (_c = inputs[index].data) === null || _c === void 0 ? void 0 : _c.start, (_d = inputs[index].data) === null || _d === void 0 ? void 0 : _d.common);
                    }
                    if (inputs[index].type === 4) {
                        result = (0, functions_1.fibbonaci)(inputs[index].number);
                    }
                    res.status(201).json({ "number series": result });
                }
                else {
                    res.status(500).json(`There is no ticket with id ${ticket_id}`);
                }
            }
        });
    }
});
app.get("/endpoint.com/inProgress", (req, res) => {
    reads.forEach((read) => {
        res.send(tickets.filter((ticket) => ticket !== read));
    });
});
app.post("/endpoint.com", (req, res) => {
    res.send(req.body);
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
