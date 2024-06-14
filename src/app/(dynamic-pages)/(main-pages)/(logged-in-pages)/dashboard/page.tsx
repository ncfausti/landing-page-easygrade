// import { ClientPage } from './ClientPage';
import { getAllStudentsAction } from '@/data/user/students';
export const dynamic = 'force-dynamic';

export default async function NewItem() {
  const students = await getAllStudentsAction();
  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      {students &&
        students.map((student) => (
          <div key={student.id}>
            {student.first_name} {student.last_name}{' '}
          </div>
        ))}

      {/* <ClientPage /> */}
    </div>
  );
}
