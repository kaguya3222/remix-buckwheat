import { Button, Container, FormControl, Input } from '@chakra-ui/react'
import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { Form } from '@remix-run/react'

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url)
  const test = url.searchParams.get('test')
  console.log('working', test)
  return null
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  console.log('working', formData)
  return null
}

export default function Index() {
  return (
    <main>
      <Container maxW="1400px">
        <Form method="get">
          <FormControl marginBottom="16px">
            <Input id="test" name="test" />
          </FormControl>

          <Button type="submit">Search</Button>
        </Form>
      </Container>
    </main>
  )
}
