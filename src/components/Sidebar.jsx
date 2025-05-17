import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiFilter } from 'react-icons/fi';

const Sidebar = ({ 
  isOpen, 
  onClose, 
  filters, 
  activeFilters, 
  toggleFilter,
  clearAllFilters
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 h-full w-72 bg-black border-r border-white/10 z-50 p-6 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-2">
                <FiFilter />
                <h3 className="text-lg">Filters</h3>
              </div>
              <button onClick={onClose} className="p-1 hover:bg-white/10 rounded">
                <FiX size={20} />
              </button>
            </div>

            {/* Active Filters */}
            {Object.keys(activeFilters).length > 0 && (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-sm uppercase text-white/60">Active Filters</h4>
                  <button 
                    onClick={clearAllFilters}
                    className="text-xs text-white/60 hover:text-white"
                  >
                    Clear all
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(activeFilters).map(([category, values]) => (
                    values.map(value => (
                      <div 
                        key={`${category}-${value}`} 
                        className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-full text-xs"
                      >
                        <span className="text-white/60">{category}:</span>
                        {value}
                        <button 
                          onClick={() => toggleFilter(category, value)}
                          className="text-white/60 hover:text-white"
                        >
                          <FiX size={12} />
                        </button>
                      </div>
                    ))
                  ))}
                </div>
              </div>
            )}

            {/* Filter Options */}
            <div className="space-y-8">
              {Object.entries(filters).map(([category, options]) => (
                <div key={category}>
                  <h4 className="text-sm uppercase mb-3 text-white/60">{category}</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {options.map(option => (
                      <button
                        key={option}
                        onClick={() => toggleFilter(category, option)}
                        className={`text-left text-sm py-1 px-2 rounded transition-colors ${
                          activeFilters[category]?.includes(option) 
                            ? 'bg-white text-black' 
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;