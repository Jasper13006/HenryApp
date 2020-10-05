import React from 'react'
import { TextField } from '@material-ui/core';
import { withStyles, } from '@material-ui/core/styles';

const InputTextField = withStyles({
    root: {
        // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        '& .MuiOutlinedInput-root': {
            color: '#ffffff',
            '& fieldset': {
                color: 'ffffff',
                borderColor: 'white',
            },
            '&:hover fieldset': {
                borderColor: '#ffffff',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#ffffff',
            },
        },
        '& .MuiFormLabel-root': {
            color: '#ffffff'
        }
    },
})(TextField);

export default function Input(props) {
    const { name, label, value, error = null, onChange } = props;
    return (
        <InputTextField
            variant="outlined"
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            {...(error && { error: true, helperText: error })}
        />
    )
}
