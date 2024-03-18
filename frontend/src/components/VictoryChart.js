import React from 'react';
import { VictoryBar, VictoryChart} from 'victory';
import { useTheme } from '@mui/material/styles';

function DynamicVictoryChart({ datasets }) {
    const theme = useTheme();

  return (
    <VictoryChart
    theme={theme.palette.primary}
    domainPadding={20}
    animate={{
        duration: 800,
        onLoad: { duration: 100 }
      }}
  >
    <VictoryBar
      style={{ data: { fill: '#556cd6' } }}
      data={datasets}
    />
  </VictoryChart>
  )
}

export default DynamicVictoryChart;
