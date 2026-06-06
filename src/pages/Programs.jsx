import { Link } from 'react-router-dom'
import { CheckCircle, Star, Sunrise, Sunset, Utensils, Bus, ClipboardList } from 'lucide-react'

const Tag = ({ children }) => (
  <span className="inline-block px-3 py-1 text-xs font-bold text-orange-700 bg-orange-100 rounded-full uppercase tracking-wide mb-3">
    {children}
  </span>
)

const programs = [
  {
    id: 'playgroup',
    num: '01',
    name: 'Playgroup',
    ages: 'Ages 2–3 Years',
    tagline: 'First steps into the world of learning',
    desc: "Our Playgroup is a gentle introduction to structured learning through play. Children explore their environment, develop language skills, and begin forming friendships in a safe, loving setting.",
    schedule: 'Mon – Fri | 7:30 AM – 12:30 PM',
    fee: 'KSh 8,000 / term',
    activities: ['Sensory play & exploration', 'Storytime & nursery rhymes', 'Art & craft activities', 'Music & movement', 'Outdoor free play', 'Social skills development'],
    outcomes: ['Improved communication skills', 'Basic self-care habits', 'Curiosity and love of learning', 'Social and emotional readiness'],
    accent: 'orange',
  },
  {
    id: 'pp1',
    num: '02',
    name: 'Pre-Primary 1 (PP1)',
    ages: 'Ages 4–5 Years',
    tagline: 'Building foundations for lifelong learning',
    desc: "PP1 introduces children to structured learning with a focus on early literacy, numeracy, and science concepts through hands-on, play-based activities aligned with Kenya's CBC curriculum.",
    schedule: 'Mon – Fri | 7:00 AM – 1:30 PM',
    fee: 'KSh 10,000 / term',
    activities: ['Pre-reading & phonics', 'Number concepts 1–20', 'Environmental activities', 'Creative arts & crafts', 'Physical education', 'Digital literacy basics'],
    outcomes: ['Letter recognition & sounds', 'Basic number operations', 'Critical thinking skills', 'Healthy habits and hygiene'],
    accent: 'teal',
  },
  {
    id: 'pp2',
    num: '03',
    name: 'Pre-Primary 2 (PP2)',
    ages: 'Ages 5–6 Years',
    tagline: 'Ready, set, Grade 1!',
    desc: "PP2 is our most advanced program, designed to ensure children are fully prepared for primary school. We focus on reading fluency, writing, mathematical reasoning, and independence.",
    schedule: 'Mon – Fri | 7:00 AM – 3:00 PM',
    fee: 'KSh 12,000 / term',
    activities: ['Reading & comprehension', 'Writing & composition', 'Mathematics 1–100', 'Science experiments', 'Social studies', 'Computer basics'],
    outcomes: ['Reading fluency', 'Independent writing skills', 'Grade 1 mathematics readiness', 'Problem-solving and teamwork'],
    accent: 'violet',
  },
]

const extras = [
  { icon: <Sunrise size={24} />, title: 'Morning Care', time: '6:30 – 7:00 AM', desc: 'Early drop-off for working parents.' },
  { icon: <Sunset size={24} />, title: 'After-School Care', time: '3:00 – 5:30 PM', desc: 'Supervised activities and homework support.' },
  { icon: <Utensils size={24} />, title: 'Hot Lunch Program', time: 'Daily', desc: 'Nutritious, balanced meals prepared on-site.' },
  { icon: <Bus size={24} />, title: 'Transport Service', time: 'By Route', desc: 'Safe school bus service within select areas.' },
]

const accentMap = {
  orange: { bg: 'bg-orange-50', border: 'border-orange-200', icon: 'bg-orange-100 text-orange-700', badge: 'bg-orange-100 text-orange-700' },
  teal:   { bg: 'bg-teal-50',   border: 'border-teal-200',   icon: 'bg-teal-100 text-teal-600',     badge: 'bg-teal-100 text-teal-700' },
  violet: { bg: 'bg-violet-50', border: 'border-violet-200', icon: 'bg-violet-100 text-violet-600', badge: 'bg-violet-100 text-violet-700' },
}

