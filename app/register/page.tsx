'use client';
import { useState } from 'react';
import { useRegisterIntern } from '@/lib/hooks/useInterns';
import { toast } from 'sonner';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    school: '',
    category: 'SIWES' as 'SIWES' | 'Intern',
    regNumber: '',
    address: '',
  });
  const [siwesForm, setSiwesForm] = useState<File | null>(null);
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const registerMutation = useRegisterIntern();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      submitData.append(key, value);
    });
    
    if (siwesForm) submitData.append('siwesForm', siwesForm);
    if (paymentProof) submitData.append('paymentProof', paymentProof);

    try {
      await registerMutation.mutateAsync(submitData);
      toast('Registration successful!');
      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        school: '',
        category: 'SIWES',
        regNumber: '',
        address: '',
      });
      setSiwesForm(null);
      setPaymentProof(null);
    } catch (error) {
      toast('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Intern/SIWES Registration
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  School
                </label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value={formData.school}
                  onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Registration Number
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value={formData.regNumber}
                  onChange={(e) => setFormData({ ...formData, regNumber: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as 'SIWES' | 'Intern' })}
                >
                  <option value="SIWES">SIWES</option>
                  <option value="Intern">Intern</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <textarea
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                rows={3}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>

            {formData.category === 'SIWES' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  SIWES Form
                </label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="mt-1 block w-full"
                  onChange={(e) => setSiwesForm(e.target.files?.[0] || null)}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Payment Proof
              </label>
              <input
                type="file"
                required
                accept=".pdf,.jpg,.jpeg,.png"
                className="mt-1 block w-full"
                onChange={(e) => setPaymentProof(e.target.files?.[0] || null)}
              />
            </div>

            <button
              type="submit"
              disabled={registerMutation.isPending}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {registerMutation.isPending ? 'Registering...' : 'Register'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}