import { Router } from "express";
import { createSpecialityController } from "../modules/speciality/useCases/create-speciality";
import { userRouter } from "./user.routes";

const specialityRouter = Router();

userRouter.post('/specialities', async (request, response) => {
  await createSpecialityController.handle(request, response)
});

export { specialityRouter };

