import { CustomTable } from '@/components/ui/CustomTable';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import LaravelPagination from '@/components/ui/LaravelPagination';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { CirclePlusIcon, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import RoomsTableConfig from '@/config/tables/rooms-tables';

const breadcrumbs: BreadcrumbItem[] = [
  { 
    title: 'Daftar Ruangan', 
    href: '/Rooms' 
},
];

interface LinkProps {
  active: boolean;
  label: string;
  url: string;
}

interface Room {
  id: number;
  name: string;
  location: string;
  description: string;
  status: string;
  featured_image: string;
  featured_image_original_name: string;
}

interface RoomPagination {
  data: Room[];
  links: LinkProps[];
  from: number;
  to: number;
  total: number;
}

interface FilterProps {
  search: string;
  perPage: string;
}

interface IndexProps {
  Rooms: RoomPagination;
  filters: FilterProps;
  totalCount: number;
  filteredCount: number;
}

export default function index({ Rooms, filters, totalCount, filteredCount }: IndexProps) {
  const { flash } = usePage<{ flash?: { success?: string; error?: string } }>().props;
  const flashMessage = flash?.success || flash?.error;
  const [showAlert, setShowAlert] = useState(!!flashMessage);

  const { data, setData } = useForm({
    search: filters.search || '',
    perPage: filters.perPage || '10',
  });

  useEffect(() => {
    if (flashMessage) {
      const timer = setTimeout(() => setShowAlert(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [flashMessage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setData('search', value);

    router.get(route('rooms.index'), {
      search: value,
      perPage: data.perPage,
    }, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const handleReset = () => {
    setData('search', '');
    setData('perPage', '10');

    router.get(route('rooms.index'), {}, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const handlePerPageChange = (value: string) => {
    setData('perPage', value);
    router.get(route('rooms.index'), {
      search: data.search,
      perPage: value,
    }, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const handleDelete = (routeString: string) => {
    if (confirm('Yakin ingin menghapus ruangan ini?')) {
      router.delete(routeString, { preserveScroll: true });
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Daftar Ruangan" />

      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        {showAlert && flashMessage && (
          <Alert variant="default" className={`ml-auto max-w-md text-white ${flash?.success ? 'bg-green-800' : 'bg-red-800'}`}>
            <AlertDescription>{flash?.success ? 'Success!' : 'Error!'} {flashMessage}</AlertDescription>
          </Alert>
        )}

        <div className="mb-4 flex w-full items-center justify-between gap-4">
          <Input
            type="text"
            value={data.search}
            onChange={handleChange}
            className="h-10 w-1/2"
            placeholder="Cari Ruangan..."
            name="search"
          />

          <Button onClick={handleReset} className="h-10 cursor-pointer bg-red-600 hover:bg-red-500">
            <X size={20} />
          </Button>

          <div className="ml-auto">
            <Link
              className="flex cursor-pointer items-center rounded-lg bg-indigo-800 px-4 py-2 text-white hover:opacity-90"
              as="button"
              href={route('rooms.create')}
            >
              <CirclePlusIcon className="me-2" /> Tambah Ruangan
            </Link>
          </div>
        </div>

        <CustomTable
          columns={RoomsTableConfig.columns}
          actions={RoomsTableConfig.actions}
          data={Rooms.data}
          from={Rooms.from}
          onDelete={handleDelete}
          onView={() => {}}
          onEdit={() => {}}
        />

        <LaravelPagination data={Rooms} />
      </div>
    </AppLayout>
  );
}