export default function Programs() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-stone-950 text-white py-20 text-center px-6">
        <Tag>Our Programs</Tag>
        <h1 className="text-4xl font-extrabold text-white mb-3">Learning at Every Stage</h1>
        <p className="text-stone-400 text-lg max-w-xl mx-auto">Three carefully designed programs, each tailored to your child's developmental stage and aligned with Kenya's CBC curriculum.</p>
      </section>

      {/* Program Cards */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 flex flex-col gap-8">
          {programs.map((prog, i) => {
            const a = accentMap[prog.accent]
            return (
              <div key={prog.id} className={`grid grid-cols-1 lg:grid-cols-3 gap-6 ${i % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                {/* Quick info panel */}
                <div className={`${i % 2 === 1 ? 'lg:col-start-3' : ''} flex flex-col gap-4`}>
                  <div className={`${a.bg} border ${a.border} rounded-2xl flex items-center justify-center h-40`}>
                    <span className="text-8xl font-black opacity-10 text-stone-900 select-none">{prog.num}</span>
                  </div>
                  <div className={`${a.bg} border ${a.border} rounded-2xl p-5 flex flex-col gap-3`}>
                    {[['Schedule', prog.schedule], ['Term Fee', prog.fee], ['Age Group', prog.ages]].map(([lbl, val]) => (
                      <div key={lbl}>
                        <span className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-0.5">{lbl}</span>
                        <span className="text-sm font-semibold text-stone-800">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className={`lg:col-span-2 ${i % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <span className={`inline-block px-3 py-0.5 text-xs font-semibold rounded-full mb-3 ${a.badge}`}>{prog.ages}</span>
                  <h2 className="text-2xl font-bold text-stone-900 mb-1">{prog.name}</h2>
                  <p className="text-orange-700 font-medium text-sm mb-3">{prog.tagline}</p>
                  <p className="text-stone-500 leading-relaxed mb-5">{prog.desc}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div>
                      <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Activities Include</h4>
                      <ul className="space-y-1.5">
                        {prog.activities.map((a) => (
                          <li key={a} className="flex items-center gap-2 text-sm text-stone-700">
                            <CheckCircle size={13} className="text-orange-600 flex-shrink-0" />{a}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Learning Outcomes</h4>
                      <ul className="space-y-1.5">
                        {prog.outcomes.map((o) => (
                          <li key={o} className="flex items-center gap-2 text-sm text-stone-700">
                            <Star size={13} className="text-teal-500 flex-shrink-0" fill="currentColor" />{o}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <Link to="/contact" className="inline-block px-6 py-2.5 bg-orange-600 text-white rounded-full text-sm font-semibold hover:bg-orange-700 transition-colors">
                    Enroll in {prog.name}
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Extra Services */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <Tag>Additional Services</Tag>
            <h2 className="text-3xl font-bold text-stone-900 mb-3">Supporting Busy Families</h2>
            <p className="text-stone-500">A range of additional services to make school life easier for parents.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {extras.map((e) => (
              <div key={e.title} className="bg-orange-50 border border-stone-200 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-700 mx-auto mb-3">{e.icon}</div>
                <h3 className="font-bold text-stone-900 mb-1">{e.title}</h3>
                <p className="text-orange-700 text-xs font-semibold mb-1">{e.time}</p>
                <p className="text-stone-500 text-sm">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CBC Note */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-8 flex items-start gap-5">
            <div className="w-14 h-14 bg-orange-600 rounded-xl flex items-center justify-center text-white flex-shrink-0">
              <ClipboardList size={28} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">CBC Aligned Curriculum</h3>
              <p className="text-stone-500 leading-relaxed">All our programs follow the Kenya Institute of Curriculum Development (KICD) guidelines for the Competency Based Curriculum. Our children seamlessly transition into Grade 1 fully prepared.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
