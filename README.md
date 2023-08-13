# APP

GymPass Style App

## Requisitos Funcionais

- [✔] Deve ser possível cadastrar-se
- [ ] Deve ser possível autenticar-se
- [ ] Deve ser possível obter o perfil de um usuário logado
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário
- [ ] Deve ser possível o usuário ver seu histórico de check-in
- [ ] Deve ser possível o usuário buscar academias próximas
- [ ] Deve ser possível o usuário buscar academias pelo nome
- [ ] Deve ser possível o usuario realizar check-in na academia
- [ ] Deve ser possível validar o check-in de um usuário
- [ ] Deve ser possível cadastrar uma academia

## Regras de Negócio

- [✔] O usuário não deve cadastrar-se com email duplicado
- [ ] O usuário não pode fazer dois check-ins no mesmo dia
- [ ] O usuário não pode fazer check-in fora do raio de 100m da academia
- [ ] O check-in só pode ser validado até 20min após criado
- [ ] O o check-in só pode ser validado por administradores
- [ ] A academia só pode ser cadastrar por administradores

## Requisitos Não-Funcionais

- [✔] A senha do usuário precisa estar criptografada
- [✔] Os dados da aplicação precisam persistir num banco de dados PostgreSQL
- [ ] Todas as listas de dados precisam estar páginadas com 20 itens por página
- [ ] O usuário deve ser identificado por um JWT
