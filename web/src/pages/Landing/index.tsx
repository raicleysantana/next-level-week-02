import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import logoImg from '../../assets/imagens/logo.svg';
import landingImg from '../../assets/imagens/landing.svg';
import stydyIcon from '../../assets/imagens/icons/study.svg';
import giveClasseIcon from '../../assets/imagens/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/imagens/icons/purple-heart.svg';
import './styles.css';
import api from "../../services/api";

function Landing() {

    const [totalConnections, setTotalConnections] = useState(0);

    useEffect(() => {
        api.get('connections').then(response => {
            const {total} = response.data;
            setTotalConnections(total);
        });
    }, []);

    return (
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <img src={logoImg} alt=""/>
                    <h2>Sua plataforma de estudos online</h2>
                </div>

                <img
                    src={landingImg}
                    alt=""
                    className="hero-image"
                />

                <div className="buttons-container">
                    <Link to="/study" className="study">
                        <img src={stydyIcon} alt=""/>
                        Estudar
                    </Link>
                    <Link to="/give-classes" className="give-classes">
                        <img src={giveClasseIcon} alt=""/>
                        Dar aulas
                    </Link>
                </div>

                <span className="total-connections">
                    Total de {totalConnections} conexões realizadas <img src={purpleHeartIcon}/>
                </span>
            </div>
        </div>
    )
}

export default Landing;