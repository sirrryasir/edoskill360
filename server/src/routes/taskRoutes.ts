import express from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  submitTask,
  getTaskBySkillId,
} from "../controllers/taskController";
import { protect, admin } from "../middleware/authMiddleware";

const router = express.Router();

router
  .route("/")
  .get(protect, admin, getTasks)
  .post(protect, admin, createTask);

router
  .route("/:id")
  .get(protect, getTaskById)
  .put(protect, admin, updateTask)
  .delete(protect, admin, deleteTask);

router.route("/:id/submit").post(protect, submitTask);

router.route("/skill/:skillId").get(protect, getTaskBySkillId);

export default router;
