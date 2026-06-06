import { useState } from 'react'
import { Heart, Star, Users, Globe, Target, Eye, User } from 'lucide-react'

const Tag = ({ children }) => (
  <span className="inline-block px-3 py-1 text-xs font-bold text-orange-700 bg-orange-100 rounded-full uppercase tracking-wide mb-3">
    {children}
  </span>
)

const PageHero = ({ tag, title, subtitle }) => (
  <section className="bg-stone-950 text-white py-20 text-center px-6">
    <Tag>{tag}</Tag>
    <h1 className="text-4xl font-extrabold text-white mb-3">{title}</h1>
    <p className="text-stone-400 text-lg max-w-xl mx-auto">{subtitle}</p>
  </section>
)

const values = [
  { icon: <Heart size={22} />, title: 'Love & Care', desc: 'Every child is treated with warmth, respect, and unconditional care.' },
  { icon: <Star size={22} />, title: 'Excellence', desc: "We set high standards while celebrating each child's unique achievements." },
  { icon: <Users size={22} />, title: 'Community', desc: 'We build a strong community of learners, families, and educators.' },
  { icon: <Globe size={22} />, title: 'Inclusivity', desc: 'Every child, regardless of background or ability, belongs and is valued.' },
]

const team = [
  { name: 'Mrs. Jane Kamau',  role: 'Head Teacher & Founder', exp: '20 years experience', img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300&h=300&fit=crop&auto=format&q=80' },
  { name: 'Mr. Peter Otieno', role: 'Deputy Head Teacher',    exp: '15 years experience', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&auto=format&q=80' },
  { name: 'Mrs. Alice Njeri',  role: 'PP2 Class Teacher',     exp: '10 years experience', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&auto=format&q=80' },
  { name: 'Mr. David Mwangi', role: 'PP1 Class Teacher',      exp: '8 years experience',  img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&auto=format&q=80' },
  { name: 'Ms. Fatuma Omar',  role: 'Playgroup Teacher',      exp: '6 years experience',  img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&auto=format&q=80' },
  { name: 'Mrs. Ruth Chebet', role: 'Special Needs Support',  exp: '12 years experience', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&auto=format&q=80' },
]

function TeamCard({ member: m }) {
  const [imgFailed, setImgFailed] = useState(false)
  return (
    <div className="bg-orange-50 border border-stone-200 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
      <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-4 border-white shadow-md">
        {imgFailed ? (
          <div className="w-full h-full bg-orange-100 flex items-center justify-center text-orange-700">
            <User size={36} strokeWidth={1.5} />
          </div>
        ) : (
          <img
            src={m.img}
            alt={m.name}
            className="w-full h-full object-cover"
            onError={() => setImgFailed(true)}
          />
        )}
      </div>
      <h3 className="font-bold text-stone-900 mb-1">{m.name}</h3>
      <p className="text-orange-700 font-medium text-sm mb-1">{m.role}</p>
      <p className="text-stone-400 text-xs">{m.exp}</p>
    </div>
  )
}

const milestones = [
  { year: '2010', label: 'Founded' },
  { year: '2014', label: 'Ministry Award' },
  { year: '2018', label: 'New Campus' },
  { year: '2024', label: 'CBC Certified' },
]

export default function About() {
  return (
    <div>
      <PageHero tag="About Us" title="Our Story, Our Mission" subtitle="Dedicated to shaping Kenya's next generation through quality early childhood education since 2010." />

      {/* Story */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <Tag>Our Story</Tag>
            <h2 className="text-3xl font-bold text-stone-900 mb-4 leading-snug">Built on a Foundation of Love for Children</h2>
            <p className="text-stone-500 leading-relaxed mb-4">Sunshine ECDE School was founded in 2010 by Mrs. Jane Kamau with a simple but powerful vision: to create a school where every child feels safe, loved, and excited to learn.</p>
            <p className="text-stone-500 leading-relaxed mb-4">Starting with just 15 children and 2 teachers, we have grown into a thriving community of over 120 children and a team of 30 dedicated staff members.</p>
            <p className="text-stone-500 leading-relaxed mb-8">Today, we are proud to be one of the most trusted ECDE centers in Nairobi, recognized for our commitment to excellence, safety, and holistic child development.</p>
            <div className="flex flex-wrap gap-3">
              {milestones.map(({ year, label }) => (
                <div key={year} className="bg-orange-100 rounded-xl px-4 py-3 text-center">
                  <span className="block text-xl font-extrabold text-orange-700">{year}</span>
                  <span className="block text-xs font-semibold text-orange-700 mt-0.5">{label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="bg-orange-600 rounded-2xl p-10 text-center text-white">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <User size={52} strokeWidth={1.2} />
              </div>
              <p className="font-semibold text-lg">Our School Community</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[['120+', 'Children'], ['30+', 'Staff'], ['15+', 'Years']].map(([val, lbl]) => (
                <div key={lbl} className="bg-white border border-stone-200 rounded-xl p-4 text-center">
                  <span className="block text-2xl font-extrabold text-orange-600">{val}</span>
                  <span className="block text-xs text-stone-500 mt-1">{lbl}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-8">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-700 mb-4"><Target size={24} /></div>
            <h3 className="text-xl font-bold text-stone-900 mb-3">Our Mission</h3>
            <p className="text-stone-500 leading-relaxed">To provide a nurturing, stimulating, and inclusive learning environment that fosters the holistic development of every child — intellectually, socially, emotionally, and physically — preparing them for lifelong success.</p>
          </div>
          <div className="bg-teal-50 border border-teal-200 rounded-2xl p-8">
            <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center text-teal-600 mb-4"><Eye size={24} /></div>
            <h3 className="text-xl font-bold text-stone-900 mb-3">Our Vision</h3>
            <p className="text-stone-500 leading-relaxed">To be the leading early childhood development center in Kenya, recognized for educational excellence, innovative practices, and our unwavering commitment to the well-being of every child in our care.</p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <Tag>Core Values</Tag>
            <h2 className="text-3xl font-bold text-stone-900 mb-3">What We Stand For</h2>
            <p className="text-stone-500 max-w-xl mx-auto">Our values guide everything we do, from how we teach to how we relate with families.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v) => (
              <div key={v.title} className="bg-white border border-stone-200 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-700 mx-auto mb-4">{v.icon}</div>
                <h3 className="font-bold text-stone-900 mb-2">{v.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <Tag>Our Team</Tag>
            <h2 className="text-3xl font-bold text-stone-900 mb-3">Meet the Dedicated Educators</h2>
            <p className="text-stone-500">Qualified, passionate, and deeply committed to every child's growth.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {team.map((m) => (
              <TeamCard key={m.name} member={m} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
