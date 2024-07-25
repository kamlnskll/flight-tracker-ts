import { Box, Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import { AircraftStateArray } from '../types/AircraftTypes'

type Props = {
aircraftData: AircraftStateArray[]


}

const AircraftDataCard = ({ aircraftData }: Props) => {
    
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

  

  return (
    <Box>
    <Card>
        <CardContent>
        <Typography gutterBottom variant="h5">
            {callsign}        
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {baro_altitude}
        </Typography>
        </CardContent>
    </Card>


    </Box>
  )
}

export default AircraftDataCard