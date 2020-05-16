//This will be the weekly revenue table! Needs to be added to the dashboard

import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';

// Generate Sales Data
function createData(time, amount) {
    return { time, amount };
}

const data = [
    createData('Monday', 4000),
    createData('Tuesda', 5000),
    createData('Wednesday', 3000),
    createData('Thursday', 6000),
    createData('Friday', 8000),
    createData('Saturday', 10000),
    createData('Sunday ', 11400),
];

export default function Chart() {
    const theme = useTheme();

    return (
        <React.Fragment>
            <Title>Weekly Revenue</Title>
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
                    <XAxis dataKey="time" stroke={theme.palette.text.secondary}/>
                    <YAxis stroke={theme.palette.text.secondary}>
                        <Label
                            angle={270}
                            position="left"
                            style={{textAnchor: 'middle', fill: theme.palette.text.primary}}
                        >
                            Revenue($)
                        </Label>
                    </YAxis>
                    <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false}/>
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}
