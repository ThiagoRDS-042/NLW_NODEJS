// /**
//  * GET => Busca
//  * POST => Salvar
//  * PUT => Alterar
//  * DELETE => Deletar
//  * PATCH => Alteração Específica
//  */

// app.get("/", (request, response) => {
//   return response.json({
//     message: "Hello World!",
//   });
// });

// // 1º parametro => rota
// // 2º parametro => request, response

// app.post("/", (request, response) => {
//   return response.json({ message: "Dados Salvos Com Sucesso!" });
// });

import { app } from "./app";

app.listen(3333, () => console.log("Server On"));
