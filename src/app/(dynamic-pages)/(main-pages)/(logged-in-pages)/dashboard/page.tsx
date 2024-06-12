import { ClientPage } from './ClientPage';
import { PrivateItemsList } from '@/app/(dynamic-pages)/(main-pages)/PrivateItemsList';
import { getAllPrivateItems } from '@/data/anon/privateItems';
export const dynamic = 'force-dynamic';

export default async function NewItem() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      {/* <ClientPage /> */}
      {/* <PrivateItemsList privateItems={await getAllPrivateItems()} /> */}
    </div>
  );
}
