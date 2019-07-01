import { filesystem } from 'gluegun'
import { cli } from '../utils'

test('should be create a new react app', async () => {
  const output = await cli('react create myapp')
  expect(output).toContain(`The project was created. Let's Code!`)

  const myapp = filesystem.read('__tests__/myapp/package.json')
  expect(myapp).toContain(`"name": "myapp"`)

  filesystem.remove('__tests__/myapp')
})
