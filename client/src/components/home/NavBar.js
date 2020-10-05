import React from 'react';
import Logo from '../../assets/img/descarga.png';

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNav">
            <div className="container">
                <a className="navbar-brand js-scroll-trigger" href="#page-top"><img id="logo" src={Logo} alt="Henry App" width="160px"/></a>
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto my-2 my-lg-0">
                        <li className="nav-item"><a className="nav-link js-scroll-trigger" href="#about">Nosotros</a></li>
                        <li className="nav-item"><a className="nav-link js-scroll-trigger" href="#services">Servicios</a></li>
                        <li className="nav-item"><a className="nav-link js-scroll-trigger" href="#portfolio">Alumnos</a></li>
                        <li className="nav-item"><a className="nav-link js-scroll-trigger" href="#contact">Contáctenos</a></li>
                        <li className="nav-item"><a className="nav-link js-scroll-trigger btn-ingresar" style={{paddingLeft: '15px'}} href="/login">Ingresar</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;