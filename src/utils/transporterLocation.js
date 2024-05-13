import axios from "axios";

export async function reverseGeocode(latitude, longitude) {
    try {
      const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          latlng: `${latitude},${longitude}`,
          key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
        }
      });
  
      // İlginizi çeken bilgilere response.data içinde erişebilirsiniz.
      // Örneğin, en yakın adresi almak için response.data.results[0].formatted_address kullanılabilir.
    //   return response.data.results[0].formatted_address;
      return console.log(response.data);
    } catch (error) {
      console.error('Coğrafi ters kodlama işlemi başarısız oldu:', error);
      return null;
    }
  }