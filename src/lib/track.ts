export type StoreEvent = 'product_view' | 'add_to_cart' | 'begin_checkout' | 'purchase' | 'search'

export function track(eventName: StoreEvent, payload: Record<string, unknown> = {}) {
  console.info('[store event]', eventName, payload)
}
