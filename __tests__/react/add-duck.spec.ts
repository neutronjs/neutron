import { filesystem, strings } from 'gluegun'
import { cli } from '../utils'

test('should be add a new duck', async () => {
  const name = 'DuckName'

  await cli(`react add:duck ${name}`)

  const duck = filesystem.read(
    `__tests__/src/store/ducks/${strings.camelCase(name)}.js`
  )
  expect(duck).toContain(strings.pascalCase(name))
  expect(duck).toContain(strings.upperCase(name).replace(' ', '_'))

  filesystem.remove('__tests__/src/store/ducks')
})
