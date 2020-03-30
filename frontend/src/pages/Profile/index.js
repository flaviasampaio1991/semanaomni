import React, {useState, useEffect}from 'react';
import { Link, useHistory} from 'react-router-dom';
import { FiPower, FiTrash2} from 'react-icons/fi';


import './styles.css';

import logoImg from '../../assets/logo.svg';
import api from '../../Services/api';

export default  function Profile(){
    
    const [incident, setIncidents] = useState([]);
    
    const history = useHistory();

    const OngID=localStorage.getItem('ongID');
    const OngName=localStorage.getItem('ongName');


useEffect(() =>{
    api.get('profile', {
        headers:{
            Authorization: OngID,
        }
    }).then(response =>{
        setIncidents(response.data);
    })
},[OngID]);

async function handleDeleteIncident(id){
    try{
        await api.delete(`incidents/${id}`,{
        headers: {
            Authorization: OngID,
            }
             });
        

    setIncidents(incident.filter(incident => incident.id !== id));
    } catch (err){
        alert('Erro ao delatar caso, favor tentar novamente.');
    }
};

function handleLogout()
{
    localStorage.clear();

    history.push('/');
}

    return(
        <div className="profile-container">
            <header>
                <img src ={logoImg} alt="Be the Hero"/>
                <span>Bem Vinda, {OngName}!</span>
                
                <Link className="button" to="/incidents/new">Cadastrar Novo Caso</Link>
                <button onClick={handleLogout} type="button">
                <FiPower size={18} color="#e02041"/>

                </button>
            </header>

            <h1> Casos Cadastrados  </h1>

            <ul>
                {incident.map(incident  =>(

                    <li key={incident.id}>

                    <strong> CASO:</strong>
                <p> {incident.title}</p>

                    <strong> DESACRIÇÃO</strong>
                    <p>{incident.description}</p>

                    <strong> VALOR:</strong>
                    <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>
                    <button onClick={()=>handleDeleteIncident(incident.id)} type="button">
                        <FiTrash2 size={20} colo="#a8a8b3"/>
                    </button>
                </li>
                
                
                
                ))}
                </ul>    
                    </div>
    );
}