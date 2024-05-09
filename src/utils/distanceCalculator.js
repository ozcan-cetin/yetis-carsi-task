export function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Dünya'nın yarıçapı (km)
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Mesafe (km)
    return distance;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

// Kullanım örneği
// const distance = calculateDistance(39.8959, 32.863, 41.0145, 28.9533);
// console.log("Mesafe:", distance.toFixed(2), "km");