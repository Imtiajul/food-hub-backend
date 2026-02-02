import express, { Application } from "express"
import cors from "cors"
import { providerRouter } from "./modules/provider/provider.router";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";

// import notFound from "./middleware/notFound";
const app: Application = express();

app.use(express.json());

app.use(cors({
    origin: process.env.APP_URL || "http://localhost:3000",
    credentials: true // to access cookies data
}))

// app.all('/api/auth/{*any}', toNodeHandler(auth));
app.all('/api/auth/*splat', toNodeHandler(auth));

app.use("/api/provider", providerRouter);
// app.use("/comments", commentRouter);

app.get("/", (req, res) => {
    res.send("Hello, World");
});

// app.use(notFound);
// app.use(errorHandler);


export default app;