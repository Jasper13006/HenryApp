import React, { useState, useEffect } from 'react'
import { Grid, TextField, } from '@material-ui/core';
import Controls from "./controls/Controls";
import { useForm, Form } from './useForm';
import * as country from "./listas/country";
import * as provincias from './listas/provincias'
import * as educacion from './listas/educacion'


const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;

const genderItems = [
    { id: 'masculino', title: 'Masculino' },
    { id: 'femenino', title: 'Femenino' },
    { id: 'otro', title: 'Otro' },
]

const initialFValues = {
    // id: 0,
    name: '',
    lastName: '',
    email: '',
    password: '',
    // city: '',
    gender: 'masculino',
    country: '',
    provincia: '',
    educacion: '',
    birthDate: new Date(),
    // isPermanent: false,
}

export default function RegisterForm() {

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "Este campo es requerido"
        if ('lastName' in fieldValues)
            temp.lastName = fieldValues.lastName ? "" : "Este campo es requerido"
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "El Email no es valido"
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
        if ('provincia' in fieldValues)
            temp.provincia = fieldValues.provincia.length != 0 ? "" : "Este campo es requerido"
        if ('educacion' in fieldValues)
            temp.educacion = fieldValues.educacion.length != 0 ? "" : "Este campo es requerido"
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
            // country.insertEmployee(values)
            resetForm()
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        name="name"
                        label="Nombre"
                        value={values.name}
                        onChange={handleInputChange}
                        error={errors.name}
                    />
                    <Controls.Input
                        name="lastName"
                        label="Apellido"
                        value={values.lastName}
                        onChange={handleInputChange}
                        error={errors.lastName}
                    />
                    <Controls.Input
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                    />
                    <Controls.InputPassword
                        label="Contraseña"
                        name="password"
                        value={values.password}
                        onChange={handleInputChange}
                        error={errors.password}
                    />
                    <Controls.DatePicker
                        name="birthDate"
                        label="Fecha de nacimiento"
                        value={values.birthDate}
                        onChange={handleInputChange}
                    />

                </Grid>
                <Grid item xs={6}>
                    <Controls.RadioGroup
                        name="gender"
                        label="Genero"
                        value={values.gender}
                        onChange={handleInputChange}
                        items={genderItems}
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
                        name="provincia"
                        label="Provincia"
                        value={values.provincia}
                        onChange={handleInputChange}
                        options={!values.country ? [] : provincias[values.country]()}
                        error={errors.provincia}
                    />
                    <Controls.Select
                        name="educacion"
                        label="Educación"
                        value={values.educacion}
                        onChange={handleInputChange}
                        options={educacion.educacion()}
                        error={errors.educacion}
                    />
                    {/* <Controls.Checkbox
                        name="isPermanent"
                        label="Permanent Employee"
                        value={values.isPermanent}
                        onChange={handleInputChange}
                    /> */}
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
