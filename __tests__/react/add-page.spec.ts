import { filesystem } from 'gluegun'
import { cli } from '../utils'

test('should be add a new page', async () => {
  const name = 'PageName'

  await cli(`react add:page ${name}`)

  const index = filesystem.read(`__tests__/src/pages/${name}/index.js`)
  expect(index).toContain(name)

  const styles = filesystem.read(`__tests__/src/pages/${name}/styles.js`)
  expect(styles).toContain('Container')

  filesystem.remove('__tests__/src/pages')
})
