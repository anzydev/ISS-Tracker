import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchISSPosition, fetchAstronauts, reverseGeocode } from '../utils/api';
import { calculateSpeed } from '../utils/haversine';

const MAX_POSITIONS = 15;
const MAX_SPEEDS = 30;
const POLL_INTERVAL = 15000;

export function useISS() {
  const [positions, setPositions] = useState([]);
  const [speeds, setSpeeds] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [locationName, setLocationName] = useState('Fetching...');
  const [astronauts, setAstronauts] = useState({ number: 0, people: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const prevPositionRef = useRef(null);

  const fetchPosition = useCallback(async () => {
    try {
      const pos = await fetchISSPosition();
      setCurrentPosition(pos);
      setError(null);

      // Calculate speed from previous position
      if (prevPositionRef.current) {
        const speed = calculateSpeed(prevPositionRef.current, pos);
        setCurrentSpeed(speed);
        setSpeeds((prev) => {
          const next = [...prev, { speed, time: new Date(pos.timestamp).toLocaleTimeString() }];
          return next.slice(-MAX_SPEEDS);
        });
      }

      prevPositionRef.current = pos;

      // Update trajectory
      setPositions((prev) => {
        const next = [...prev, pos];
        return next.slice(-MAX_POSITIONS);
      });

      // Reverse geocode (throttled — not every time)
      reverseGeocode(pos.latitude, pos.longitude).then(setLocationName);

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, []);

  const fetchAstros = useCallback(async () => {
    try {
      const data = await fetchAstronauts();
      setAstronauts(data);
    } catch (err) {
      console.error('Failed to fetch astronauts:', err);
    }
  }, []);

  const refresh = useCallback(() => {
    setLoading(true);
    fetchPosition();
  }, [fetchPosition]);

  useEffect(() => {
    fetchPosition();
    fetchAstros();
    const interval = setInterval(fetchPosition, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchPosition, fetchAstros]);

  return {
    currentPosition,
    positions,
    currentSpeed,
    speeds,
    locationName,
    astronauts,
    loading,
    error,
    refresh,
  };
}
