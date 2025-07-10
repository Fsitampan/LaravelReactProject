import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BreadcrumbItem } from '@/types';


interface ShowProps {
  Rooms: {
    id: number;
    name: string;
    location: string;
    description: string;
    featured_image: string;
    status: string;
    created_at: string;
  };
}

const breadcrumbs: BreadcrumbItem[] = [
        {
        title: 'Informasi Ruangan',
        href: 'Rooms/show',
    },
];

export default function Show({ Rooms }: ShowProps) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Detail - ${Rooms.name}`} />
      <Card className="max-w-xl mx-auto mt-10">
        <CardHeader>
          <CardTitle>Detail Ruangan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <img src={`/storage/${Rooms.featured_image}`} className="w-full h-48 object-cover rounded" alt={Rooms.name} />
          <p><strong>Nama:</strong> {Rooms.name}</p>
          <p><strong>Lokasi:</strong> {Rooms.location}</p>
          <p><strong>Deskripsi:</strong> {Rooms.description}</p>
          <p><strong>Status:</strong> {Rooms.status}</p>
          <Link href={route('Rooms.index')} className="text-blue-500">← Kembali</Link>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
