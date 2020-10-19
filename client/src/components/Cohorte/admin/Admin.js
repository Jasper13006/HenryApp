import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCohortes } from '../../../redux/actions/cohorte'
import store from '../../../redux/store';
import AlumnosAdmin from './AlumnosAdmin'
import CohorteAdmin from './CohorteAdmin'

export default function Admin(){
    const dispatch = useDispatch()
    const option = useSelector(state=> state.panel.data)
    const [cohortes, setCohortes] = useState()
    const refresh = useSelector(state => state.update)

    useEffect(()=> {
        dispatch(getCohortes())
    }, [refresh])

    store.subscribe(() => {
        setCohortes(() => store.getState().cohortes.data)
    })


    return (
        <div>
            {
                option === 0 || !option?
                <CohorteAdmin/>
                : 
                <AlumnosAdmin data={cohortes}/>
            }
        </div>
    )
}
