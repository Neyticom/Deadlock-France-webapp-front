import { Router } from "express";
import mainController from "../controllers/mainController";
import heroRoutes from "./heroRoutes";
import spellRoutes from "./spellRoutes";
import spellEffectRoutes from "./spellEffectRoutes";
import itemRoutes from "./itemRoutes";
import itemEffectRoutes from "./itemEffectRoutes";
import userRoutes from "./userRoutes";
import patchnoteRoutes from "./patchnoteRoutes";
import patchnoteEntryRoutes from "./patchnoteEntryRoutes";
import keywordRoutes from "./keywordRoutes";
import errorHandler from "../middlewares/errorHandler";

const router = Router();

router.get("/status", mainController.getStatus);

router.use("/heroes", heroRoutes);

router.use("/spells", spellRoutes);
router.use("/spells", spellEffectRoutes);

router.use("/items", itemRoutes);
router.use("/items", itemEffectRoutes);

router.use("/users", userRoutes);

router.use("/patchnotes", patchnoteRoutes);
router.use("/patchnotes", patchnoteEntryRoutes);

router.use("/keywords", keywordRoutes);

router.use(errorHandler);

export default router;