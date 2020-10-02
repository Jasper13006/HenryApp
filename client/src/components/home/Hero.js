import React from 'react';

const Hero = () => {
    return (
        <header className="masthead">
            <div className="container h-100">
                <div className="row h-100 align-items-center justify-content-center text-center">
                    <div className="col-lg-10 align-self-end">
                        <h1 className="text-uppercase text-white font-weight-bold">Bienvenidos a la plataforma educativa online</h1>
                        <hr className="divider my-4" />
                    </div>
                    <div className="col-lg-8 align-self-baseline">
                        <p className="text-white-75 font-weight-light mb-5">Ahora vas a poder conectarte de manera más directa con tus profesores y compañeros! Recordá que el mejor aprendizaje es cuando lo haces en equipo!</p>
                        <a className="btn btn-primary btn-xl js-scroll-trigger" href="#about">Quiero saber más</a>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Hero;