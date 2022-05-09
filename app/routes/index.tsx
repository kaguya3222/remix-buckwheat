import { Button, Container, FormControl, Grid, Input } from '@chakra-ui/react'
import type { LoaderFunction } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'

import type { Products } from '~/api'
import { Api } from '~/api'
import { ProductCard } from '~/components/ProductCard'

const apiClient = new Api()

const queryKey = 'query'

interface LoaderData {
  products: Products
  query: string
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url)
  const query = url.searchParams.get(queryKey)
  const fetchedProducts = await apiClient.products.searchUsingGet({
    query: query ?? '',
  })
  const products: Products = await fetchedProducts.json()
  return { products, query }
}

export default function Index() {
  const { products, query } = useLoaderData<LoaderData>()

  return (
    <main>
      <Container maxW="1400px">
        <Form method="get">
          <FormControl marginBottom="16px">
            <Input id={queryKey} name={queryKey} defaultValue={query} />
          </FormControl>

          <Button type="submit">Search</Button>
        </Form>

        <div>
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            {products.items.map((product) => {
              return <ProductCard key={product.id} {...product} />
            })}
          </Grid>
        </div>
      </Container>
    </main>
  )
}
