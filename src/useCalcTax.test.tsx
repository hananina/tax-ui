import { act, waitFor } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/lib/node'

// test-utils.tsx から import している renderHook 関数は、React Testing Library の renderHook 関数をラッピングした独自の関数です。
// Chakra UI と TanStack Query にテスト用の設定を適用してい ます。
import { renderHook, waitForRequest } from './test-utils'
import { useCalcTax } from './useCalcTax'

const server = setupServer()
beforeAll(() => server.listen())
afterEach(() => {
  server.resetHandlers()
  server.events.removeAllListeners()
})
afterAll(() => server.close())

const waitForCalcTaxRequest = () =>
  waitForRequest(server, 'POST', 'http://localhost:3000/calc-tax')

describe('useCalcTax', async () => {
  test('所得税計算APIを呼び出せる', async () => {
    // ★3 server.use(
    rest.post('http://localhost:3000/calc-tax', async (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({ tax: 15315 }))
    })
  })

  const pendingRequest = waitForCalcTaxRequest()
  const { result } = renderHook(() => useCalcTax())

  act(() => {
    result.current.mutate({
      yearsOfService: 6,
      isOfficer: false,
      isDisability: false,
      severancePay: 3_000_000,
    })
  })

  await waitFor(() => expect(result.current.isSuccess).toBe(true))
  expect(result.current.data?.status).toBe(200)
  expect(await result.current.data?.json()).toStrictEqual({ tax: 15315 })
  // ★5
  const request = await pendingRequest
  expect(await request.json()).toStrictEqual({
    yearsOfService: 6,
    isOfficer: false,
    isDisability: false,
    severancePay: 3_000_000,
  })
})
