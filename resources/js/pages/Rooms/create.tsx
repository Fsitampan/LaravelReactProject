import AppLayout from '@/layouts/app-layout';
import { Head, useForm, router } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

export default function create() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    location: '',
    description: '',
    status: 'tersedia',
    featured_image: null as File | null,
  });

  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setData('featured_image', file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('Rooms.store'));
  };

  return (
    <AppLayout>
      <Head title="Tambah Ruangan" />
      <form onSubmit={handleSubmit} className="space-y-4 rounded-lg bg-white p-6 shadow-md">
        <h2 className="text-xl font-bold">Tambah Ruangan</h2>

        <div>
          <Label htmlFor="name">Nama Ruangan</Label>
          <Input id="name" name="name" value={data.name} onChange={e => setData('name', e.target.value)} />
          {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="location">Lokasi</Label>
            <Input id="location" name="location" value={data.location} onChange={e => setData('location', e.target.value)} />
            {errors.location && <span className="text-red-500 text-sm">{errors.location}</span>}
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              name="status"
              value={data.status}
              onChange={e => setData('status', e.target.value)}
              className="w-full rounded border px-2 py-2"
            >
              <option value="tersedia">Tersedia</option>
              <option value="tidak tersedia">Tidak Tersedia</option>
            </select>
          </div>
        </div>

        <div>
          <Label htmlFor="description">Deskripsi</Label>
          <Textarea id="description" name="description" value={data.description} onChange={e => setData('description', e.target.value)} />
        </div>

        <div>
          <Label htmlFor="featured_image">Thumbnail</Label>
          <Input type="file" id="featured_image" onChange={handleImageChange} />
          {preview && <img src={preview} alt="Preview" className="mt-2 h-32 rounded object-cover" />}
        </div>

        <Button type="submit" disabled={processing} className="bg-indigo-700 hover:bg-indigo-600 text-white">
          Simpan
        </Button>
      </form>
    </AppLayout>
  );
}
