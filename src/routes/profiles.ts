import { getAllProfiles } from "../controllers/profileController.js";
import { Router } from "express";

const router = Router();

router.get("/", getAllProfiles);

export default router;
