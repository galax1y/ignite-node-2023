// eslint-disable-next-line
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    users: {
      user_id: string
      meals: any
    },
    meals: {
      meal_id: string
      name: string
      description?: string
      created_at: string
      is_healthy: boolean
      user_id: string
    }
  }
}
