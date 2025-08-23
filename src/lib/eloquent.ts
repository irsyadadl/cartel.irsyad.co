export function findById<T extends { id: number | string }>(items: T[], id: number | string): T | undefined {
  return items.find(item => item.id === id)
}
