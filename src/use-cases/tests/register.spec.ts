import { expect, it, describe, beforeEach } from 'vitest'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'
import { RegisterUserCase } from '../register'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUserCase

describe('Use case -> Register', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUserCase(usersRepository)
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'jdoe@example.com',
      password: '123456',
    })

    const isPasswordHashedCorrectly = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordHashedCorrectly).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'jdoe@example.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should be able to register a user', async () => {
    const email = 'jdoe@example.com'

    const { user } = await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    expect(user).toBeDefined()
  })
})
