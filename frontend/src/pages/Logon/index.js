import React, {useState} from 'react';
import { Link, useHistory} from 'react-router-dom';
import { FiLogIn} from 'react-icons/fi'

import api from '../../Services/api'

import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroesImgs from '../../assets/heroes.png';


export default function Logon(){
    const [ id, setID]= useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try{
            const response = await api.post('sessions',{id});
            localStorage.setItem('ongID', id);
            localStorage.setItem('ongName', response.data.name);
            
            
            history.push('/profile')
        } catch (err){
            alert('Falha no login, tente novamente.');
        }
    }

    return(
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Logo"/>

                <form onSubmit={handleLogin}>
                    <h1>Faça seu Login</h1>

                    <input 
                    placeholder="Sua Id"
                    value={id}
                    onChange={e => setID(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link"to='/register'>
                        <FiLogIn size={16} color="#e02041"/>
                         Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={heroesImgs} alt="Heroes"/>
        </div>
    );
}