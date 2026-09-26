function SectionLabel({ children }) {
  return (
    <div data-reveal className="flex items-center gap-4 mb-10">
      <span className="font-serif italic text-xl text-signal shrink-0">
        {children}
      </span>
      <span data-reveal="line" className="h-px flex-1 bg-line" />
    </div>
  )
}

const CATEGORIES = [
  {
    name: 'Programming Languages',
    items: ['C', 'Java', 'Python', 'SQL'],
  },
  {
    name: 'Web development',
    items: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'HTML', 'CSS', 'Bootstrap'],
  },
  {
    name: 'Machine learning & AI',
    items: ['Neural networks', 'Deep learning (PyTorch)', 'Generative AI', 'Prompt engineering'],
  },
  {
    name: 'Data science',
    items: ['NumPy', 'Pandas', 'Scikit-learn'],
  },
  {
    name: 'Cloud',
    items: ['AWS'],
  },
  {
    name: 'Soft skills',
    items: ['Problem solving', 'Teamwork', 'Leadership'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="py-16 lg:py-20 border-t border-line scroll-mt-20">
      <SectionLabel>skills</SectionLabel>

      <div data-stagger className="grid sm:grid-cols-2 gap-x-10 gap-y-10">
        {CATEGORIES.map((cat) => (
          <div key={cat.name}>
            <h3 className="font-sans text-xs text-signal-dim mb-3">{cat.name}</h3>
            <ul data-prox data-stagger className="flex flex-wrap gap-2">
              {cat.items.map((item) => (
                <li
                  key={item}
                  className="text-sm text-muted border border-line rounded-full px-3.5 py-1"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
