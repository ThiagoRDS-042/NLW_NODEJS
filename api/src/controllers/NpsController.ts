import { Request, Response } from "express";
import { getCustomRepository, Not, IsNull } from "typeorm";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

/**
 * 1 2 3 4 5 6 7 8 9 10
 * Detratores => 0 - 6;
 * Passivo => 7 - 8;
 * Promotores => 9 -10;
 * Respondentes => qtd participantes
 *
 * calculo do nps
 * ((numero de promotores - numero de detratores) / numerto de respondentes) x 100;
 */

class NpsController {
  async execute(request: Request, response: Response) {
    const { survey_id } = request.params;

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const surveysUsers = await surveysUsersRepository.find({
      survey_id,
      value: Not(IsNull()),
    });

    const detractor = surveysUsers.filter((survey) => {
      return survey.value >= 0 && survey.value <= 6;
    }).length;

    const promoters = surveysUsers.filter((survey) => {
      return survey.value >= 9 && survey.value <= 10;
    }).length;

    const passives = surveysUsers.filter((survey) => {
      return survey.value >= 7 && survey.value <= 8;
    }).length;

    const totalAnswers = surveysUsers.length;

    const calculate = Number(
      (((promoters - detractor) / totalAnswers) * 100).toFixed(2)
    );

    return response.status(200).json({
      detractor,
      promoters,
      passives,
      totalAnswers,
      nps: calculate,
    });
  }
}

export { NpsController };
