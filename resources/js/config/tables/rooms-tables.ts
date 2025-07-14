import { Eye, Pencil, Trash2 } from 'lucide-react';

const RoomsTableConfig = {
  columns: [
    { label: 'Nama', key: 'name' },
    { label: 'Lokasi', key: 'location' },
    { label: 'Status', key: 'status' },
    { label: 'Deskripsi', key: 'description' },
    { label: 'Gambar', key: 'featured_image', isImage: true },
    { label: 'Aksi', key: 'actions', isAction: true },
  ],
  actions: [
    {
      label: 'View',
      icon: 'Eye', // pastikan ini adalah nama icon valid dari lucide-react
      route: 'Rooms.show',
      className: 'text-blue-500 hover:text-blue-700',
    },
    {
      label: 'Edit',
      icon: 'Pencil',
      route: 'Rooms.edit',
      className: 'text-yellow-500 hover:text-yellow-700',
    },
    {
      label: 'Delete',
      icon: 'Trash2',
      route: 'Rooms.destroy',
      className: 'text-red-500 hover:text-red-700',
    },
  ],
};

export default RoomsTableConfig;
