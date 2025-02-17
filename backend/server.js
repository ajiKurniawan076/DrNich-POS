import express from "express";
import dotenv from "dotenv";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import cors from "cors";

import paketLayananRoutes from "./routes/admin/paketLayananRoutes.js";
import layananRoutes from "./routes/admin/layananRoutes.js";
import promoRoutes from "./routes/admin/promoRoutes.js";
import produkRoutes from "./routes/admin/produkRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import fotoRoutes from "./routes/admin/sertifMesinRoutes.js";
import cartRoutes from "./routes/admin/cartRoutes.js";
import galleryRoutes from "./routes/admin/galleryRoutes.js";
import ulasanRoutes from "./routes/admin/ulasanRoutes.js";
import produkPosRoutes from "./routes/admin/produkPosRoutes.js";
import userPosRoutes from "./routes/admin/userPosRoutes.js";
import promoPosRoutes from "./routes/admin/promoPosRoutes.js";
import kasirPosRoutes from "./routes/admin/kasirPosRoutes.js";
import laporanPosRoutes from "./routes/admin/laporanRoutes.js";
import adminRoutes from "./routes/admin/adminRoutes.js";
import dbConfig from "./config/db.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();
dbConfig();

const allowedOrigins = [
  "https://drnich.co.id",
  "https://admin.drnich.co.id",
  "http://localhost:3000",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error(`CORS error: ${origin} is not allowed by CORS`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.options("*", cors());
app.use("/uploads", express.static("uploads"));
app.use(express.json({ limit: "50mb" })); // Adjust the limit as needed
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

app.use("/api/layanan", layananRoutes);
app.use("/api/users", userRoutes);
app.use("/api/promo", promoRoutes);
app.use("/api/produk", produkRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/foto", fotoRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/ulasan", ulasanRoutes);
app.use("/api/paketLayanan", paketLayananRoutes);

//API POS

app.use("/api/pos/produk", produkPosRoutes);
app.use("/api/pos/user", userPosRoutes);
app.use("/api/pos/promo", promoPosRoutes);
app.use("/api/pos/kasir", kasirPosRoutes);
app.use("/api/pos/laporan", laporanPosRoutes);
app.use("/api/pos", adminRoutes);

/////////

app.get("/", (req, res) => res.send("Server is ready"));
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server started on port ${port}`));
