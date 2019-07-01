import { filesystem } from 'gluegun'
import { cli } from '../utils'

test('should be add a new component', async () => {
  const name = 'ComponentName'

  await cli(`react add:component ${name}`)

  const index = filesystem.read(`__tests__/src/components/${name}/index.js`)
  expect(index).toContain(name)

  const styles = filesystem.read(`__tests__/src/components/${name}/styles.js`)
  expect(styles).toContain('Container')

  filesystem.remove('__tests__/src/components')
})
