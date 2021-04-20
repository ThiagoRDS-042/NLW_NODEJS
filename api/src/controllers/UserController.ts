import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import * as yup from "yup";
import { AppError } from "../errors/AppsError";

class UserController {
  async create(request: Request, response: Response) {
    const { name, email } = request.body;

    const schema = yup.object().shape({
      name: yup.string().required("Nome é Obrigatório"),
      email: yup.string().email().required("E-mail é Obrigatório"),
    });

    // if (!(await schema.isValid(request.body))) {
    //   return response.status(400).json({ error: "Validation Failed!" });
    // }

    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (error) {
      throw new AppError("User Already Exists!");
      // return response.status(400).json({ error: error });
    }

    const usersRepository = getCustomRepository(UsersRepository);

    // SELECT * FROM users WHERE email = email
    const userAlreadyExists = await usersRepository.findOne({
      email,
    });

    if (userAlreadyExists) {
      throw new AppError("User Already Exists!");
      // return response.status(400).json({
      //   error: "User Already Exists!",
      // });
    }

    const user = usersRepository.create({
      name: name,
      email: email,
    });

    await usersRepository.save(user);

    return response.status(201).json(user);
  }
}

export { UserController };
