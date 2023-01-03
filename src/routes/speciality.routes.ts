import { Router } from "express";
import { ensureAdmin } from "../infra/shared/http/middleware/ensure-admin.middleware";
import { ensureAuthenticate } from "../infra/shared/http/middleware/ensure-authenticate.middleware";
import { createSpecialityController } from "../modules/speciality/useCases/create-speciality";
import { userRouter } from "./user.routes";

const specialityRouter = Router();

userRouter.post('/specialities', ensureAuthenticate, ensureAdmin, async (request, response) => {
  await createSpecialityController.handle(request, response)
});

export { specialityRouter };

