import React from 'react'
import { Input, FormHelperText } from '@material-ui/core'

const CustomInput = ({ field, form: { touched, errors }, ...props }) => (
    <div>
        <Input error={ !!(touched[field.name] && errors[field.name]) }
            { ...field }
            { ...props } />
        {touched[field.name] && errors[field.name] && <FormHelperText>{errors[field.name]}</FormHelperText> }
    </div>
);

export default CustomInput
