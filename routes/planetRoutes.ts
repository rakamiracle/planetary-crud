import { Router } from "../deps.ts";
import { getAllPlanets, getPlanet, createPlanet, updatePlanet, deletePlanet } from "../controllers/planetController.ts";

const router = new Router();

router
  .get("/api/planets", getAllPlanets)
  .get("/api/planets/:id", getPlanet)
  .post("/api/planets", createPlanet)
  .put("/api/planets/:id", updatePlanet)
  .delete("/api/planets/:id", deletePlanet);

export default router;