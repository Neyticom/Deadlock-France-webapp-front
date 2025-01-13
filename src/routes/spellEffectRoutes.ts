import { Router } from "express";
import spellEffectController from "../controllers/spellEffectController";

const spellEffectRoutes = Router({ mergeParams: true });

spellEffectRoutes.get("/", spellEffectController.getAllSpellEffects);
spellEffectRoutes.get("/:id", spellEffectController.getSpellEffectById);
spellEffectRoutes.post("/", spellEffectController.createSpellEffect);
spellEffectRoutes.patch("/:id", spellEffectController.updateSpellEffect);
spellEffectRoutes.delete("/:id", spellEffectController.deleteSpellEffect);

export default spellEffectRoutes;