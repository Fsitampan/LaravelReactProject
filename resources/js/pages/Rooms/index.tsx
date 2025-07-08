import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Eye, List, Pencil, Trash2 } from 'lucide-react';  
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { error } from 'console';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
        {
        title: 'Ruangan',
        href: '/Rooms',
        icon: List,
    },
];

interface Rooms{
    id: number;
    name: string;
    description: string;
    location: string;
    featured_image: string;
}

export default function index({...props}: { Rooms: Rooms [] }) {
    const { Rooms } = props;
    const { flash } = usePage<{ flash?: { success?: string; error?: string } } >().props;
    const flashmessage = flash?.success || flash?.error;
    const [ showAlert, setShowAlert ] = useState(flashmessage ? true : false);
    
    useEffect(() => {
       if (flashmessage){
        const timer = setTimeout(() => setShowAlert(false), 3000);
        return () => clearTimeout(timer);
       }
    }, [flashmessage])


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Rooms" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">

                {showAlert && flashmessage && (
                    <Alert variant={'default'} className={ `${flash?.success ? 'bg-green-800' : (flash?.error ? 'bg-red-800' : '')} ml-auto max-w-md text-white` }>
                         <AlertDescription className='text-white font-bold'>
                            {flash.success ? 'Success!' : 'Error!'} { '' }
                            {flashmessage}
                         </AlertDescription>
                    </Alert>
                )}

                <Link href={route('Rooms.create')}><Button className=''> + TAMBAH RUANGAN</Button></Link>
                <Card className='w-full h-auto'>
                <CardContent className='space-y-4'>
                <table className='w-full table-auto'>
                    <thead>
                        <tr>
                        <th className="p-4 border">No</th> 
                        <th className="p-4 border">Pratinjau</th> 
                        <th className="p-4 border">Nama Ruangan</th> 
                        <th className="p-4 border">Lokasi</th>
                        <th className="p-4 border">deskripsi</th>
                        <th className='p-4 border'>Status</th> 
                        <th className="p-4 border">Aksi</th>
                        </tr> 
                    </thead>
                    <tbody>
                        {Rooms.map((Rooms : Rooms, index : number) => (
                        <tr key={index}>
                        <td className="px-4 py-2 text-center border">{index + 1}</td> 
                        <td className="px-4 py-2 text-center border">
                           <img
                                src={`/storage/${Rooms.featured_image}`}
                                alt={Rooms.name}
                                className="h-16 w-18 object-cover" />
                        </td> 
                        <td className="border px-4 py-2 text-center ">{Rooms.name}</td> 
                        <td className="border px-4 py-2 text-center ">{Rooms.location}</td>
                        <td className="border px-4 py-2 text-center ">{Rooms.description}</td> 
                        <td className="border px-4 py-2 text-center "></td>
                         <td className="border px-4 py-2 text-center ">
                            <Link as='button' className='bg-sky-600 text-white p-1 rounded-lg cursor-pointer hover:opacity-90' href={route('Rooms.show', Rooms.id)}>
                            <Eye size={20} />{'  '}
                            </Link>

                            <Link as='button' className='bg-green-600 text-white p-1 rounded-lg cursor-pointer hover:opacity-90' href={route('Rooms.show', Rooms.id)}>
                            <Pencil size={20} />{'  '}
                            </Link>

                            <Link as='button' className='bg-red-600 text-white p-1 rounded-lg cursor-pointer hover:opacity-90' href={route('Rooms.show', Rooms.id)}>
                            <Trash2 size={20} />{'  '}
                            </Link>
                         </td>
                         </tr>
                         ))}
                    </tbody>                  
                </table>
                </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
