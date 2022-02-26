import { writable } from 'svelte/store'
export const stocks = writable({})

export function update(symbol, data) {
  // using `...` to destructure a copy, we don't want to overwrite previous value
  stocks.update(({ ...records }) => {
    // now update the copy
    records[symbol] = data

    // return the new value for the store, this will trigger updates in templates that subscribe
    return records
  })
}
