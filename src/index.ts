import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('samui-hono-cf-workers')
})

export default app
