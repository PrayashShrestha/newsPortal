import app from "./app";
import { config, prisma } from "./config";

const port = config.port;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit();
});
