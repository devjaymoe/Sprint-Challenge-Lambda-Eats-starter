import React, {useState, useEffect} from 'react';
import axios from "axios";
import * as yup from "yup";
import { Link } from 'react-router-dom';


const formSchema = yup.object().shape({
    name: yup.string().required("please include a name").min(2, "name must be more than 2 characters"),
    size: yup.string().required("must include pizza size"),
    pepperoni: yup.boolean().oneOf([true], "please select toppings"),
    mushrooms: yup.boolean().oneOf([true], "please select toppings"),
    pineapple: yup.boolean().oneOf([true], "please select toppings"),
    onions: yup.boolean().oneOf([true], "please select toppings"),
    instructions: yup.string()
});

export default function Form() {
    // state for whether our button should be disabled or not.
    const [buttonDisabled, setButtonDisabled] = useState(true);

    // managing state for our form inputs
    const [formState, setFormState] = useState({
        name: "",
        size: '',
        pepperoni: '',
        mushrooms: '',
        pineapple: '',
        onions: '',
        instructions: ""
    });

    // state for our errors
    const [errors, setErrors] = useState({
        name: ""
    });

    // new state to set our post request too. So we can console.log and see it.
    const [post, setPost] = useState([]);

    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            setButtonDisabled(!valid);
        });
    }, [formState]);

    const formSubmit = e => {
        e.preventDefault();
        axios
            .post("https://reqres.in/api/orders", formState)
            .then(res => {
                setPost(res.data); // get just the form data from the REST api

                // reset form if successful
                setFormState({
                    name: "",
                    size: '',
                    pepperoni: '',
                    mushrooms: '',
                    pineapple: '',
                    onions: '',
                    instructions: ""
                });
            })
            .catch(err => console.log(err.response));
    };

    const validateChange = e => {
        // Reach will allow us to "reach" into the schema and test only one part.
        yup
            .reach(formSchema, e.target.name)
            .validate(e.target.value)
            .then(valid => {
                setErrors({
                    ...errors,
                    [e.target.name]: ""
                });
            })
            .catch(err => {
                setErrors({
                    ...errors,
                    [e.target.name]: err.errors[0]
                });
            });
    };

    const inputChange = e => {
        e.persist();
        const newFormData = {
            ...formState,
            [e.target.name]:
                e.target.type === "checkbox" ? e.target.checked : e.target.value
        };

        validateChange(e);
        setFormState(newFormData);
    };

    return (
        <form onSubmit={formSubmit}>
            <Link to={'/'}>
                <div>Home</div>
            </Link>
            <h1>Pizza Form</h1>
            <label htmlFor="name">
                Name for Order: 
                <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={inputChange}
                />
                {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
            </label> <br/>
            <label htmlFor="size">
                Pizza size: 
                <select id="size" name="size" onChange={inputChange}>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                </select>
            </label>
            <fieldset>
                <legend>Toppings</legend>
                <p>Check which toppings you would like:</p>
                <label htmlFor="pepperoni">
                <input
                    id="pepperoni"
                    type="checkbox"
                    name="pepperoni"
                    checked={formState.pepperoni}
                    onChange={inputChange}
                />Pepperoni </label>
                <label htmlFor="mushrooms">
                <input
                    id="mushrooms"
                    type="checkbox"
                    name="mushrooms"
                    checked={formState.mushrooms}
                    onChange={inputChange}
                />Mushrooms </label>
                <label htmlFor="pineapple">
                <input
                    id="pineapple"
                    type="checkbox"
                    name="pineapple"
                    checked={formState.pineapple}
                    onChange={inputChange}
                />Pineapple </label>
                <label htmlFor="onions">
                <input
                    id="onions"
                    type="checkbox"
                    name="onions"
                    checked={formState.onions}
                    onChange={inputChange}
                />Onions </label>
            </fieldset>
            <label htmlFor="instructions">
                Special Instructions? 
                <textarea
                    name="instructions"
                    value={formState.instructions}
                    onChange={inputChange}
                />
            </label> <br/>
            {/* displaying our post request data */}
            <pre>{JSON.stringify(post, null, 2)}</pre>
            <button disabled={buttonDisabled}>Submit Order</button>
        </form>
    );
}
