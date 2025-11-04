'use client';
import { Intern } from '@/app/types';
import { useAllInterns, useAllSiwes } from '@/lib/hooks/useAdmins';

import Link from 'next/link';


export default function AdminDashboard() {
  const { data: internsData, isLoading: internsLoading } = useAllInterns();
  const { data: siwesData, isLoading: siwesLoading } = useAllSiwes();

  const interns = internsData?.data?.interns || [];
  const siwes = siwesData?.data?.interns || [];
  
  const pendingInterns = interns.filter((intern: Intern) => intern.status === 'Pending');
  const acceptedInterns = interns.filter((intern: Intern) => intern.status === 'Accepted');
  const pendingSiwes = siwes.filter((siwesStudent: Intern) => siwesStudent.status === 'Pending');
  const acceptedSiwes = siwes.filter((siwesStudent: Intern) => siwesStudent.status === 'Accepted');

  if (internsLoading || siwesLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Total Interns
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {interns.length}
            </dd>
            <div className="mt-2 text-sm text-gray-500">
              <span className="text-green-600">{acceptedInterns.length} accepted</span>
              {' • '}
              <span className="text-yellow-600">{pendingInterns.length} pending</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Total SIWES
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {siwes.length}
            </dd>
            <div className="mt-2 text-sm text-gray-500">
              <span className="text-green-600">{acceptedSiwes.length} accepted</span>
              {' • '}
              <span className="text-yellow-600">{pendingSiwes.length} pending</span>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Total Students
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {interns.length + siwes.length}
            </dd>
            <div className="mt-2 text-sm text-gray-500">
              All registered students
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Pending Approvals
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {pendingInterns.length + pendingSiwes.length}
            </dd>
            <div className="mt-2 text-sm text-gray-500">
              Waiting for acceptance
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        <Link
          href="/admin/interns"
          className="bg-white overflow-hidden shadow rounded-lg p-6 hover:bg-gray-50 border border-gray-200"
        >
          <h3 className="text-lg font-medium text-gray-900">Manage Interns</h3>
          <p className="mt-2 text-sm text-gray-500">View and manage all interns</p>
        </Link>
        
        <Link
          href="/admin/siwes"
          className="bg-white overflow-hidden shadow rounded-lg p-6 hover:bg-gray-50 border border-gray-200"
        >
          <h3 className="text-lg font-medium text-gray-900">Manage SIWES</h3>
          <p className="mt-2 text-sm text-gray-500">View and manage all SIWES students</p>
        </Link>
        
        <Link
          href="/admin/manual-add"
          className="bg-white overflow-hidden shadow rounded-lg p-6 hover:bg-gray-50 border border-gray-200"
        >
          <h3 className="text-lg font-medium text-gray-900">Add Manually</h3>
          <p className="mt-2 text-sm text-gray-500">Add new intern/SIWES manually</p>
        </Link>
      </div>

      {/* Recent Students */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Interns */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Recent Interns
            </h3>
          </div>
          <div className="divide-y divide-gray-200">
            {interns.slice(0, 5).map((intern: Intern) => (
              <div key={intern._id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{intern.name}</h4>
                    <p className="text-sm text-gray-500">{intern.email}</p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    intern.status === 'Accepted' 
                      ? 'bg-green-100 text-green-800'
                      : intern.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {intern.status}
                  </span>
                </div>
              </div>
            ))}
            {interns.length === 0 && (
              <div className="px-4 py-8 text-center text-gray-500">
                No interns found
              </div>
            )}
          </div>
        </div>

        {/* Recent SIWES */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Recent SIWES
            </h3>
          </div>
          <div className="divide-y divide-gray-200">
            {siwes.slice(0, 5).map((siwesStudent: Intern) => (
              <div key={siwesStudent._id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{siwesStudent.name}</h4>
                    <p className="text-sm text-gray-500">{siwesStudent.email}</p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    siwesStudent.status === 'Accepted' 
                      ? 'bg-green-100 text-green-800'
                      : siwesStudent.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {siwesStudent.status}
                  </span>
                </div>
              </div>
            ))}
            {siwes.length === 0 && (
              <div className="px-4 py-8 text-center text-gray-500">
                No SIWES students found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}