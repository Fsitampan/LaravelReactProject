import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Eye, List, Pencil, Plus, Trash2, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Ruangan',
    href: '/Rooms',
    icon: List,
  },
];

interface Rooms {
  id: number;
  name: string;
  description: string;
  location: string;
  featured_image: string;
  featured_image_original_name: string;
  created_at: string;
}

interface LinkProps {
  active: boolean;
  label: string;
  url: string;
}

interface RoomstPagination {
  data: Rooms[];
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
  Rooms: RoomstPagination;
  filters: FilterProps;
  totalCount: number;
  filteredCount: number;
}

export default function Index({ Rooms, filters, totalCount, filteredCount }: IndexProps) {
    useState(filters.search || '');
  const [perPage, setPerPage] = useState(filters.perPage || '10');

  const { flash } = usePage<{ flash?: { success?: string; error?: string } }>().props;
  const flashMessage = flash?.success || flash?.error;
  const [showAlert, setShowAlert] = useState(!!flashMessage);

  useEffect(() => {
    if (flashMessage) {
      const timer = setTimeout(() => setShowAlert(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [flashMessage]);

  const { data, setData } = useForm({
    search: filters.search || '',
    perPage: filters.perPage || '10',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setData('search', value);

    const queryString = {
      ...(value && { search: value }),
      ...(data.perPage && { perPage: data.perPage }),
    };

    router.get(route('Rooms.index'), queryString, {
      preserveState: true,
      preserveScroll: true,
    });
  };

    const handleReset = () => {
    setData('search', '');
    setData('perPage', '10');
    router.get(route('Rooms.index'), {
        search: '',
        perPage: '10',
    }, {
        preserveState: true,
        preserveScroll: true,
    });
    };


  const handleDelete = (id: number, routeName: string) => {
    if (confirm('Are you sure, you want to delete?')) {
      router.delete(route(routeName, id), {
        preserveScroll: true,
      });
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Manajemen Ruangan" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">

        {showAlert && flashMessage && (
          <Alert variant="default" className={`${flash?.success ? 'bg-green-800' : 'bg-red-800'} ml-auto max-w-md text-white`}>
            <AlertDescription className="text-white font-bold">
              {flash.success ? 'Success!' : 'Error!'} {flashMessage}
            </AlertDescription>
          </Alert>
        )}

        <div className="flex items-center gap-2">
            <Input
            type="text"
            placeholder="Cari Ruangan..."
            value={data.search}
            onChange={(e) => {
            setData('search', e.target.value);
            router.get(route('Rooms.index'), {
            search: e.target.value,
            perPage: data.perPage,
            }, {
            preserveState: true,
            preserveScroll: true,
            });
            }}
            className="w-1/2"
            />

          <Button onClick={handleReset} className="bg-red-600 hover:bg-red-500">
            <X size={20} />
          </Button>
          <Link href={route('Rooms.create')}>
            <Button className="bg-blue-500"><Plus className="mr-2" /> Tambah Ruangan</Button>
          </Link>
        </div>

        <Card className="w-full h-auto">
          <CardContent className="space-y-4">
            <select
            className="border rounded px-2 py-1"
            value={data.perPage}
            onChange={(e) => {
                setData('perPage', e.target.value);
                router.get(route('Rooms.index'), {
                search: data.search,
                perPage: e.target.value,
                }, {
                preserveState: true,
                preserveScroll: true,
                });
            }}
            >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            </select>

            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th className="p-4 border">No</th>
                  <th className="p-4 border">Pratinjau</th>
                  <th className="p-4 border">Nama Ruangan</th>
                  <th className="p-4 border">Lokasi</th>
                  <th className="p-4 border">Deskripsi</th>
                  <th className="p-4 border">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {Rooms.data.length > 0 ? (
                  Rooms.data.map((Rooms: Rooms, index: number) => (
                    <tr key={Rooms.id}>
                      <td className="px-4 py-2 text-center border">{index + 1}</td>
                      <td className="px-2 py-2 text-center justify-center items-center border">
                    {Rooms.featured_image ? (
                      <img src={`/storage/${Rooms.featured_image}`} alt={Rooms.name} className="h-40 w-50 object-cover" />
                    ) : (
                      <span className="text-gray-400 italic">Tidak ada gambar</span>
                    )}

                      </td>
                      <td className="border px-4 py-2 text-center">{Rooms.name}</td>
                      <td className="border px-4 py-2 text-center">{Rooms.location}</td>
                      <td className="border px-4 py-2 text-center">{Rooms.description}</td>
                      <td className="border px-4 py-2 text-center">
                        <Link href={route('Rooms.show', Rooms.id)}>
                        <Button className="bg-sky-600 text-white p-1 rounded-lg hover:opacity-90">
                          <Eye size={18} />
                          </Button>
                        </Link>
                        <Link href={route('Rooms.edit', Rooms.id)}>
                        <Button className="bg-green-600 text-white p-1 rounded-lg hover:opacity-90 ml-1">
                          <Pencil size={18} />
                        </Button>
                        </Link>
                        <Button onClick={() => handleDelete(Rooms.id, 'Rooms.destroy')} className="bg-red-600 text-white p-1 rounded-lg hover:opacity-90 ml-1">
                          <Trash2 size={18} />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-4">Tidak ada data ruangan.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
