import { HeroController } from "../controllers";
import { Router } from "express";

const HeroRoutes = Router();

HeroRoutes.post("/", HeroController.create);

HeroRoutes.get("/", HeroController.getAll);

HeroRoutes.get("/:id", HeroController.get);

HeroRoutes.put("/:id", HeroController.update);

HeroRoutes.delete("/:id", HeroController.delete);

export { HeroRoutes };