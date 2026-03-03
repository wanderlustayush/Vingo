import React, { useEffect, useRef, useState } from 'react'
import Nav from './Nav'
import { categories } from '../category'
import CategoryCard from './CategoryCard'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { useSelector } from 'react-redux'
import FoodCard from './FoodCard'
import { useNavigate } from 'react-router-dom'

function UserDashboard() {
  const { currentCity, shopInMyCity, itemsInMyCity, searchItems } = useSelector(state => state.user)
  const cateScrollRef = useRef()
  const shopScrollRef = useRef()
  const navigate = useNavigate()

  const [showLeftCateButton, setShowLeftCateButton] = useState(false)
  const [showRightCateButton, setShowRightCateButton] = useState(false)
  const [showLeftShopButton, setShowLeftShopButton] = useState(false)
  const [showRightShopButton, setShowRightShopButton] = useState(false)
  const [updatedItemsList, setupdatedItemsList] = useState([])

  const handlefilterByCategory = (category) => {
    if (category === "All") {
      setupdatedItemsList(itemsInMyCity)
    } else {
      const filteredList = itemsInMyCity?.filter(i => i.category === category)
      setupdatedItemsList(filteredList)
    }
  }

  useEffect(() => {
    setupdatedItemsList(itemsInMyCity)
  }, [itemsInMyCity])

  const updateButton = (ref, setLeftButton, setRightButton) => {
    const element = ref.current
    if (element) {
      setLeftButton(element.scrollLeft > 0)
      setRightButton(element.scrollLeft + element.clientWidth < element.scrollWidth)
    }
  }

  const scrollHandler = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({ left: direction === "left" ? -200 : 200, behavior: "smooth" })
    }
  }

  useEffect(() => {
    if (cateScrollRef.current) {
      updateButton(cateScrollRef, setShowLeftCateButton, setShowRightCateButton)
      updateButton(shopScrollRef, setShowLeftShopButton, setShowRightShopButton)
      cateScrollRef.current.addEventListener('scroll', () => updateButton(cateScrollRef, setShowLeftCateButton, setShowRightCateButton))
      shopScrollRef.current.addEventListener('scroll', () => updateButton(shopScrollRef, setShowLeftShopButton, setShowRightShopButton))
    }
    return () => {
      cateScrollRef?.current?.removeEventListener("scroll", () => updateButton(cateScrollRef, setShowLeftCateButton, setShowRightCateButton))
      shopScrollRef?.current?.removeEventListener("scroll", () => updateButton(shopScrollRef, setShowLeftShopButton, setShowRightShopButton))
    }
  }, [categories])

  return (
    <div className='w-screen min-h-screen flex flex-col gap-8 items-center bg-[#fff9f6] overflow-y-auto pb-12'>
      <Nav />

      {/* SEARCH RESULTS */}
      {searchItems && searchItems.length > 0 && (
        <div className='w-full max-w-6xl flex flex-col gap-5 items-start px-5 pt-5'>
          <div className='w-full'>
            <h2 className='text-2xl sm:text-3xl font-bold text-gray-800 mb-1'>Search Results</h2>
            <div className='h-1 w-16 bg-[#ff4d2d] rounded-full mb-5'></div>
          </div>
          <div className='w-full h-auto flex flex-wrap gap-6 justify-center'>
            {searchItems.map((item) => (
              <FoodCard data={item} key={item._id} />
            ))}
          </div>
        </div>
      )}

      {/* CATEGORIES */}
      <div className='w-full max-w-6xl flex flex-col gap-4 items-start px-5'>
        <div>
          <h2 className='text-2xl sm:text-3xl font-bold text-gray-800 mb-1'>
            🍽️ What are you craving?
          </h2>
          <div className='h-1 w-16 bg-[#ff4d2d] rounded-full'></div>
        </div>
        <div className='w-full relative'>
          {showLeftCateButton && (
            <button
              className='absolute left-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10 transition-all'
              onClick={() => scrollHandler(cateScrollRef, "left")}>
              <FaChevronLeft />
            </button>
          )}
          <div className='w-full flex overflow-x-auto gap-4 pb-2 scrollbar-hide' ref={cateScrollRef}>
            {categories.map((cate, index) => (
              <CategoryCard name={cate.category} image={cate.image} key={index} onClick={() => handlefilterByCategory(cate.category)} />
            ))}
          </div>
          {showRightCateButton && (
            <button
              className='absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10 transition-all'
              onClick={() => scrollHandler(cateScrollRef, "right")}>
              <FaChevronRight />
            </button>
          )}
        </div>
      </div>

      {/* DIVIDER */}
      <div className='w-full max-w-6xl px-5'>
        <div className='h-[1px] w-full bg-gray-200 rounded-full'></div>
      </div>

      {/* SHOPS */}
      <div className='w-full max-w-6xl flex flex-col gap-4 items-start px-5'>
        <div>
          <h2 className='text-2xl sm:text-3xl font-bold text-gray-800 mb-1'>
            🏪 Best Shops in {currentCity}
          </h2>
          <div className='h-1 w-16 bg-[#ff4d2d] rounded-full'></div>
        </div>
        <div className='w-full relative'>
          {showLeftShopButton && (
            <button
              className='absolute left-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10 transition-all'
              onClick={() => scrollHandler(shopScrollRef, "left")}>
              <FaChevronLeft />
            </button>
          )}
          <div className='w-full flex overflow-x-auto gap-4 pb-2 scrollbar-hide' ref={shopScrollRef}>
            {shopInMyCity?.map((shop, index) => (
              <CategoryCard name={shop.name} image={shop.image} key={index} onClick={() => navigate(`/shop/${shop._id}`)} />
            ))}
          </div>
          {showRightShopButton && (
            <button
              className='absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10 transition-all'
              onClick={() => scrollHandler(shopScrollRef, "right")}>
              <FaChevronRight />
            </button>
          )}
        </div>
      </div>

      {/* DIVIDER */}
      <div className='w-full max-w-6xl px-5'>
        <div className='h-[1px] w-full bg-gray-200 rounded-full'></div>
      </div>

      {/* FOOD ITEMS */}
      <div className='w-full max-w-6xl flex flex-col gap-4 items-start px-5'>
        <div>
          <h2 className='text-2xl sm:text-3xl font-bold text-gray-800 mb-1'>
            ✨ Suggested for You
          </h2>
          <div className='h-1 w-16 bg-[#ff4d2d] rounded-full'></div>
        </div>
        <div className='w-full h-auto flex flex-wrap gap-5 justify-center'>
          {updatedItemsList?.map((item, index) => (
            <FoodCard key={index} data={item} />
          ))}
        </div>
      </div>

    </div>
  )
}

export default UserDashboard