type KeyExtractor<T> = (row: T) => string

function reduce<T extends { id?: string }>(
  data: T[],
  keyExtractor: KeyExtractor<T> = row => row.id
): Record<string, T> {
  return data.reduce(
    (acc, curr) => ({
      ...acc,
      [keyExtractor(curr)]: curr,
    }),
    {}
  )
}

export default reduce
