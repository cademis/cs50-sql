import express, { Request } from "express";
import { sql } from "./db";

interface User {
  email: string;
}

const app = express();
app.use(express.json());

type AsyncHandler = (req: Request) => Promise<{ status: number; data: any }>;

const handleAsync =
  (handler: AsyncHandler) =>
  async (req: express.Request, res: express.Response) => {
    try {
      const { status, data } = await handler(req);
      res.status(status).send(data);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  };

app.get(
  "/",
  // Then refactor your routes like this:
  app.get(
    "/",
    handleAsync(async () => {
      const xs = await sql`select email from users`;
      return { status: 200, data: xs };
    })
  )
);

app.post(
  "/",
  handleAsync(async (req) => {
    const { email } = req.body as User;
    await sql`insert into users(email) values(${email})`;
    return { status: 200, data: { message: "successfully inserted new row" } };
  })
);

app.get(
  "/init",
  handleAsync(async () => {
    await sql`create table if not exists users(email text)`;
    return { status: 200, data: { message: "successfully created table" } };
  })
);

app.get(
  "/init-schools",
  handleAsync(async () => {
    await sql`create table if not exists schools(id serial primary key)`;
    return { status: 200, data: { message: "successfully created table" } };
  })
);

app.get(
  "/drop",
  handleAsync(async () => {
    const tableName = "users";
    await sql`drop table ${tableName}`;
    return {
      status: 200,
      data: { message: `successfully dropped ${tableName}` },
    };
  })
);

app.listen(3000, () => console.log("listening on http://localhost:3000"));
