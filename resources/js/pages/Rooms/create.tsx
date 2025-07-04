import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LoaderCircle } from 'lucide-react';

export function TextareaDisabled() {
  return <Textarea placeholder="Type your message here." disabled />
}


const breadcrumbs: BreadcrumbItem[] = [
        {
        title: 'Tambahkan Ruangan',
        href: '/Rooms/create',
    },
];

export default function Rooms() {

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        location: '',
        featured_image: null as File | null
    });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('data', data);
    }
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Rooms" />
            <div className="w-12/12 p-30 flex justify-center items-center" >
            <Card className='w-full max-w-lg h-auto'>
                <CardHeader>
                     <CardTitle>Tambahkan Ruangan</CardTitle> 
                     <Link className='text-sm text-blue-500 hover:underline' href={route('Rooms')}>Kembali</Link>
                     <hr className='border-t-2 border-gray-200'/>   
                  </CardHeader>  
            <CardContent className='space-y-4'>                
            <form onSubmit={submit} className='space-y-4'>
                <div className='gap-1.5'>
                <Label htmlFor="Nama Ruangan">Ruangan</Label>
                <Input id='nama_ruangan' name='nama_ruangan' type='text' placeholder="Nama Ruangan"  autoFocus
                tabIndex={1} value={data.name} onChange={(e) => setData('name', e.target.value)} />
                </div>
                <div className='gap-1.5'>
                <Label htmlFor="Lokasi Ruangan">Lokasi</Label>
                <Input id='Lokasi_Ruangan' name='Lokasi_Ruangan' type='text' placeholder="Lokasi Ruangan" autoFocus tabIndex={2} value={data.location}  onChange={(e) => setData('location', e.target.value)}/>
                </div>
                <div className='gap-1.5'>
                    <Label htmlFor="Image_path">Gambar</Label>
                    <Input className='cursor-pointer' id='Image_path' name='Image_path' type='file' autoFocus tabIndex={4}/>
                </div>
                <Button className='cursor-pointer' type="submit" >
                    {/* processing && <LoaderCircle className="h-4 w-4 animate-spin" /> */}
                    TAMBAHKAN!</Button>
            </form>
            </CardContent>
            </Card>
            </div>
        </AppLayout>
    );
}
