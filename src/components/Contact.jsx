import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import '../App.css';

const Contact = () =>{

const Display = () =>{

}


const SubmitF = () =>{

}



    return(
        <>
        <div className='main-container'>
            <div className='form-container'>
                <form onSubmit={SubmitF} id='theForm'>
                        <div className='row'>
                            <label for='name'>Name: </label>
                            <input type='text' id='name' /> <br /><br />
                        </div>

                        <div className='row'>
                            <label for='email'>Email: </label>
                            <input type='email' id='email' /> <br /><br />
                        </div>        
                        <div className='row'>
                            <label for='number'>Number: </label>
                            <input type='number' id='number' /> <br /><br />
                        </div>
                        <div className='button'>
                            <button id='button' type='submit'> Submit </button>
                        </div>        
                </form>
            </div>
        </div>
        </>
    );
}

export {Contact};