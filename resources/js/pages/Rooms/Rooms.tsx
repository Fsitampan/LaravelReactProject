import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { List } from 'lucide-react';  
import { Card, CardContent } from '@/components/ui/card';

const breadcrumbs: BreadcrumbItem[] = [
        {
        title: 'Ruangan',
        href: '/Rooms',
        icon: List,
    },
];

export default function Rooms() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Rooms" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Link href={route('Rooms.create')}><Button className=''> + TAMBAH RUANGAN</Button></Link>
                <Card className='w-full h-auto'>
                <CardContent className='space-y-4'>
                <table className='w-full table-auto'>
                    <thead>
                        <th className="p-4 border">No</th> 
                        <th className="p-4 border">Pratinjau</th> 
                        <th className="p-4 border">Nama Ruangan</th> 
                        <th className="p-4 border">Lokasi</th>
                        <th className='p-4 border'>Status</th> 
                        <th className="p-4 border">Aksi</th> 
                    </thead>
                    <tbody>
                        <td className="px-4 py-2 text-center border">1</td> 
                        <td className="px-4 py-2 text-center border"></td> 
                        <td className="px-4 py-2 text-center border">Ruang Sigma</td> 
                        <td className="px-4 py-2 text-center border">Mainland</td>
                        <td className="px-4 py-2 text-center border"></td> 
                        <td className="px-4 py-2 text-center border"></td>
                    </tbody>                  
                </table>
                </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
