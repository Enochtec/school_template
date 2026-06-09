import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Award, GraduationCap, Users, BookOpen, Shield, Heart, Utensils, ArrowRight, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import EnrollModal from '../components/EnrollModal'

const Tag = ({ children }) => (
  <span className="inline-block px-3 py-1 text-xs font-bold text-orange-900 bg-orange-100 rounded-full uppercase tracking-wide mb-3">
    {children}
  </span>
)

const stats = [
  { icon: <Award size={26} />, value: '15+', label: 'Years of Excellence' },
  { icon: <GraduationCap size={26} />, value: '500+', label: 'Happy Graduates' },
  { icon: <Users size={26} />, value: '30+', label: 'Qualified Teachers' },
  { icon: <BookOpen size={26} />, value: '3', label: 'Programs Offered' },
]

const carouselSlides = [
  {
    src: 'https://images.unsplash.com/photo-1536337005238-94b997371b40?w=1800&h=750&fit=crop&auto=format&q=85',
    label: 'Community & Belonging',
    caption: 'Building bright futures together — one child at a time',
  },
  {
    src: 'https://images.unsplash.com/photo-1521493959102-bdd6677fdd81?w=1800&h=750&fit=crop&auto=format&q=85',
    label: 'Reading & Literacy',
    caption: 'Children engaged in collaborative reading sessions every morning',
  },
  {
    src: 'https://images.unsplash.com/photo-1548102245-c79dbcfa9f92?w=1800&h=750&fit=crop&auto=format&q=85',
    label: 'Play & Recreation',
    caption: 'Outdoor play builds physical strength and lifelong social skills',
  },
  {
    src: 'https://images.unsplash.com/photo-1632215861513-130b66fe97f4?w=1800&h=750&fit=crop&auto=format&q=85',
    label: 'Classroom Learning',
    caption: 'Hands-on, CBC-aligned activities for holistic development',
  },
]

const features = [
  { icon: <GraduationCap size={20} />, title: 'Qualified Teachers', desc: 'All our teachers hold ECDE diplomas and are passionate about early childhood education.' },
  { icon: <Shield size={20} />, title: 'Safe Environment', desc: 'Secure, clean, and child-friendly facilities designed to stimulate learning.' },
  { icon: <Heart size={20} />, title: 'Holistic Development', desc: 'We nurture cognitive, social, emotional, and physical development through play.' },
  { icon: <BookOpen size={20} />, title: 'CBC Curriculum', desc: "Our curriculum aligns with Kenya's CBC for seamless transition to Grade 1." },
  { icon: <Utensils size={20} />, title: 'Healthy Nutrition', desc: "Balanced meals and snacks provided daily to support children's growth." },
  { icon: <Users size={20} />, title: 'Parent Involvement', desc: 'Regular updates, open days, and parent workshops to keep families engaged.' },
]

const programs = [
  {
    age: 'Ages 2–3',
    name: 'Playgroup',
    desc: 'First steps into social learning through guided play, sensory activities, and creative exploration.',
    img: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=700&h=340&fit=crop&auto=format&q=80',
    featured: false,
  },
  {
    age: 'Ages 4–5',
    name: 'Pre-Primary 1',
    desc: 'Building foundational literacy, numeracy, and social skills in a structured yet playful environment.',
    img: 'https://images.unsplash.com/photo-1632215865645-3efa9af21424?w=700&h=340&fit=crop&auto=format&q=80',
    featured: true,
  },
  {
    age: 'Ages 5–6',
    name: 'Pre-Primary 2',
    desc: 'Preparing children for Grade 1 with advanced reading, writing, and critical thinking skills.',
    img: 'https://images.unsplash.com/photo-1549380883-4dd936bbc0fa?w=700&h=340&fit=crop&auto=format&q=80',
    featured: false,
  },
]

const testimonials = [
  { name: 'Mary Wanjiku', role: 'Parent of PP2 Student', text: 'My daughter has blossomed since joining Sunshine ECDE. The teachers are so caring and she loves every day at school.' },
  { name: 'James Ochieng', role: 'Parent of PP1 Student', text: 'Excellent school! The staff are professional and my son has made incredible progress in just one term.' },
  { name: 'Grace Akinyi', role: 'Parent of Playgroup Child', text: 'I was nervous about leaving my toddler but the warm, nurturing environment put my mind at ease immediately.' },
]

