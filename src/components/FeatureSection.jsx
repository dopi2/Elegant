export const FeatureSection = () => {
  const items = [
    {
      id: 1,
      title: "The Atlas Overshirt",
      price: "$385",
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea"
    },
    {
      id: 2,
      title: "Linen Travel Blazer",
      price: "$420",
      image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e4"
    },
    {
      id: 3,
      title: "Cashmere Lounge Set",
      price: "$695",
      image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9"
    }
  ];

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ margin: "-100px", once: true }}
      className="container mx-auto px-6 py-24"
    >
      <div className="flex justify-between items-end mb-16">
        <h2 className="text-4xl font-light">Season's Curated</h2>
        <motion.button 
          whileHover={{ x: 5 }}
          className="flex items-center gap-2 group"
        >
          View All
          <FiArrowUpRight className="transform group-hover:rotate-45 transition-transform"/>
        </motion.button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {items.map((item) => (
          <motion.div
            key={item.id}
            whileHover="hover"
            className="relative group"
          >
            <motion.div
              variants={{
                hover: { scale: 1.03 }
              }}
              className="aspect-[3/4] bg-gray-900 rounded-xl overflow-hidden"
            >
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </motion.div>
            
            <motion.div
              variants={{
                hover: { y: -10 }
              }}
              className="mt-6"
            >
              <h3 className="text-xl">{item.title}</h3>
              <p className="text-white/60">{item.price}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};