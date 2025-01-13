import { Router } from "express";
import heroController from "../controllers/heroController";

const heroRoutes = Router();

heroRoutes.get("/", heroController.getAllHeroes);
heroRoutes.get("/:id", heroController.getHeroById);
heroRoutes.post("/", heroController.createHero);
heroRoutes.put("/:id", heroController.updateHero);
heroRoutes.delete("/:id", heroController.deleteHero);

export default heroRoutes;
