import type {SanityClient} from 'sanity'

const apiVersion = '2025-01-01'

/** One below the lowest order in use, so a new project shows first on the site. */
export async function newProjectOrder(getClient: (options: {apiVersion: string}) => SanityClient) {
  const lowestOrder = await getClient({apiVersion}).fetch<number | null>(
    'math::min(*[_type == "project" && defined(order)].order)',
  )
  return (lowestOrder ?? 1) - 1
}
