import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';

interface LaravelPaginationProps {
  data: {
    links: {
      label: string;
      url: string | null;
      active: boolean;
    }[];
  };
}

export default function LaravelPagination({ data }: LaravelPaginationProps) {
  return (
    <div className="mt-4 flex justify-center gap-1">
      {data.links.map((link, index) => (
        <Button
          key={index}
          variant={link.active ? 'default' : 'outline'}
          disabled={!link.url}
          onClick={() => link.url && router.visit(link.url)}
        >
          <span dangerouslySetInnerHTML={{ __html: link.label }} />
        </Button>
      ))}
    </div>
  );
}