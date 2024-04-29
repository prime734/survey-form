import React, { useState } from 'react';
import db from '../../firebase'
import { collection, addDoc } from 'firebase/firestore';
import "react-datepicker/dist/react-datepicker.css";
import './form.css'
import { useNavigate } from 'react-router-dom';

const Form = () => {

  const [data, setData] = useState({
    name: '',
    email: '',
    dob: '',
    number: 0,
    pizza: '',
    pasta: '',
    papAndWors: '',
    other: '',
    optRow1: 0,
    optRow2: 0,
    optRow3: 0,
    optRow4: 0
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
    console.log(data)
  }

  const [err, setErr] = useState({})

  let selected_food = []
  if (data.pizza !== '') selected_food.push("Pizza")
  if (data.pasta !== '') selected_food.push("Pasta")
  if (data.papAndWors !== '') selected_food.push("Pap and Wors")
  if (data.other !== '') selected_food.push("Other")

  const submit = (e) => {
    e.preventDefault()
    const errors = {}
    if (data.name === '') errors.name = 'Name is required!'
    if (data.email === '') errors.email = 'Email is required!'
    else if (!/\S+@\S+\.\S+/.test(data.email)) errors.email = 'Email is not valid!'
    if (data.dob === '') errors.dob = 'Date of birth is required!'
    if (!/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(data.number)) errors.number = 'Invalid phone number!'
    if (selected_food.length === 0) errors.food = 'Please select atleast one option!'
    if (data.optRow1 === 0 || data.optRow2 === 0 || data.optRow3 === 0 || data.optRow4 === 0) errors.hobies = 'Please select option from each row!'

    setErr(errors)
    if (Object.keys(errors).length === 0) {
      addDoc(collection(db, "surveyData"), {
        name: data.name,
        email: data.email,
        dob: data.dob,
        number: parseInt(data.number),
        selected_food: selected_food,
        loa: { movies: parseInt(data.optRow1), radio: parseInt(data.optRow2), eat_out: parseInt(data.optRow3), tv: parseInt(data.optRow4) }
      })
        .catch((e) => { console.log(e.message) })
      navigate('/typ')
    }
  }
  const navigate = useNavigate()

  const personal_details = ['Full Names', 'Email', 'Date of Birth', 'Contact Number']
  const input_names = ['name', 'email', 'dob', 'number']

  const food = ['Pizza', 'Pasta', 'Pap and Wors', 'Other']
  const food_names = ['pizza', 'pasta', 'papAndWors', 'other']

  const hobies = ['I like to watch movies', 'I like to listen to radio', 'I like to eat out', 'I like to watch TV']
  const agreement = ['Strongly Agree', 'Agree', 'Neutral', 'Disagree', 'Strongly Disagree']
  const agreement_value = [1, 2, 3, 4, 5]
  const placeholders = ['Prime', 'prime@gmail.com', '1904-12-31', '0123456789']

  return (
    <form onSubmit={submit} className="form">
      <div className="input-checkbox">

        <div>Personal Details:</div>
        <div className='inputs'>
          {personal_details.map((pd, i) => {
            return (
              <div className='input'>
                <label >{pd}</label>
                <input placeholder={placeholders[i]} type={i === 2 ? 'date' : 'text'}
                  min='1904-01-01' max='2019-12-31' name={input_names[i]} onChange={handleChange} />
                {<span>{
                  i === 0
                    ? err.name
                    : i === 1
                      ? err.email
                      : i === 2
                        ? err.dob
                        : i === 3
                          ? err.number
                          : ''}</span>}
              </div>
            )
          })}
        </div>

        <div>
          <p>What is your favorite food?</p>
          {<span> {err.food}</span>}
        </div>

        <div className='checkboxes'>
          {food.map((f, i) => {
            return (
              <div className='checkbox'>
                <input onChange={handleChange} selected={f} type='checkbox' name={food_names[i]} value={f} />
                <label>{f}</label>
              </div>
            )
          })
          }
        </div>
      </div>

      <div className='table'>
        <p>Please rate your level of agreement on a scale from 1 to 5, with 1 being "strongly agree" and 5 being "strongly disagree."</p>
        <table>
          <thead>
            <tr>
              <th>&nbsp;</th>
              {agreement.map((a) => {
                return (
                  <th>{a}</th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {hobies.map((h, i) => {
              return (
                <tr>
                  <th>{h}</th>
                  {agreement.map((a, j) => {
                    return (
                      <td><input onChange={handleChange} type="radio" name={"optRow" + parseInt(i + 1)} value={agreement_value[j]} /></td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
        {<span> {err.hobies}</span>}

      </div>
      <button type='submit' >Submit</button>
    </form>
  )
}

export default Form
