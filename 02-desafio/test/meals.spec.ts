import { afterAll, beforeAll, describe, it } from 'vitest'
import { app } from '../src/app'
import request from 'supertest'

describe('meals route test suite', () => {
  
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  // it('should be able to register a new meal', async () => {
    
  // })

  // it('should be able to edit an existing meal', async () => {
    
  // })

  // it('should be able to update an existing meal', async () => {
    
  // })

  // it('should be able to delete an existing meal', async () => {
    
  // })

  // it('should be able to list all meals from the current user', async () => {
    
  // })
})