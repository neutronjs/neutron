import { filesystem, strings } from 'gluegun'
import { cli } from '../utils'

test('should be add a new saga', async () => {
  const name = 'SagaName'

  await cli(`react add:saga ${name}`)

  const saga = filesystem.read(
    `__tests__/src/store/sagas/${strings.camelCase(name)}.js`
  )
  expect(saga).toContain(strings.pascalCase(name))

  filesystem.remove('__tests__/src/store/sagas')
})
