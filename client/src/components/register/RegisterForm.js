import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Grid, TextField, } from '@material-ui/core';
import Controls from "./controls/Controls";
import { useForm, Form } from './useForm';
import * as country from "./listas/country";
import * as provincias from './listas/provincias'
import * as educacion from './listas/educacion'
import { makeStyles } from '@material-ui/core/styles';
import { postRegister } from '../../redux/actions/register'
import {useParams} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    grid: {
        width: '600px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

    },
    form: {
        width: '500px',
    }

}));

const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;


const initialFValues = {
    name: '',
    lastName: '',
    email: '',
    password: '',
    country: '',
    city: '',
    admin: false,
}

export default function RegisterForm() {
    const {token} = useParams()
    const classes = useStyles();
    const dispatch = useDispatch();
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "Este campo es requerido"
        if ('lastName' in fieldValues)
            temp.lastName = fieldValues.lastName ? "" : "Este campo es requerido"
        if ('password' in fieldValues)
            temp.password = (regex).test(fieldValues.password) ? "" : ` 
            Minimo 8 caracteres,
            Maximo 15,
            Al menos una letra mayúscula,
            Al menos una letra minucula,
            Al menos un dígito,
            Al menos 1 caracter especial
        `
        if ('country' in fieldValues)
            temp.country = fieldValues.country.length != 0 ? "" : "Este campo es requerido"
        if ('city' in fieldValues)
            temp.city = fieldValues.city.length != 0 ? "" : "Este campo es requerido"
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            console.log(values)
            dispatch(postRegister(values,token))
            // country.insertEmployee(values)
            resetForm()
        }
    }
    
    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12} className={classes.grid}>
                    <Controls.Input
                        name="name"
                        label="Nombre"
                        value={values.name}
                        onChange={handleInputChange}
                        error={errors.name}
                        autoComplete='off'
                    />
                    <Controls.Input
                        name="lastName"
                        label="Apellido"
                        value={values.lastName}
                        onChange={handleInputChange}
                        error={errors.lastName}
                        type='text'
                        autoComplete='off'
                    />
                    {/* <Controls.Input
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                    /> */}
                    <Controls.InputPassword
                        label="Contraseña"
                        name="password"
                        value={values.password}
                        onChange={handleInputChange}
                        error={errors.password}
                        autoComplete='off'
                    />
                    <Controls.Select
                        name="country"
                        label="Pais"
                        value={values.country}
                        onChange={handleInputChange}
                        options={country.country()}
                        error={errors.country}
                    />
                    {console.log(!values.country)}
                    <Controls.Select
                        name="city"
                        label="Provincia"
                        value={values.city}
                        onChange={handleInputChange}
                        options={!values.country ? [] : provincias[values.country]()}
                        error={errors.city}
                    />
                    <div>
                        <Controls.Button
                            type="submit"
                            text="Submit" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}
