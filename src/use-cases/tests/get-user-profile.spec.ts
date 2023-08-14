import { expect, it, describe, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository'
import { GetUserProfileUseCase } from '../get-user-profile'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Use case -> Get User Profile', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('should be able to get a user', async () => {
    const { id } = await usersRepository.create({
      name: 'John Doe',
      email: 'jdoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: id,
    })

    expect(user).toBeDefined()
  })

  it('should not be able to get a user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
