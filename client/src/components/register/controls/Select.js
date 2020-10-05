import React from 'react'
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'
const SelectorFormControl = withStyles({
    root: {
        // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        '& .MuiOutlinedInput-root': {
            color: '#ffffff',
            '& fieldset': {
                color: 'ffffff',
                borderColor: 'white',
            },
            '&:hover fieldset': {
                borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'white',
            },
        },
        '& .MuiFormLabel-root': {
            color: '#ffffff'
        }
    },
})(FormControl);

export default function Select(props) {

    const { name, label, value, error = null, onChange, options } = props;

    return (
        <SelectorFormControl variant="outlined"
            {...(error && { error: true })}>
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                label={label}
                name={name}
                value={value}
                onChange={onChange}>
                <MenuItem value="">None</MenuItem>
                {
                    options.map(
                        item => (<MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>)
                    )
                }
            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </SelectorFormControl>
    )
}
