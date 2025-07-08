import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LoaderCircle } from 'lucide-react';
import InputError from '@/components/input-error';

export function TextareaDisabled() {
  return <Textarea placeholder="Type your message here." disabled />
}


const breadcrumbs: BreadcrumbItem[] = [
        {
        title: 'Tambahkan Ruangan',
        href: 'Rooms/create',
    },
];

export default function Create() {

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        location: '',
        description:'',
        featured_image: null as File | null

    });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route('Rooms.List'), { onSuccess: () => console.log('formsubmitted'), onError: () => console.log(errors), forceFormData: true })
        console.log('data', data);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {           
            setData('featured_image', e.target.files[0]);
        } 
    }
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Rooms" />
            <div className="w-12/12 p-30 flex justify-center items-center" >
            <Card className='w-full max-w-lg h-auto'>
                <CardHeader>
                     <CardTitle>Tambahkan Ruangan</CardTitle> 
                     <Link className='text-sm text-blue-500 hover:underline' href={route('Rooms.index')}>Kembali</Link>
                     <hr className='border-t-2 border-gray-200'/>   
                  </CardHeader>  
            <CardContent className='space-y-4'>                
            <form onSubmit={submit} className='space-y-4'>
                <div className='gap-1.5'>
                <Label htmlFor="name">Ruangan</Label>
                <Input id='name' name='name' type='text' placeholder="Nama Ruangan"  autoFocus
                tabIndex={1} value={data.name} onChange={(e) => setData('name', e.target.value)} />
                <InputError message={errors.name} />
                </div>
                <div className='gap-1.5'>
                <Label htmlFor="location">Lokasi</Label>
                <Input id='location' name='location' type='text' placeholder="Lokasi Ruangan" autoFocus tabIndex={2} value={data.location}  onChange={(e) => setData('location', e.target.value)}/>
                <InputError message={errors.location} />
                </div>
                <div className='gap-1.5'>
                <Label htmlFor="descrption">deskripsi</Label>
                <Textarea id='description' name='description' placeholder="deskripsi ruangan" autoFocus tabIndex={3} value={data.description}  onChange={(e) => setData('description', e.target.value)}/>
                <InputError message={errors.description} />
                </div>
                <div className='gap-1.5'>
                    <Label htmlFor="featured_image">Gambar</Label>
                    <Input onChange={handleFileUpload} className='cursor-pointer' id='featured_image' name='featured_image' type='file' autoFocus tabIndex={4}/>
                <InputError message={errors.featured_image} />
                </div>
                <Button className='mt-4 w-fit cursor-pointer' type="submit" tabIndex={4}>
                    {/* processing && <LoaderCircle className="h-4 w-4 animate-spin" /> */}
                    TAMBAHKAN!</Button>
            </form>
            </CardContent>
            </Card>
            </div>
        </AppLayout>
    );
}
