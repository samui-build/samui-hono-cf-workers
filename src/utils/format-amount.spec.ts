import { describe, expect, it } from 'bun:test'
import { formatAmount } from './format-amount'

describe('formatAmount', () => {
  it.each([
    [1, 2, '1'],
    [1.2345, 2, '1.23'],
    [12345, 2, '12,345'],
    [12345.6789, 2, '12,345.68'],
    [1.000_000_001, 9, '1.000000001'],
    ['1.000000001', 9, '1.000000001'],
    ['1.0000000001', 9, '1'],
  ])('should format amount %o with %p decimals to %p', (amount, decimals, expected) => {
    expect(formatAmount({ amount, decimals })).toBe(expected)
  })
})
