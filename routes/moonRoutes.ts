import { Router } from "../deps.ts";
import { getAllMoons, getMoon, createMoon, updateMoon, deleteMoon } from "../controllers/moonController.ts";

const router = new Router();

router
  .get("/api/moons", getAllMoons)
  .get("/api/moons/:id", getMoon)
  .post("/api/moons", createMoon)
  .put("/api/moons/:id", updateMoon)
  .delete("/api/moons/:id", deleteMoon);

export default router;