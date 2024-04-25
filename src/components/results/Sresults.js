import React, { useState } from 'react';
import db from '../../firebase'
import { collection, getDocs } from 'firebase/firestore';
import './results.css'

const Sresults = () => {
    const [n, setN] = useState(0)
    const [a, setA] = useState(0)
    const [o, setO] = useState(0)
    const [y, setY] = useState(0)

    const [ppz, setPpz] = useState(0)
    const [pp, setPp] = useState(0)
    const [ppw, setPpw] = useState(0)

    const [nm, setAm] = useState(0)
    const [nr, setAr] = useState(0)
    const [neo, setAeo] = useState(0)
    const [ntv, setAtv] = useState(0)

    let results = []
    let ages = []

    getDocs(collection(db, "surveyData")).then((snapshot) => {
        snapshot.forEach((doc) => {
            results.push({ ...doc.data() })
        })
        setN(results.length);
        let sum_ages = 0
        let pz_count = 0
        let p_count = 0
        let pw_count = 0
        let m_count = 0
        let r_count = 0
        let eo_count = 0
        let tv_count = 0

        for (let i = 0; i < results.length; i++) {
            let dob = new Date((results[i].dob.seconds + results[i].dob.nanoseconds / 1000000000) * 1000)
            sum_ages += 2024 - dob.getFullYear()
            ages.push(2024 - dob.getFullYear())

            if (results[i].selected_food.includes('Pizza')) pz_count++
            if (results[i].selected_food.includes('Pasta')) p_count++
            if (results[i].selected_food.includes('Pap and Wors')) pw_count++

            m_count += results[i].loa.movies
            r_count += results[i].loa.radio
            eo_count += results[i].loa.eat_out
            tv_count += results[i].loa.tv
        }
        setA((sum_ages / n).toFixed(1))
        setO(Math.max(...ages))
        setY(Math.min(...ages))

        setPpz(((pz_count / n) * 100).toFixed(1))
        setPp(((p_count / n) * 100).toFixed(1))
        setPpw(((pw_count / n) * 100).toFixed(1))

        setAm((m_count / n).toFixed(1))
        setAr((r_count / n).toFixed(1))
        setAeo((eo_count / n).toFixed(1))
        setAtv((tv_count / n).toFixed(1))
    })
        .catch((e) => { console.log(e.message) })

    const survey_results = [
        'Total number of surveys:',
        'Average age:',
        'Oldest person who participated in survey:',
        'Youngest person who participated in survey:',
        '',
        'Percentage of who like Pizza:',
        'Percentage of who like Pasta:',
        'Percentage of who like Pap and Worse:',
        '',
        'People who like to watch movies:',
        'People who like to listen to radio:',
        'People who like to eat out:',
        'People who like to watch TV:',
    ]
    const survey_results_values = [n, a+' years', o+' years', y+' years', null, ppz+'%', pp+'%', ppw+'%', null, nm, nr, neo, ntv]
    return (
        <div className='survey-results-container'>
            <h3>Survey Results</h3>
            {n !== 0 ? survey_results.map((r, i) => {
                return (
                    <div className='survey-results'>
                        <div className='results-div'>{r}</div>
                        <div className='results-div'>{survey_results_values[i]}</div>
                    </div>
                )
            }) : <p>No Surveys Available.</p>}
        </div>
    )
}

export default Sresults
