import { LocationState } from '@/app/types';
import { useState, useEffect } from 'react';


export const useLocation = () => {
  const [location, setLocation] = useState<LocationState>({
    latitude: null,
    longitude: null,
    error: null,
    isLoading: false,
  });

  const getCurrentLocation = (): Promise<{ latitude: number; longitude: number }> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser.'));
        return;
      }

      setLocation(prev => ({ ...prev, isLoading: true, error: null }));

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({
            latitude,
            longitude,
            error: null,
            isLoading: false,
          });
          resolve({ latitude, longitude });
        },
        (error) => {
          let errorMessage = 'Unable to retrieve your location.';
          
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location access denied. Please enable location services to mark attendance.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information unavailable.';
              break;
            case error.TIMEOUT:
              errorMessage = 'Location request timed out.';
              break;
            default:
              errorMessage = 'An unknown error occurred.';
              break;
          }

          setLocation({
            latitude: null,
            longitude: null,
            error: errorMessage,
            isLoading: false,
          });
          reject(new Error(errorMessage));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000, 
          maximumAge: 60000, 
        }
      );
    });
  };

  const clearLocation = () => {
    setLocation({
      latitude: null,
      longitude: null,
      error: null,
      isLoading: false,
    });
  };

  return {
    location,
    getCurrentLocation,
    clearLocation,
  };
};