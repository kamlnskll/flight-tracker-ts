import { Box, Card, CardContent, Typography } from '@mui/material'
import Flag from 'react-flagpack'
import React, { useEffect, useState } from 'react'
import { AircraftStateArray } from '../types/AircraftTypes'
import * as countries from 'i18n-iso-countries'
import enLocale from 'i18n-iso-countries/langs/en.json';
import 'react-flagpack/dist/style.css';
import ReactCountryFlag from 'react-country-flag'


type Props = {
aircraftData: AircraftStateArray[]


}


const AircraftDataCard = ({ aircraftData }: Props) => {
  const [countryCode, setCountryCode] = useState<string>('');
  countries.registerLocale(enLocale)
  

    const [
        icao24,
        callsign,
        origin_country,
        time_position,
        last_contact,
        longitude,
        latitude,
        baro_altitude,
        on_ground,
        velocity,
        true_track,
        vertical_rate,
        sensors,
        geo_altitude,
        squawk,
        spi,
        position_source,
        category
      ] = aircraftData;

      useEffect(() => {
        const code = countries.getAlpha2Code(`${origin_country}`, 'en');
        if (code) {
          setCountryCode(code);
        } else {
          console.error('Invalid country code for', origin_country);
        }
      }, [origin_country]);
    


  return (
    <Box width='25%'>
    <Card>
        <CardContent>
          <Box sx={{display: 'flex'}}>
        <Typography gutterBottom variant="h5">
            {callsign}        
        </Typography>
        <ReactCountryFlag
                countryCode={`${countryCode}`}
                svg
                style={{
                    width: '1.3em',
                    height: '1.3em',
                }}
                title="US"
            />
            </Box>
        <Typography variant="body2" color="text.secondary">
          {baro_altitude}
          {countryCode}
        </Typography>
        </CardContent>
    </Card>


    </Box>
  )
}

export default AircraftDataCard