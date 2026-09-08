import {
  getAllProfiles,
  createProfile,
} from "../controllers/profileController.js";
import { Router } from "express";

const router = Router();

router.get("/", getAllProfiles);
router.post("/", createProfile);

export default router;
