import { system, filesystem } from 'gluegun'

const bin = filesystem.path(__dirname, '..', '..', 'bin')

export const cli = async (value: string) => {
  let cmd = `cd __tests__ &&`
  cmd = `${cmd} node ${filesystem.path(bin, 'neutron')} ${value}`

  return system.run(cmd)
}
