import CoursesLoader from './CoursesLoader';
import { Suspense } from 'react';
// export const dynamic = 'force-dynamic';
export default async function Page() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <h2 className="text-xl font-bold">Courses</h2>
      <Suspense fallback={<div>Loading courses...</div>}>
        <CoursesLoader />
      </Suspense>
      {/* <ClientPage /> */}
    </div>
  );
}
