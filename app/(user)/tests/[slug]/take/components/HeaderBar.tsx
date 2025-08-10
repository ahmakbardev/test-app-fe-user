import { ArrowLeft, ListOrdered } from 'lucide-react';

export default function HeaderBar({
  onBack,
  onOpenDrawer
}: {
  onBack: () => void;
  onOpenDrawer: () => void;
}) {
  return (
    <div className="flex items-center justify-between text-muted-foreground">
      <button onClick={onBack} className="p-2 rounded-full hover:bg-white/60">
        <ArrowLeft className="h-5 w-5" />
      </button>
      <button onClick={onOpenDrawer} className="p-2 rounded-full hover:bg-white/60">
        <ListOrdered className="h-5 w-5" />
      </button>
    </div>
  );
}