const galleryPreviews = [
  { src: 'https://images.unsplash.com/photo-1567057419565-4349c49d8a04?w=900&h=600&fit=crop&auto=format&q=80', alt: 'African school children', wide: true },
  { src: 'https://images.unsplash.com/photo-1543689604-6fe8dbcd1f59?w=700&h=500&fit=crop&auto=format&q=80', alt: 'Children learning' },
  { src: 'https://images.unsplash.com/photo-1547226706-af7e2c20bcea?w=700&h=500&fit=crop&auto=format&q=80', alt: 'Classroom activity' },
  { src: 'https://images.unsplash.com/photo-1632932693914-89b90ae3d16d?w=700&h=500&fit=crop&auto=format&q=80', alt: 'School life' },
]

export default function Home() {
  const [slide, setSlide] = useState(0)
  const [enrollOpen, setEnrollOpen] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((s) => (s + 1) % carouselSlides.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [])

  const prevSlide = () => setSlide((s) => (s - 1 + carouselSlides.length) % carouselSlides.length)
  const nextSlide = () => setSlide((s) => (s + 1) % carouselSlides.length)

  return (
    <div>
      {enrollOpen && <EnrollModal onClose={() => setEnrollOpen(false)} />}

      {/* ── Hero — full-width background photo ── */}
      <section className="relative min-h-[calc(100vh-70px)] flex items-center">
        <img
          src="https://images.unsplash.com/photo-1572202170122-871fa0dfbc71?w=1800&h=1000&fit=crop&auto=format&q=85"
          alt="Sunshine ECDE School administration block"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-stone-950/65"></div>
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-24">
          <div className="max-w-2xl">
            <Tag>Welcome to Sunshine ECDE School</Tag>
            <h1 className="text-4xl lg:text-6xl font-extrabold text-white leading-tight mb-5">
              Where Little Minds <span className="text-orange-600">Grow Big</span> Dreams
            </h1>
            <p className="text-stone-200 text-lg leading-relaxed mb-10">
              A loving, stimulating environment where children aged 2–6 discover the joy of learning through play, creativity, and exploration.
            </p>
            <div className="flex flex-wrap gap-4 mb-16">
              <button
                onClick={() => setEnrollOpen(true)}
                className="px-8 py-3.5 bg-orange-800 text-white rounded-full font-semibold hover:bg-orange-900 transition-colors text-base"
              >
                Enroll Your Child
              </button>
              <Link to="/about" className="px-8 py-3.5 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-stone-900 transition-colors text-base">
                Learn More
              </Link>
            </div>
            {/* Inline stats */}
            <div className="flex flex-wrap gap-8">
              {stats.map((s) => (
                <div key={s.label} className="flex items-center gap-3">
                  <div className="text-orange-600">{s.icon}</div>
                  <div>
                    <span className="block text-2xl font-extrabold text-white leading-none">{s.value}</span>
                    <span className="block text-xs text-stone-300 mt-0.5">{s.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Carousel — edge-to-edge ── */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center mb-10">
          <Tag>Life at Sunshine</Tag>
          <h2 className="text-3xl font-bold text-stone-900 mb-3">A Day in Our School</h2>
          <p className="text-stone-500">Every day is filled with laughter, learning, and growth.</p>
        </div>

        {/* Full-width carousel — no container constraint */}
        <div className="relative shadow-2xl">
          {carouselSlides.map((sl, i) => (
            <div key={i} className={i === slide ? 'block' : 'hidden'}>
              <img
                src={sl.src}
                alt={sl.caption}
                className="w-full h-[520px] object-cover"
              />
              <div className="absolute inset-0 bg-stone-950/45 flex flex-col justify-end pointer-events-none">
                <div className="max-w-6xl mx-auto w-full px-10 pb-10">
                  <span className="inline-block px-3 py-1 text-xs font-bold text-white bg-orange-800 rounded-full mb-3">{sl.label}</span>
                  <p className="text-white text-2xl font-semibold max-w-xl">{sl.caption}</p>
                </div>
              </div>
            </div>
          ))}

          <button onClick={prevSlide} aria-label="Previous slide"
            className="absolute left-5 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/20 hover:bg-white/50 text-white rounded-full flex items-center justify-center transition-colors">
            <ChevronLeft size={22} />
          </button>
          <button onClick={nextSlide} aria-label="Next slide"
            className="absolute right-5 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/20 hover:bg-white/50 text-white rounded-full flex items-center justify-center transition-colors">
            <ChevronRight size={22} />
          </button>

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
            {carouselSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${i === slide ? 'bg-white w-7' : 'bg-white/50 w-2.5'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Features + photo collage ── */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <Tag>Why Choose Us</Tag>
            <h2 className="text-3xl font-bold text-stone-900 mb-3">A Place Where Every Child Thrives</h2>
            <p className="text-stone-500 max-w-xl mx-auto">We combine expert teaching with a loving atmosphere to give your child the best start in life.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((f) => (
                <div key={f.title} className="bg-white rounded-2xl p-5 border border-stone-200 hover:shadow-lg transition-shadow">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-900 mb-3">{f.icon}</div>
                  <h3 className="font-bold text-stone-900 mb-1 text-sm">{f.title}</h3>
                  <p className="text-stone-500 text-xs leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
            {/* Photo collage */}
            <div className="grid grid-cols-2 gap-3">
              {galleryPreviews.map((item, i) => (
                <div key={i} className={`rounded-2xl overflow-hidden ${item.wide ? 'col-span-2 h-56' : 'h-40'}`}>
                  <img src={item.src} alt={item.alt} loading="lazy"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Programs Preview ── */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <Tag>Our Programs</Tag>
            <h2 className="text-3xl font-bold text-stone-900 mb-3">Programs for Every Stage</h2>
            <p className="text-stone-500">Age-appropriate programs designed to meet each child's developmental needs.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {programs.map((p) => (
              <div key={p.name} className={`relative rounded-2xl overflow-hidden border-2 hover:shadow-lg transition-shadow ${p.featured ? 'border-orange-800' : 'border-stone-200'}`}>
                {p.featured && (
                  <span className="absolute top-3 left-1/2 -translate-x-1/2 z-10 px-4 py-1 bg-orange-800 text-white text-xs font-bold rounded-full whitespace-nowrap shadow">
                    Most Popular
                  </span>
                )}
                <div className="h-52 overflow-hidden">
                  <img src={p.img} alt={p.name} loading="lazy"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className={`p-6 ${p.featured ? 'bg-orange-50' : ''}`}>
                  <span className="inline-block px-3 py-0.5 text-xs font-semibold text-orange-900 bg-orange-100 rounded-full mb-3">{p.age}</span>
                  <h3 className="text-xl font-bold text-stone-900 mb-2">{p.name}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed mb-5">{p.desc}</p>
                  <Link to="/programs" className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-900 hover:text-orange-900 transition-colors">
                    Learn More <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="bg-orange-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <Tag>Parent Reviews</Tag>
            <h2 className="text-3xl font-bold text-stone-900 mb-3">What Parents Say</h2>
            <p className="text-stone-500">Don't just take our word for it — hear from the families we serve.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 border border-stone-200">
                <div className="flex gap-0.5 text-teal-500 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <p className="text-stone-600 text-sm leading-relaxed italic mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-800 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-stone-900 text-sm">{t.name}</p>
                    <p className="text-stone-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-stone-950 rounded-3xl px-10 py-16 text-center">
            <h2 className="text-3xl font-bold text-white mb-3">Ready to Enroll Your Child?</h2>
            <p className="text-stone-400 mb-8 max-w-lg mx-auto">Admissions are open for the 2026 academic year. Spaces are limited — secure your child's spot today.</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <button onClick={() => setEnrollOpen(true)} className="px-7 py-3 bg-orange-800 text-white rounded-full font-semibold hover:bg-orange-900 transition-colors">Apply Now</button>
              <Link to="/programs" className="px-7 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-stone-900 transition-colors">View Programs</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
