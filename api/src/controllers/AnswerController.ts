import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppsError";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class AnswerController {
  /**
   *
   * Rout Params => parametros q conpoem a rota, rota n funciona sem ele, dps da /
   * Query params => busca, paginacao, paramteros n obrigatorios,  funciona sem ele, vem dps do ?
   */

  async execute(request: Request, response: Response) {
    const { value } = request.params;
    const { u } = request.query;

    //http://localhost:3333/answers/1?u=151001b4-09aa-43a4-99a6-a2f03c0ad958

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const surveyUser = await surveysUsersRepository.findOne({
      id: String(u),
    });

    if (!surveyUser) {
      throw new AppError("SurveyUser dos not Exists!");
      // return response.status(400).json({
      //   error: "SurveyUser dos not Exists!",
      // });
    }

    surveyUser.value = Number(value);

    await surveysUsersRepository.save(surveyUser);

    return response.status(200).json(surveyUser);
  }
}

export { AnswerController };
