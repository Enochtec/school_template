import { useState } from 'react'
import { X, ZoomIn, ImageOff } from 'lucide-react'

const Tag = ({ children }) => (
  <span className="inline-block px-3 py-1 text-xs font-bold text-orange-900 bg-orange-100 rounded-full uppercase tracking-wide mb-3">
    {children}
  </span>
)

const categories = ['All', 'Classrooms', 'Play & Sports', 'Arts & Crafts', 'Events', 'Meals']

const photos = [
  { id: 1,  cat: 'Classrooms',    title: 'Reading Circle',       src: 'https://images.unsplash.com/photo-1632215863153-0dae7657d0a9?w=700&h=700&fit=crop&auto=format&q=80' },
  { id: 2,  cat: 'Classrooms',    title: 'Classroom Activity',   src: 'https://images.unsplash.com/photo-1520254553641-2eed4cf2ef26?w=700&h=700&fit=crop&auto=format&q=80' },
  { id: 3,  cat: 'Classrooms',    title: 'Child Writing',        src: 'https://images.unsplash.com/photo-1547496614-d145e2fa88ed?w=700&h=700&fit=crop&auto=format&q=80' },
  { id: 4,  cat: 'Play & Sports', title: 'Outdoor Play',         src: 'https://images.unsplash.com/photo-1616168781728-1070e11bb7a1?w=700&h=700&fit=crop&auto=format&q=80' },
  { id: 5,  cat: 'Play & Sports', title: 'Sports Day',           src: 'https://images.unsplash.com/photo-1603139159949-ba25196fbc9e?w=700&h=700&fit=crop&auto=format&q=80' },
  { id: 6,  cat: 'Play & Sports', title: 'Team Games',           src: 'https://images.unsplash.com/photo-1547496613-4e19af6736dc?w=700&h=700&fit=crop&auto=format&q=80' },
  { id: 7,  cat: 'Arts & Crafts', title: 'Painting Workshop',    src: 'https://images.unsplash.com/photo-1459183885421-5cc683b8dbba?w=700&h=700&fit=crop&auto=format&q=80' },
  { id: 8,  cat: 'Arts & Crafts', title: 'Creative Art',         src: 'https://images.unsplash.com/photo-1473649085228-583485e6e4d7?w=700&h=700&fit=crop&auto=format&q=80' },
  { id: 9,  cat: 'Arts & Crafts', title: 'Craft Making',         src: 'https://images.unsplash.com/photo-1617056239820-8ce90ba48193?w=700&h=700&fit=crop&auto=format&q=80' },
  { id: 10, cat: 'Events',        title: 'School Event',         src: 'https://images.unsplash.com/photo-1627423895015-4db87342a410?w=700&h=700&fit=crop&auto=format&q=80' },
  { id: 11, cat: 'Events',        title: 'Cultural Day',         src: 'https://images.unsplash.com/photo-1664990594725-552201db8079?w=700&h=700&fit=crop&auto=format&q=80' },
  { id: 12, cat: 'Events',        title: 'Graduation Day',       src: 'https://images.unsplash.com/photo-1637148734636-906c24feeb55?w=700&h=700&fit=crop&auto=format&q=80' },
  { id: 13, cat: 'Meals',         title: 'Lunch Time',           src: 'https://images.unsplash.com/photo-1654027879796-b9dee8caabb6?w=700&h=700&fit=crop&auto=format&q=80' },
  { id: 14, cat: 'Meals',         title: 'Healthy Snacks',       src: 'https://images.unsplash.com/photo-1547496727-f44fe4fc93ab?w=700&h=700&fit=crop&auto=format&q=80' },
  { id: 15, cat: 'Classrooms',    title: 'Learning Together',    src: 'https://images.unsplash.com/photo-1606322958887-913deb8fed0e?w=700&h=700&fit=crop&auto=format&q=80' },
  { id: 16, cat: 'Play & Sports', title: 'Fun Activities',       src: 'https://images.unsplash.com/photo-1548102249-acdce64fffbd?w=700&h=700&fit=crop&auto=format&q=80' },
  { id: 17, cat: 'Arts & Crafts', title: 'Drawing Class',        src: 'https://images.unsplash.com/photo-1632215863479-201029d93143?w=700&h=700&fit=crop&auto=format&q=80' },
  { id: 18, cat: 'Events',        title: 'Parents Day',          src: 'https://images.unsplash.com/photo-1637148659333-aa7f09fc2d13?w=700&h=700&fit=crop&auto=format&q=80' },
]

