import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
        {
        title: 'Riwayat',
        href: '/Historys',
    },
];

export default function Historys() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Historys" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">

            </div>
        </AppLayout>
    );
}
