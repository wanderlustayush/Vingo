import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './LandingPage.css'

const LandingPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const revealEls = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.15 })
    revealEls.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* NAV */}
      <nav>
        <div className="logo">Vin<span>go</span></div>
        <ul className="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">Menu</a></li>
          <li><a href="#">Offers</a></li>
          <li><a href="#">About</a></li>
        </ul>
        <div className="nav-btns">
          <button className="btn-outline" onClick={() => navigate('/signin')}>Sign In</button>
          <button className="btn-fill" onClick={() => navigate('/signup')}>Sign Up</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <div className="badge"><span className="badge-dot"></span> Free delivery on first order!</div>
          <h1>Hungry? Get <span>Delicious</span> Food Delivered Fast</h1>
          <p>Order from your favorite restaurants and get fresh, hot meals delivered right to your doorstep in minutes. Thousands of dishes, one tap away.</p>
        </div>
        <div className="hero-visual">
          <div className="circle-bg">
            <div className="food-emoji">🍔</div>
            <div className="float-card card1">
              <div className="card-icon">⏱️</div>
              <div><div>30 mins</div><div className="card-sub">Average delivery</div></div>
            </div>
            <div className="float-card card2">
              <div className="card-icon">📦</div>
              <div><div>Order #2847</div><div className="card-sub">On the way! 🟢</div></div>
            </div>
            <div className="float-card card3">
              <div className="card-icon">🔥</div>
              <div><div>Trending</div><div className="card-sub">Spicy Burger</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="categories reveal">
        <div className="section-tag">Browse Categories</div>
        <div className="section-title">What Are You Craving?</div>
        <div className="cat-grid">
          {[['🍕','Pizza'],['🍔','Burgers'],['🍣','Sushi'],['🍜','Noodles'],['🌮','Mexican'],['🍗','Chicken'],['🥗','Salads'],['🍦','Desserts']].map(([icon, label]) => (
            <div className="cat-card" key={label}>
              <div className="icon">{icon}</div>
              <p>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how reveal">
        <div className="section-tag" style={{ color: '#ff9060' }}>How It Works</div>
        <div className="section-title">3 Simple Steps</div>
        <div className="steps">
          {[
            { n:'1', icon:'📍', title:'Choose Location', desc:'Enter your delivery address and discover restaurants near you.' },
            { n:'2', icon:'🛒', title:'Pick Your Food', desc:'Browse menus, customize your order and add to cart easily.' },
            { n:'3', icon:'🛵', title:'Fast Delivery', desc:'Sit back and relax while we bring your meal hot to your door.' },
          ].map(s => (
            <div className="step" key={s.n}>
              <div className="step-num">{s.n}</div>
              <div className="step-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* POPULAR DISHES */}
      <section className="popular reveal">
        <div className="section-tag" style={{ textAlign: 'center' }}>Popular Right Now</div>
        <div className="section-title" style={{ textAlign: 'center' }}>Trending Dishes</div>
        <div className="food-cards">
          {[
            { emoji:'🍕', bg:'bg1', name:'Margherita Pizza', meta:'Italian Classic · 25 min', price:'₹299', rating:'4.8', reviews:'320' },
            { emoji:'🍔', bg:'bg2', name:'Double Smash Burger', meta:'American · 20 min', price:'₹249', rating:'4.9', reviews:'510' },
            { emoji:'🍣', bg:'bg3', name:'Salmon Sushi Roll', meta:'Japanese · 35 min', price:'₹449', rating:'4.7', reviews:'280' },
          ].map(f => (
            <div className="food-card" key={f.name}>
              <div className={`food-img ${f.bg}`}>{f.emoji}</div>
              <div className="food-info">
                <h3>{f.name}</h3>
                <div style={{ fontSize:'12px', color:'#888' }}>{f.meta}</div>
                <div className="food-meta">
                  <span className="price">{f.price}</span>
                  <span className="rating">⭐ {f.rating} ({f.reviews})</span>
                  <button className="add-btn">+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <div className="cta-banner reveal">
        <div className="banner-text">
          <h2>Ready to Order? Get 20% Off!</h2>
          <p>Sign up now and enjoy your first delivery free with exclusive discounts.</p>
        </div>
        <div className="banner-btns">
          <button className="banner-btn-w" onClick={() => navigate('/signup')}>Get Started Free</button>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <p>© 2026 <span>Vingo</span> · Made with ❤️ for food lovers everywhere</p>
      </footer>
    </>
  )
}

export default LandingPage