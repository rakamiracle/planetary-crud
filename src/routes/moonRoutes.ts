import { Router } from 'express';
import { MoonController } from '../controllers/moonController';
import { validateMoon } from '../middleware/validation';

const router = Router();

router.get('/', MoonController.getAllMoons);
router.get('/:id', MoonController.getMoonById);
router.get('/planet/:planetId', MoonController.getMoonsByPlanetId);
router.post('/', validateMoon, MoonController.createMoon);
router.put('/:id', validateMoon, MoonController.updateMoon);
router.delete('/:id', MoonController.deleteMoon);

export default router;