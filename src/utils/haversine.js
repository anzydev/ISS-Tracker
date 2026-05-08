/**
 * Haversine formula — calculates distance in km between two lat/lng points.
 */
export function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const toRad = (deg) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Calculate speed in km/h given two positions and timestamps.
 */
export function calculateSpeed(pos1, pos2) {
  if (!pos1 || !pos2) return 0;

  const dist = haversineDistance(
    pos1.latitude, pos1.longitude,
    pos2.latitude, pos2.longitude
  );

  const timeDiffHours = (pos2.timestamp - pos1.timestamp) / (1000 * 60 * 60);

  if (timeDiffHours <= 0) return 0;
  return Math.round(dist / timeDiffHours);
}
