import { Router } from 'express';
import { PlanetController } from '../controllers/planetController';
import { validatePlanet } from '../middleware/validation';

const router = Router();

router.get('/', PlanetController.getAllPlanets);
router.get('/:id', PlanetController.getPlanetById);
router.post('/', validatePlanet, PlanetController.createPlanet);
router.put('/:id', validatePlanet, PlanetController.updatePlanet);
router.delete('/:id', PlanetController.deletePlanet);

export default router;