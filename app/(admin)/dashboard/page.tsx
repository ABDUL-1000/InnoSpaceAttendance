'use client';

import { useAllInterns, useAllSiwes } from '@/lib/hooks/useAdmins';
import Link from 'next/link';

export default function AdminDashboard() {
  const { data: interns, isLoading: internsLoading } = useAllInterns();
  const { data: siwes, isLoading: siwesLoading } = useAllSiwes();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Total Interns
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  {interns?.interns?.length || 0}
                </dd>
              </div>
            </div>
            
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Total SIWES
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  {siwes?.interns?.length || 0}
                </dd>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
            <Link
              href="/admin/interns"
              className="bg-white overflow-hidden shadow rounded-lg p-6 hover:bg-gray-50"
            >
              <h3 className="text-lg font-medium text-gray-900">Manage Interns</h3>
              <p className="mt-2 text-sm text-gray-500">View and manage all interns</p>
            </Link>
            
            <Link
              href="/admin/siwes"
              className="bg-white overflow-hidden shadow rounded-lg p-6 hover:bg-gray-50"
            >
              <h3 className="text-lg font-medium text-gray-900">Manage SIWES</h3>
              <p className="mt-2 text-sm text-gray-500">View and manage all SIWES students</p>
            </Link>
            
            <Link
              href="/admin/manual-add"
              className="bg-white overflow-hidden shadow rounded-lg p-6 hover:bg-gray-50"
            >
              <h3 className="text-lg font-medium text-gray-900">Add Manually</h3>
              <p className="mt-2 text-sm text-gray-500">Add new intern/SIWES manually</p>
            </Link>
          </div>

          {/* Recent Activity */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Recent Registrations
              </h3>
            </div>
            <div className="border-t border-gray-200">
              {/* Add recent activity list here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}