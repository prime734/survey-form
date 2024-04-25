import React, { useState } from 'react';
import db from '../../firebase'
import { collection, addDoc } from 'firebase/firestore';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import './form.css'
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [dob, setDob] = useState(null)
  const [number, setNumber] = useState(0)

  const [pizza, setPizza] = useState('')
  const [pasta, setPasta] = useState('')
  const [papAndWors, setPapAndWors] = useState('')
  const [other, setOther] = useState('')

  const [optRow1, setOptRow1] = useState(0)
  const [optRow2, setOptRow2] = useState(0)
  const [optRow3, setOptRow3] = useState(0)
  const [optRow4, setOptRow4] = useState(0)

  const [err, setErr] = useState({})

  const handleName = (event) => {
    setName(event.target.value)
  }
  const handleEmail = (event) => {
    setEmail(event.target.value)
  }
  const handleDob = (event) => {
    setDob(event)
  }
  const handleNumber = (event) => {
    setNumber(event.target.value)
  }

  const handlePizza = (event) => {
    setPizza(event.target.value)
  }
  const handlePasta = (event) => {
    setPasta(event.target.value)
  }
  const handlePapAndWors = (event) => {
    setPapAndWors(event.target.value)
  }
  const handleOther = (event) => {
    setOther(event.target.value)
  }

  const handleRow1 = (event) => {
    setOptRow1(event.target.value)
  }
  const handleRow2 = (event) => {
    setOptRow2(event.target.value)
  }
  const handleRow3 = (event) => {
    setOptRow3(event.target.value)
  }
  const handleRow4 = (event) => {
    setOptRow4(event.target.value)
  }
  let selected_food = []
  if (pizza !== '') selected_food.push("Pizza")
  if (pasta !== '') selected_food.push("Pasta")
  if (papAndWors !== '') selected_food.push("Pap and Wors")
  if (other !== '') selected_food.push("Other")

  const submit = (e) => {
    e.preventDefault()
    const errors = {}
    if (name === '') errors.name = 'Name is required!'
    if (email === '') errors.email = 'Email is required!'
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Email is not valid!'
    if (dob === null) errors.dob = 'Date of Birth is required!'
    if (number.toString().length < 10) errors.number = 'Contact number must be 10 digits long!'
    if (selected_food.length === 0) errors.food = 'Please select atleast one option!'
    if (optRow1 === 0 || optRow2 === 0 || optRow3 === 0 || optRow4 === 0) errors.hobies = 'Please select option from each row!'

    setErr(errors)
    if (Object.keys(errors).length === 0) {
      addDoc(collection(db, "surveyData"), {
        name: name,
        email: email,
        dob: dob,
        number: number,
        selected_food: selected_food,
        loa: { movies: parseInt(optRow1), radio: parseInt(optRow2), eat_out: parseInt(optRow3), tv: parseInt(optRow4) }
      })
        .catch((e) => { console.log(e.message) })
      navigate('/typ')
    }
  }
  const navigate = useNavigate()

  const personal_details = ['Full Names', 'Email', 'Date of Birth', 'Contact Number']
  const pd_functions = [handleName, handleEmail, handleDob, handleNumber,]

  const food = ['Pizza', 'Pasta', 'Pap and Worse', 'Other']
  const food_functions = [handlePizza, handlePasta, handlePapAndWors, handleOther]

  const hobies = ['I like to watch movies', 'I like to listen to radio', 'I like to eat out', 'I like to watch TV']
  const agreement = ['Strongly Agree', 'Agree', 'Neutral', 'Disagree', 'Strongly Disagree']
  const agreement_value = [1, 2, 3, 4, 5]
  const row_functions = [handleRow1, handleRow2, handleRow3, handleRow4]

  return (
    <form onSubmit={submit} className="App">
      <nav>

      </nav>
      <div className="input-checkbox">

        <div>Personal Details:</div>
        <div className='inputs'>
          {personal_details.map((pd, i) => {
            return (
              i !== 2 ?
                <div className='input'>
                  <label >{pd}</label>
                  <input placeholder={
                    i === 0
                      ? 'Prime'
                      : i === 1
                        ? 'prime@gmail.com'
                        : i === 3
                          ? '0123456789'
                          : ''
                  } onChange={pd_functions[i]} />
                  {<span>{
                    i === 0
                      ? err.name
                      : i === 1
                        ? err.email
                        : i === 3
                          ? err.number
                          : ''}</span>}
                  {() => { return (<div>dd</div>) }}
                </div> : <DatePicker placeholderText='31/12/1904' dropdownMode="select" showMonthDropdown showYearDropdown minDate={new Date('1904-01-01')} maxDate={new Date('2019-01-31')} selected={dob} onChange={pd_functions[i]} value={dob} />
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
                <input onChange={food_functions[i]} selected={f} type='checkbox' name={f} value={f} />
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
                      <td><input onChange={row_functions[i]} type="radio" name={"row1" + i} value={agreement_value[j]} /></td>
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
