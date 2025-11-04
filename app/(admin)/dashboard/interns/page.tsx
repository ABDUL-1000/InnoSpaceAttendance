'use client';
import { useState } from 'react';
import { useAllInterns, useAcceptIntern, useUploadAcceptanceLetter, useUploadCertificate } from '@/lib/hooks/useAdmins';
import { Intern } from '@/app/types';

export default function InternsPage() {
  const { data: internsData, isLoading } = useAllInterns();
  const acceptInternMutation = useAcceptIntern();
  const uploadAcceptanceMutation = useUploadAcceptanceLetter();
  const uploadCertificateMutation = useUploadCertificate();
  
  const [selectedIntern, setSelectedIntern] = useState<Intern | null>(null);
  const [actionType, setActionType] = useState<'acceptance' | 'certificate' | ''>('');
  const [uploading, setUploading] = useState(false);

  const interns = internsData?.data?.interns || [];
  const pendingInterns = interns.filter((intern: Intern) => intern.status === 'Pending');
  const acceptedInterns = interns.filter((intern: Intern) => intern.status === 'Accepted');

  const handleAccept = async (internId: string) => {
    if (!confirm('Are you sure you want to accept this intern?')) return;
    
    try {
      await acceptInternMutation.mutateAsync(internId);
      alert('Intern accepted successfully!');
    } catch (error) {
      alert('Failed to accept intern');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, intern: Intern, type: 'acceptance' | 'certificate') => {
    const file = e.target.files?.[0];
    if (!file || !intern) return;

    setUploading(true);
    try {
      if (type === 'acceptance') {
        await uploadAcceptanceMutation.mutateAsync({ internId: intern._id, file });
        alert('Acceptance letter uploaded successfully!');
      } else {
        await uploadCertificateMutation.mutateAsync({ internId: intern._id, file });
        alert('Certificate uploaded successfully!');
      }
      setSelectedIntern(null);
      setActionType('');
    } catch (error) {
      alert('Failed to upload file');
    } finally {
      setUploading(false);
      e.target.value = ''; // Reset file input
    }
  };

  const renderTable = (interns: Intern[], title: string) => (
    <div className="bg-white shadow rounded-lg mb-8">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-500">{interns.length} interns</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                School & Course
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {interns.map((intern: Intern) => (
              <tr key={intern._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{intern.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{intern.phone}</div>
                  <div className="text-sm text-gray-500">{intern.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{intern.school}</div>
                  <div className="text-sm text-gray-500">{intern.course || 'No course specified'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    intern.status === 'Accepted' 
                      ? 'bg-green-100 text-green-800'
                      : intern.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {intern.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  {intern.status === 'Pending' && (
                    <button
                      onClick={() => handleAccept(intern._id)}
                      disabled={acceptInternMutation.isPending}
                      className="text-green-600 hover:text-green-900 disabled:opacity-50"
                    >
                      Accept
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setSelectedIntern(intern);
                      setActionType('acceptance');
                    }}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Upload Acceptance
                  </button>
                  <button
                    onClick={() => {
                      setSelectedIntern(intern);
                      setActionType('certificate');
                    }}
                    className="text-purple-600 hover:text-purple-900"
                  >
                    Upload Certificate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {interns.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No {title.toLowerCase()} found
          </div>
        )}
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading interns...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Interns Management</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Total Interns</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">{interns.length}</dd>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Pending</dt>
            <dd className="mt-1 text-3xl font-semibold text-yellow-600">{pendingInterns.length}</dd>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Accepted</dt>
            <dd className="mt-1 text-3xl font-semibold text-green-600">{acceptedInterns.length}</dd>
          </div>
        </div>
      </div>

      {/* Pending Interns Table */}
      {renderTable(pendingInterns, 'Pending Interns')}

      {/* Accepted Interns Table */}
      {renderTable(acceptedInterns, 'Accepted Interns')}

      {/* File Upload Modal */}
      {selectedIntern && actionType && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Upload {actionType === 'acceptance' ? 'Acceptance Letter' : 'Certificate'} for {selectedIntern.name}
            </h3>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              onChange={(e) => handleFileUpload(e, selectedIntern, actionType)}
              disabled={uploading}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setSelectedIntern(null);
                  setActionType('');
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                disabled={uploading}
              >
                Cancel
              </button>
            </div>
            {uploading && (
              <div className="mt-4 text-sm text-blue-600">
                Uploading file...
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}