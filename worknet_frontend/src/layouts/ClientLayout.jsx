import { Outlet } from 'react-router-dom';
import ClientSidebar from '../components/layout/ClientSidebar';
import ClientHeader from '../components/layout/ClientHeader';

export default function ClientLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ClientHeader />
      <div className="flex">
        <ClientSidebar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}