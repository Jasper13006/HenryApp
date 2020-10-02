import React from 'react';

const About = () => {
    return (
        <section className="page-section bg-primary" id="about">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8 text-center">
                        <h2 className="text-black mt-0" style={{fontSize: '2rem'}}>Invertimos en tu educación!</h2>
                        <hr className="divider light my-4" />
                        <p className="text-black mb-4" style={{fontSize: '1.5rem'}}>Tu carrera digital empieza ahora. Conviértete en un desarrollador de software en 4 meses a remoto. Y lo mejor, sólo nos pagas cuando consigues un trabajo. ¿Qué esperás para aplicar?</p>
                        <a className="btn btn-light btn-xl js-scroll-trigger" href="#services">Quiero saber más!</a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About;