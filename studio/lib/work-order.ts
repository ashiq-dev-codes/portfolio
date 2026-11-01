import {LexoRank} from 'lexorank'

/** A work as the Publish order screen needs it. */
export type Work = {_id: string; title: string; coverUrl: string | null}

/** A work whose place differs from the website. Positions start at 1. */
export type MovedWork = {work: Work; position: number; livePosition: number}

/** The id of the document that stores the order the website shows. */
export const workOrderId = 'workOrder'

/**
 * The order visitors see. Works added since the last publish come first (new work shows at the
 * top straight away), then the published works in their published order.
 * The website's `infrastructure/sanity/published-order.ts` follows the same rule.
 */
export function liveOrder(works: Work[], publishedIds: string[]): Work[] {
  const publishedIndex = new Map(publishedIds.map((id, index) => [id, index]))
  const newWorks = works.filter((work) => !publishedIndex.has(work._id))
  const publishedWorks = works
    .filter((work) => publishedIndex.has(work._id))
    .sort((first, second) => (publishedIndex.get(first._id) ?? 0) - (publishedIndex.get(second._id) ?? 0))
  return [...newWorks, ...publishedWorks]
}

/**
 * The works she actually moved. Dragging one work up shifts every work in between by one place,
 * so we keep the longest run that is still in live order and count only the rest as moved.
 */
export function movedWorks(works: Work[], live: Work[]): MovedWork[] {
  const livePosition = new Map(live.map((work, index) => [work._id, index]))
  const sequence = works.map((work) => livePosition.get(work._id) ?? 0)
  const unchanged = longestIncreasingRun(sequence)
  return works.flatMap((work, index) =>
    unchanged.has(index) ? [] : [{work, position: index + 1, livePosition: (sequence[index] ?? 0) + 1}],
  )
}

/** Fresh, evenly spaced ranks for a list of this length, in order. */
export function ranksInOrder(count: number): string[] {
  let rank = LexoRank.middle()
  return Array.from({length: count}, () => {
    rank = rank.genNext()
    return rank.toString()
  })
}

// Indexes of the longest increasing subsequence (patience sorting), fast even for 1000s of works.
function longestIncreasingRun(values: number[]): Set<number> {
  const tails: number[] = []
  const previous = values.map(() => -1)
  values.forEach((value, index) => {
    let low = 0
    let high = tails.length
    while (low < high) {
      const middle = Math.floor((low + high) / 2)
      if ((values[tails[middle] ?? 0] ?? 0) < value) low = middle + 1
      else high = middle
    }
    if (low > 0) previous[index] = tails[low - 1] ?? -1
    tails[low] = index
  })
  const kept = new Set<number>()
  for (let index = tails[tails.length - 1] ?? -1; index !== -1; index = previous[index] ?? -1) {
    kept.add(index)
  }
  return kept
}
