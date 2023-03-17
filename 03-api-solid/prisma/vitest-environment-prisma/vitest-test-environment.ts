import { Environment } from 'vitest'

export default <Environment>{
  name: 'prisma',
  async setup() {
    console.log('Test setup')

    return {
      async teardown() {
        console.log('Teardown')
      },
    }
  },
}
