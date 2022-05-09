import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  Grid,
  Input,
  Select,
  Switch,
} from '@chakra-ui/react'
import type { LoaderFunction } from '@remix-run/node'
import { Form, useLoaderData, useSubmit } from '@remix-run/react'
import { useRef } from 'react'

import type { Products } from '~/api'
import { Api } from '~/api'
import { ProductCard } from '~/components/ProductCard'

const apiClient = new Api()

const queryKey = 'query'
const producerFilterKey = 'producer'
const storeFilterKey = 'store'
const sortByFilterKey = 'sortBy'

interface LoaderData {
  products: Products
  query: string
  filters: {
    producer: string[]
    store: string[]
  }
  sortBy: SortOption
}

type SortOption = 'price' | 'pricePerKg' | 'title' | 'weight' // TODO: get from swagger ?

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url)
  const query = url.searchParams.get(queryKey) ?? ''
  const producer = url.searchParams.getAll(producerFilterKey)
  const store = url.searchParams.getAll(storeFilterKey)
  const sortBy =
    (url.searchParams.get(sortByFilterKey) as SortOption | null) ?? 'price'
  const fetchedProducts = await apiClient.products.searchUsingGet({
    query,
    producer,
    store,
    sortBy,
  })
  const products: Products = await fetchedProducts.json()
  return { products, query, filters: { producer, store }, sortBy }
}

export default function Index() {
  const { products, query, filters, sortBy } = useLoaderData<LoaderData>()
  const submit = useSubmit()
  const form = useRef<HTMLFormElement>(null)
  const submitForm = () => {
    submit(form.current, { replace: true })
  }

  return (
    <main>
      <Container maxW="1400px">
        <Form method="get" ref={form}>
          <FormControl marginBottom="16px">
            <Flex align="center">
              <Input
                id={queryKey}
                name={queryKey}
                defaultValue={query}
                placeholder="Крупа пшенична"
              />
              <Button marginLeft="10px" type="submit">
                Пошук
              </Button>
            </Flex>
          </FormControl>

          <FormControl>
            {products.filters.map((filter) => {
              return (
                <div key={filter.id}>
                  {filter.name}:{' '}
                  <Flex
                    wrap="wrap"
                    gap="10px"
                    direction="row"
                    marginBottom="20px"
                    width="full"
                  >
                    {filter.options.map((option) => {
                      return (
                        <Switch
                          key={option.id}
                          name={filter.id}
                          value={option.id}
                          defaultChecked={filters[filter.id]?.includes(
                            option.id
                          )}
                          onChange={submitForm}
                        >
                          {option.name}
                        </Switch>
                      )
                    })}
                  </Flex>
                </div>
              )
            })}
          </FormControl>

          <FormControl marginBottom="20px">
            <Select name="sortBy" onChange={submitForm} defaultValue={sortBy}>
              <option value="price">За ціною</option>
              <option value="pricePerKg">За вагою</option>
              <option value="title">За назвою</option>
              <option value="weight">За вагою</option>
            </Select>
          </FormControl>
        </Form>

        <Box marginTop="20px">
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            {products.items.map((product) => {
              return <ProductCard key={product.id} {...product} />
            })}
          </Grid>
        </Box>
      </Container>
    </main>
  )
}
