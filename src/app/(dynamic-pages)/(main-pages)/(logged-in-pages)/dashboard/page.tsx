import { ClientPage } from './ClientPage';
import { PrivateItemsList } from '@/app/(dynamic-pages)/(main-pages)/PrivateItemsList';
import { getAllPrivateItems } from '@/data/anon/privateItems';
export const dynamic = 'force-dynamic';

export default async function NewItem() {
  return (
    <div className="max-w-2xl">
      <ClientPage />
      Private items:
      <PrivateItemsList privateItems={await getAllPrivateItems()} />
    </div>
  );
}
