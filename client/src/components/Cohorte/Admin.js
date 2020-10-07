import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCohortes } from '../../redux/actions/cohorte'
import AlumnosAdmin from './AlumnosAdmin'
import CohorteAdmin from './CohorteAdmin'

export default function Admin(){
    const dispatch = useDispatch()
    const option = useSelector(state=> state.panel.data)

    useEffect(()=> {
        dispatch(getCohortes())
    }, [])

    return (
        <div>
            {
                option === 0 || !option?
                <CohorteAdmin/>
                : 
                <AlumnosAdmin/>
            }
        </div>
    )
}
