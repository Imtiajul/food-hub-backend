import express, { Application } from "express"
import cors from "cors"
import { providerRouter } from "./modules/provider/provider.router";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { mealRouter } from "./modules/meals/meal.router";
import { orderRouter } from "./modules/orders/order.router";
import { adminRouter } from "./modules/admin/admin.router";
import { meRouter } from "./modules/me/me.router";

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
app.use("/api/meals", mealRouter);
app.use("/api/orders", orderRouter);
app.use("/api/admin/users", adminRouter);
app.use("/api/auth/me", meRouter);

app.get("/", (req, res) => {
    res.send("Hello, World");
});

// app.use(notFound);
// app.use(errorHandler);


export default app;