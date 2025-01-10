import app from "./app";
import { AppDataSource } from "./data-source";

const PORT = process.env.PORT || 3000;

// Database connection
AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully.");
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
