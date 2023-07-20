import React from 'react';
import DoneIcon from '@mui/icons-material/Done';
import Box from '@mui/material/Box';

function GameVote(props) {
    const { voteNum } = props;
    const num_rows = Math.ceil(voteNum / 5);

    let icon_rows = [];
    for (let i = 0; i < num_rows; i++) {
        let icon_row = [];
        for (let j = 0; j < 5 && 5*i+j < voteNum; j++) {
            icon_row.push(<DoneIcon color="error"  sx={{  fontSize: 15, fontWeight: 'bold' }} key={5*i+j} />);
        }
        icon_rows.push(
            <Box key={i} display="flex">
                {icon_row}
            </Box>
        );
    }

    return (
        <Box
            sx={{
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                flexGrow: 1,
            }}
        >
            {icon_rows}
        </Box>
    )
}

export default GameVote;
