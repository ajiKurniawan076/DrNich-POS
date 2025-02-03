import express from "express";
import dotenv from "dotenv";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import cors from "cors";

import layananRoutes from "./routes/admin/layananRoutes.js";
import promoRoutes from "./routes/admin/promoRoutes.js";
import produkRoutes from "./routes/admin/produkRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import fotoRoutes from "./routes/admin/sertifMesinRoutes.js";
import cartRoutes from "./routes/admin/cartRoutes.js";
import galleryRoutes from "./routes/admin/galleryRoutes.js";
import produkPosRoutes from "./routes/admin/produkPosRoutes.js";
import dbConfig from "./config/db.js";

const app = express();
dotenv.config();
dbConfig();

app.use(cors());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

app.use("/api/layanan", layananRoutes);
app.use("/api/users", userRoutes);
app.use("/api/promo", promoRoutes);
app.use("/api/produk", produkRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/foto", fotoRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/search2", userRoutes);

//POS API
app.use("/api/produkPos", produkPosRoutes);

app.get("/", (req, res) => res.send("Server is ready"));
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
