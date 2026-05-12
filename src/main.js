import './style.css'
import { createIcons, icons } from 'lucide'
import AOS from 'aos'
import 'aos/dist/aos.css'

import Swiper from 'swiper'
import { Navigation,Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

createIcons({icons});

AOS.init({
  once: true,
  offset: 50,
  duration: 800,
  easing: 'ease-out-cubic',
})

const swiperPortofolio = new Swiper('.swiper-portofolio', {
  modules: [Navigation, Pagination],
  slidesPerView: 1,
  spaceBetween: 20,
  pagination: { el: '.swiper-pagination', clickable: true },
  breakpoints: {
    640: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  }
});

console.log("Atrem Project: system succes!")

