import React from 'react';

const Services = () => {
    return (
        <section className="page-section" id="services">
            <div className="container">
                <h2 className="text-center mt-0" style={{fontSize: '2rem'}}>Carrera diseñada para tu éxito</h2>
                <hr className="divider my-4" />
                <div className="row">
                    <div className="col-lg-3 col-md-6 text-center">
                        <div className="mt-5">
                            <div className="mb-4 caja-img"><img src="https://www.soyhenry.com/static/bootcamp-69298120cfbbd3bd82368b797b6a770d.png" width="80px" alt="Bootcamp"/></div>
                            <h3 className="h4 mb-2">Bootcamp</h3>
                            <p className="text-muted mb-0">Entrenamiento intensivo en el que vas a aprender de computación y desarrollo web desde el principio hasta el final.</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 text-center">
                        <div className="mt-5">
                        <div className="mb-4 caja-img"><img src="https://www.soyhenry.com/static/labs-a68a48d9c1525b60d5d1e874278d88a1.png" width="80px" alt="Labs"/></div>
                            <h3 className="h4 mb-2">Labs</h3>
                            <p className="text-muted mb-0">Construí en equipo proyectos del mundo real con metodologías y herramientas ágiles (scrum), bajo un aprendizaje colaborativo.</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 text-center">
                        <div className="mt-5">
                        <div className="mb-4 caja-img"><img src="https://www.soyhenry.com/static/henryx-42b7eae92b75799f6220f3d659bcaea3.png" width="80px" alt="HenryX"/></div>
                            <h3 className="h4 mb-2">HenryX</h3>
                            <p className="text-muted mb-0">Continúa desarrollando tus habilidades técnicas y soft skills trabajando en equipo y en proyectos reales.</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 text-center">
                        <div className="mt-5">
                        <div className="mb-4 caja-img"><img src="https://www.soyhenry.com/static/rocket-176b443ed273a2a5a6f5cb11d6d33605.png" width="80px" alt="Job Prep"/></div>
                            <h3 className="h4 mb-2">Job Prep</h3>
                            <p className="text-muted mb-0">Te preparamos para ingresar al mundo laboral brindándote las herramientas necesarias para conseguir un trabajo.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Services;