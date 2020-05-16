//This will be the sales analysis for admin dashboard- please change name as needed. I don't want to mess up anything!


import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';

// Generate Sales Data
function createData(time, amount) {
    return { time, amount };
}

const data = [
    createData('00:00', 900),
    createData('03:00', 750),
    createData('06:00', 4000),
    createData('09:00', 1000),
    createData('12:00', 1500),
    createData('15:00', 2000),
    createData('18:00', 4400),
    createData('21:00', 6000),
    createData('24:00', 6500),
];

export default function Chart() {
    const theme = useTheme();

    return (
        <React.Fragment>
            <Title>Today</Title>
            <ResponsiveContainer>
                <LineChart
                    data={data}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24,
                    }}
                >
                    <XAxis dataKey="time" stroke={theme.palette.text.secondary}/>  <Label
                          //angle={180}
                          position="bottom"
                          style={{textAnchor: 'middle', fill: theme.palette.text.primary}}
                      >
                          Time (am to pm)
                      </Label>
                    <YAxis stroke={theme.palette.text.secondary}>
                        <Label
                            angle={270}
                            position="left"
                            style={{textAnchor: 'middle', fill: theme.palette.text.primary}}
                        >
                            Sales ($)
                        </Label>
                    </YAxis>
                    <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false}/>
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}
