'use client';
type Props = {
  options: Record<string, string>;
  selectedKey?: string;
  selectingKey: string | null;
  onSelect: (key: string) => void;
};
export default function OptionsList({ options, selectedKey, selectingKey, onSelect }: Props) {
  return (
    <div className="mt-6 space-y-3">
      {Object.entries(options).map(([key, val]) => {
        const isSelected = selectedKey === key;
        const isSelectingThis = selectingKey === key;

        const base =
          'w-full relative rounded-xl px-4 py-3 text-left transition outline-none border bg-white';
        const selectingCls = 'border-primary/70 ring-1 ring-primary/30 bg-primary/5';
        const savedCls = 'border-emerald-500 bg-emerald-50 text-emerald-700';
        const idleHover = 'hover:bg-muted/40';

        return (
          <button
            key={key}
            onClick={() => onSelect(key)}
            disabled={!!selectingKey}
            className={[
              base,
              isSelectingThis ? selectingCls : isSelected ? savedCls : idleHover
            ].join(' ')}
          >
            <div className="flex items-center gap-3">
              <span
                className={[
                  'font-semibold',
                  isSelected ? 'text-emerald-700' : 'text-muted-foreground'
                ].join(' ')}
              >
                {key}.
              </span>
              <span className={isSelected ? 'text-emerald-800' : 'text-foreground'}>{val}</span>
            </div>
            {isSelectingThis && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2">
                <svg
                  className="h-4 w-4 animate-spin text-primary"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    opacity="0.25"
                  />
                  <path
                    d="M22 12a10 10 0 0 1-10 10"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                  />
                </svg>
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
