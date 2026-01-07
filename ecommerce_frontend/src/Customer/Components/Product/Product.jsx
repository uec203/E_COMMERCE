import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import {
  ChevronDownIcon,
  MinusIcon,
  PlusIcon
} from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl
} from '@mui/material'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Pagination } from '@mui/material'
import { getProductsByFilter } from '../../../State/Product/Action'

const sortOptions = [
  { name: 'Price: Low to High', value: 'price_low' },
  { name: 'Price: High to Low', value: 'price_high' },
]

const filters = [
  {
    id: "color",
    name: "Color",
    options: [
      "white","beige","blue","brown","green","purple","yellow"
    ]
  },
  {
    id: "size",
    name: "Size",
    options: ["S","M","L"]
  },
]

const singleFilters = [
  {
    id: "price",
    name: "Price",
    options: [
      { value: "0-399", label: "₹0 – ₹399" },
      { value: "399-999", label: "₹399 – ₹999" },
      { value: "999-1999", label: "₹999 – ₹1999" },
      { value: "1999-2999", label: "₹1999 – ₹2999" },
      { value: "2999-5000", label: "₹2999 – ₹5000" },
    ]
  },
  {
    id: "discount",
    name: "Discount",
    options: ["10","20","30","40","50"]
  },
  {
    id: "stock",
    name: "Availability",
    options: [
      { value: "in_stock", label: "In Stock" },
      { value: "out_of_stock", label: "Out of Stock" },
    ]
  },
]

export default function Product() {
  const location = useLocation()
  const navigate = useNavigate()
  const param = useParams()
  const dispatch = useDispatch()
  const product = useSelector(store => store.product)

  const params = new URLSearchParams(location.search)
  const colorValue = params.get("color")?.split(",") || []
  const sizeValue = params.get("size")?.split(",") || []
  const priceValue = params.get("price")
  const discount = params.get("discount")
  const sortValue = params.get("sort")
  const pageNumber = Number(params.get("page") || 1)
  const stock = params.get("stock")

  const updateQuery = (key, value) => {
    const p = new URLSearchParams(location.search)
    value ? p.set(key, value) : p.delete(key)
    navigate({ search: `?${p.toString()}` })
  }

  const toggleFilter = (key, value) => {
    const p = new URLSearchParams(location.search)
    const values = p.get(key)?.split(",") || []
    const updated = values.includes(value)
      ? values.filter(v => v !== value)
      : [...values, value]
    updated.length ? p.set(key, updated.join(",")) : p.delete(key)
    navigate({ search: `?${p.toString()}` })
  }

  useEffect(() => {
    const [minPrice, maxPrice] =
      priceValue ? priceValue.split("-").map(Number) : [0, 100000]
    console.log("Fetching filters:", {
      categoryOne: param.levelOne,
      categoryTwo: param.levelTwo,  
      categoryThree: param.levelThree,
      colors: colorValue.join(","),
      sizes: sizeValue.join(","),
      minPrice,
      maxPrice,
      maxDiscount: discount || 0,
      sort: sortValue || "price_low",
      pageNumber: pageNumber - 1,
      pageSize: 20,
      stock
    });
    dispatch(getProductsByFilter({
      categoryOne: param.levelOne,
      categoryTwo: param.levelTwo,
      categoryThree: param.levelThree,
      colors: colorValue.join(","),
      sizes: sizeValue.join(","),
      minPrice,
      maxPrice,
      maxDiscount: discount || 0,
      sort: sortValue || "price_low",
      pageNumber: pageNumber - 1,
      pageSize: 20,
      stock
    }))
    console.log("Dispatched getProductsByFilter with above parameters");
  }, [location.search])

  return (
    <div className="bg-white">
      <main className="mx-auto max-w-7xl px-4 py-10">

        {/* HEADER */}
        <div className="flex justify-between border-b pb-4 mb-6">
          <h1 className="text-3xl font-bold">Products</h1>

          <Menu>
            <MenuButton className="flex items-center gap-1 text-sm">
              Sort <ChevronDownIcon className="w-5 h-5" />
            </MenuButton>
            <MenuItems className="absolute right-0 mt-2 w-48 rounded bg-white shadow-lg">
              {sortOptions.map(o => (
                <MenuItem key={o.value}>
                  <button
                    onClick={() => updateQuery("sort", o.value)}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    {o.name}
                  </button>
                </MenuItem>
              ))}
            </MenuItems>
          </Menu>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">

          {/* FILTERS */}
          <aside className="hidden lg:block border rounded-md p-4 h-fit sticky top-24">
            <h2 className="font-semibold mb-4">Filters</h2>

            {filters.map(section => (
              <Disclosure key={section.id} defaultOpen>
                <DisclosureButton className="flex justify-between w-full py-2 text-sm font-medium">
                  {section.name}
                  <PlusIcon className="w-4 h-4 group-data-open:hidden" />
                  <MinusIcon className="w-4 h-4 hidden group-data-open:block" />
                </DisclosureButton>
                <DisclosurePanel className="space-y-2 pl-1">
                  {section.options.map(opt => (
                    <label key={opt} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={(section.id === "color" ? colorValue : sizeValue).includes(opt)}
                        onChange={() => toggleFilter(section.id, opt)}
                        className="accent-indigo-600"
                      />
                      {opt}
                    </label>
                  ))}
                </DisclosurePanel>
              </Disclosure>
            ))}

            {singleFilters.map(section => (
              <Disclosure key={section.id} defaultOpen>
                <DisclosureButton className="flex justify-between w-full py-2 text-sm font-medium mt-3">
                  {section.name}
                </DisclosureButton>
                <DisclosurePanel>
                  <FormControl>
                    <RadioGroup>
                      {section.options.map(opt => (
                        <FormControlLabel
                          key={opt.value || opt}
                          value={opt.value || opt}
                          label={opt.label || `${opt}%+`}
                          control={<Radio size="small" />}
                          onChange={(e) => updateQuery(section.id, e.target.value)}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </DisclosurePanel>
              </Disclosure>
            ))}
          </aside>

          {/* PRODUCTS GRID */}
          <section className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {product.productsByFilter?.map(item => (
              <ProductCard key={item.id} product={item} />
            ))}
          </section>
        </div>

        {/* PAGINATION */}
        <div className="flex justify-center mt-10">
          <Pagination
            count={product.totalPages || 1}
            page={pageNumber}
            onChange={(_, v) => updateQuery("page", v)}
          />
        </div>

      </main>
    </div>
  )
}