function GalleryImage({ src, alt, onError, failed }) {
  if (failed) {
    return (
      <div className="w-full h-full bg-orange-50 flex flex-col items-center justify-center text-stone-300">
        <ImageOff size={32} />
        <span className="text-xs mt-2">{alt}</span>
      </div>
    )
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={onError}
      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
    />
  )
}

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selected, setSelected] = useState(null)
  const [failedIds, setFailedIds] = useState(new Set())

  const filtered = activeCategory === 'All' ? photos : photos.filter((p) => p.cat === activeCategory)

  const handleError = (id) => setFailedIds((prev) => new Set([...prev, id]))

  return (
    <div>
      {/* Hero */}
      <section className="bg-stone-950 text-white py-20 text-center px-6">
        <Tag>Gallery</Tag>
        <h1 className="text-4xl font-extrabold text-white mb-3">Moments of Joy & Learning</h1>
        <p className="text-stone-400 text-lg max-w-xl mx-auto">A glimpse into the vibrant, fun-filled days at Sunshine ECDE School.</p>
      </section>

      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border-2 transition-colors ${
                  activeCategory === cat
                    ? 'bg-orange-800 border-orange-800 text-white'
                    : 'border-stone-200 text-stone-600 hover:border-orange-800 hover:text-orange-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <p className="text-stone-400 text-sm mb-6">{filtered.length} photo{filtered.length !== 1 ? 's' : ''}</p>

          {/* Grid — 3 columns with larger cells */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((photo) => (
              <div
                key={photo.id}
                className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer bg-stone-100"
                onClick={() => setSelected(photo)}
              >
                <GalleryImage
                  src={photo.src}
                  alt={photo.title}
                  onError={() => handleError(photo.id)}
                  failed={failedIds.has(photo.id)}
                />
                <div className="absolute inset-0 bg-stone-950/0 group-hover:bg-stone-950/50 transition-all duration-300 flex items-end">
                  <div className="w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white font-semibold text-sm">{photo.title}</p>
                    <span className="text-white/70 text-xs">{photo.cat}</span>
                  </div>
                </div>
                <div className="absolute top-3 right-3 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn size={15} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 bg-stone-950/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl overflow-hidden max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <button
                className="absolute top-3 right-3 z-10 w-8 h-8 bg-stone-950/50 text-white rounded-full flex items-center justify-center hover:bg-stone-950 transition-colors"
                onClick={() => setSelected(null)}
              >
                <X size={16} />
              </button>
              {failedIds.has(selected.id) ? (
                <div className="h-80 bg-orange-50 flex items-center justify-center text-stone-300">
                  <ImageOff size={48} />
                </div>
              ) : (
                <img
                  src={selected.src.replace('w=700&h=700', 'w=1100&h=700')}
                  alt={selected.title}
                  className="w-full max-h-[70vh] object-cover"
                  onError={() => handleError(selected.id)}
                />
              )}
            </div>
            <div className="px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-stone-900">{selected.title}</h3>
                <span className="text-sm text-stone-400">{selected.cat}</span>
              </div>
              <span className="px-3 py-1 text-xs font-bold text-orange-900 bg-orange-100 rounded-full">{selected.cat}</span>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-stone-950 rounded-3xl px-10 py-14 text-center">
            <h2 className="text-3xl font-bold text-white mb-3">Want to See More?</h2>
            <p className="text-stone-400 mb-8 max-w-md mx-auto">Follow us on social media for daily updates, or visit us for a school tour.</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <a href="#" className="px-7 py-3 bg-orange-800 text-white rounded-full font-semibold hover:bg-orange-900 transition-colors">Follow on Facebook</a>
              <a href="#" className="px-7 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-stone-900 transition-colors">Follow on Instagram</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
