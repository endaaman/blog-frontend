export function load({ url }) {
  return {
    tag: url.searchParams.get('tag') || null,
    category: url.searchParams.get('category') || null,
  }
}
