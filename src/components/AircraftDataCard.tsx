import { Box, Card, CardContent, Typography } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import Flag from 'react-flagpack'
import React, { useEffect, useState } from 'react'
import { AircraftStateArray } from '../types/AircraftTypes'
import * as countries from 'i18n-iso-countries'
import enLocale from 'i18n-iso-countries/langs/en.json';
import 'react-flagpack/dist/style.css';
import ReactCountryFlag from 'react-country-flag'
import IconButton from '@mui/material';


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
    <Box width='25%' marginTop={'25px'}>
      { aircraftData.length > 1 ? (
        (
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
                    marginLeft: '1em',
                    marginTop: '0.3em'
                }}
                title="US"
            />
            <MyLocationIcon sx={{marginLeft: '20px'}}/>
            </Box>
        <Typography variant="body1" color="text.secondary">
          Altitude: {typeof baro_altitude === 'number' ? (baro_altitude * 1).toFixed(0) : 'N/A'} meters
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Velocity: {typeof velocity === 'number' ? (velocity * 3.6).toFixed(0) : 'N/A'} km/hr
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Climb Rate: {vertical_rate} m/s
        </Typography>
        {/* <IconButton aria-label="delete" disabled color="primary">
  <ClearIcon />
</IconButton> */}
        </CardContent>
    </Card>

        )
      ) : (
        null
      )
      }
  
    </Box>
  )
}

export default AircraftDataCard