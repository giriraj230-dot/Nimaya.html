import { Sparkles } from 'lucide-react';

export type AgeFilter = 'all' | '0-6m' | '6-12m' | '1-4y';

interface RoutineBarProps {
  selectedFilter: AgeFilter;
  onSelectFilter: (filter: AgeFilter) => void;
}

export function RoutineBar({ selectedFilter, onSelectFilter }: RoutineBarProps) {
  const tabs = [
    { id: 'all' as AgeFilter, label: 'All 4 Essentials', desc: 'Complete daily care line' },
    { id: '0-6m' as AgeFilter, label: '0–6 Months', desc: 'Newborn acid-mantle safe' },
    { id: '6-12m' as AgeFilter, label: '6–12 Months', desc: 'Sun defense & high-chair cleanups' },
    { id: '1-4y' as AgeFilter, label: '1–4 Years', desc: 'Active playground & bath routines' },
  ];

  return (
    <div className="w-full bg-[#E8EFE8] rounded-2xl p-2 sm:p-3 border border-[#CBD8CB] max-w-4xl mx-auto shadow-2xs">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-2 mb-2 sm:mb-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#34483A]">
          <Sparkles className="w-3.5 h-3.5 text-[#56705C]" />
          <span>Filter by Little One’s Age Stage:</span>
        </div>
        <span className="text-[11px] font-medium text-[#5E6F62]">Formulated for delicate skin 0–4 years</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {tabs.map((tab) => {
          const isActive = selectedFilter === tab.id;
          return (
            <button
              key={tab.id}
              id={`filter-tab-${tab.id}`}
              type="button"
              onClick={() => onSelectFilter(tab.id)}
              className={`p-2.5 sm:p-3 rounded-xl text-left transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#FFFDF9] text-[#26382C] shadow-sm border border-[#B9CDBD] ring-1 ring-[#91AD98]/60'
                  : 'bg-transparent text-[#3F5145] hover:bg-[#F8FBF7] hover:shadow-sm'
              }`}
            >
              <div className="text-xs font-bold leading-tight">{tab.label}</div>
              <div className="text-[10px] text-[#637167] mt-0.5 truncate">{tab.desc}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
