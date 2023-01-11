import { Router } from "express";
import { doctorInfoRouter } from "./doctor-info.routes";
import { doctorRouter } from "./doctor.routes";
import { specialityRouter } from "./speciality.routes";
import { userRouter } from "./user.routes";

const router = Router();

router.use(userRouter);
router.use(specialityRouter);
router.use(doctorRouter);
router.use(doctorInfoRouter);

export { router };