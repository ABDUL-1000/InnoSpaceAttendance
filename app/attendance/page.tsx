'use client';
import { useState, useEffect } from 'react';
import { useInternDetails, useMarkAttendance } from '@/lib/hooks/useAttendance';
import { useLocation } from '@/lib/hooks/useLocation';
import { toast } from 'sonner';

export default function AttendancePage() {
  const [phone, setPhone] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [shouldVerify, setShouldVerify] = useState(false);
  

  const { data: internDetails, isLoading: isCheckingDetails, error, refetch } = useInternDetails(phone);
  console.log(internDetails, "internsdetails...");
  
  const markAttendanceMutation = useMarkAttendance();
  const { location, getCurrentLocation } = useLocation();

 
  const validatePhone = (phoneNumber: string) => {
    const cleanedPhone = phoneNumber.replace(/\D/g, '');
    return cleanedPhone.length === 11;
  };

  // Auto-trigger verification when phone reaches 11 digits
  useEffect(() => {
    const cleanedPhone = phone.replace(/\D/g, '');
    
    if (cleanedPhone.length === 11) {
      setPhoneError('');
      setShouldVerify(true);
    } else if (cleanedPhone.length > 11) {
      setPhoneError('Phone number should be 11 digits');
      setShouldVerify(false);
    } else {
      setPhoneError('');
      setShouldVerify(false);
    }
  }, [phone]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
 
    const cleanedInput = input.replace(/\D/g, '').slice(0, 11);
    setPhone(cleanedInput);
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phone.trim()) {
      setPhoneError('Please enter your phone number');
      return;
    }

    if (!validatePhone(phone)) {
      setPhoneError('Phone number must be exactly 11 digits');
      return;
    }


    if (error) {
      try {
        await refetch();
      } catch (err) {
        console.error('Refetch error:', err);
      }
    }

   
    if (internDetails && !error) {
      setIsGettingLocation(true);
      try {
        await getCurrentLocation();
        setShowConfirmation(true);
      } catch (error) {
        toast('Unable to get your location. Please enable location services to mark attendance.');
        console.error('Location error:', error);
      } finally {
        setIsGettingLocation(false);
      }
    } else {
      // If we don't have valid details, show error or get location anyway
      setIsGettingLocation(true);
      try {
        await getCurrentLocation();
        setShowConfirmation(true);
      } catch (locationError) {
        toast('Unable to get your location. Please enable location services to mark attendance.');
        console.error('Location error:', locationError);
      } finally {
        setIsGettingLocation(false);
      }
    }
  };

  const handleConfirmAttendance = async () => {
    if (!location.latitude || !location.longitude) {
      ('Location is required to mark attendance. Please try again.');
      return;
    }

    try {
      const attendanceData = {
        phone,
        latitude: location.latitude,
        longitude: location.longitude,
      };

      await markAttendanceMutation.mutateAsync(attendanceData);
      toast('Attendance marked successfully!');
      
      // Reset form
      setPhone('');
      setShowConfirmation(false);
      setShouldVerify(false);
    } catch (error: any) {
      console.error('Attendance error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to mark attendance. Please try again.';
      toast(errorMessage);
    }
  };

  const handleCancel = () => {
    setShowConfirmation(false);
    setPhone('');
    setShouldVerify(false);
  };

  // Format phone number for display (add spaces for readability)
  const formatPhoneNumber = (phoneNumber: string) => {
    const cleaned = phoneNumber.replace(/\D/g, '');
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 6) return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
    if (cleaned.length <= 8) return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 8)} ${cleaned.slice(8)}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="text-center mb-6">
            <div className="mx-auto h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mt-4">
              Daily Attendance
            </h1>
            <p className="text-gray-600 mt-2">
              Enter your 11-digit phone number to mark your attendance
            </p>
          </div>
          
          <form onSubmit={handlePhoneSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                required
                className={`w-full border ${
                  phoneError || error ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500`}
                placeholder="080 1234 5678"
                value={formatPhoneNumber(phone)}
                onChange={handlePhoneChange}
                disabled={isGettingLocation || isCheckingDetails}
                maxLength={15} // Account for spaces
              />
              <div className="mt-1 flex justify-between items-center">
                <span className={`text-xs ${
                  phone.length === 11 ? 'text-green-600' : 'text-gray-500'
                }`}>
                  {phone.length}/11 digits
                </span>
                {phoneError && (
                  <span className="text-xs text-red-600">{phoneError}</span>
                )}
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isGettingLocation || isCheckingDetails || !phone.trim() || phone.length !== 11}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGettingLocation ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Getting your location...
                </>
              ) : isCheckingDetails ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </>
              ) : (
                'Sign Attendance'
              )}
            </button>
          </form>

          {/* Auto-verification status */}
          {shouldVerify && isCheckingDetails && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <div className="flex items-center text-sm text-blue-700">
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-blue-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verifying phone number...
              </div>
            </div>
          )}

          {shouldVerify && internDetails && !isCheckingDetails && !error && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
              <div className="flex items-center text-sm text-green-700">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Phone number verified! Click "Sign Attendance" to continue.
              </div>
            </div>
          )}

          {/* Location Information */}
          {location.latitude && location.longitude && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <div className="flex items-center text-sm text-blue-700">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Location captured successfully
              </div>
            </div>
          )}

          {location.error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <div className="flex items-center text-sm text-red-700">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {location.error}
              </div>
            </div>
          )}

          {/* Confirmation Modal */}
          {showConfirmation && internDetails && (
            <div className="mt-6 p-4 border border-gray-200 rounded-md bg-white shadow-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Confirm Your Details
              </h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium">{internDetails.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">School:</span>
                  <span className="font-medium">{internDetails.school}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{internDetails.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium">{internDetails.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-medium">{formatPhoneNumber(phone)}</span>
                </div>
                {location.latitude && location.longitude && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium text-xs">
                      {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={handleConfirmAttendance}
                  disabled={markAttendanceMutation.isPending || !location.latitude || !location.longitude}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {markAttendanceMutation.isPending ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Marking...
                    </span>
                  ) : (
                    'Confirm Attendance'
                  )}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={markAttendanceMutation.isPending}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {error && shouldVerify && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-700">No intern found with this phone number.</p>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
            <h4 className="text-sm font-medium text-yellow-800 mb-2">
              Important Notes:
            </h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Phone number must be exactly 11 digits</li>
              <li>• You must be at the designated location to mark attendance</li>
              <li>• Location services must be enabled on your device</li>
              <li>• Use the same phone number you registered with</li>
              <li>• You can only mark attendance once per day</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}