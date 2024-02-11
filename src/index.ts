import express, { Request, Response, NextFunction } from "express";
import userRoutes from "./routes/userRoute";
import artistRoute from "./routes/artistRoute";
import albumRoute from "./routes/albumRoute";
import songRouter from "./routes/songRoute";
import { con } from "./utils/db";
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/users", userRoutes);
app.use("/artist", artistRoute);
app.use("/album", albumRoute);
app.use("/song", songRouter);
app.use("/albumArtist", songRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("working");
});

// Add this error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong");
});

app.listen(port, () => {
  con.connect(function (err: any) {
    if (err) throw err;
    console.log("Connected!");
  });

  console.log(`Server running at http://localhost:${port}`);
});
