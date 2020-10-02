import React from 'react';

const Contact = () => {
    return (
        <section className="page-section" id="contact">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8 text-center">
                        <h2 className="mt-0" style={{fontSize: '2rem'}}>¡Mantengámonos en contacto!</h2>
                        <hr className="divider my-4" />
                        <p className="text-black mb-5" style={{fontSize: '1.5rem'}}>¿Listo para comenzar tu educación con nosotros? ¡Llámanos o envíanos un correo electrónico y nos comunicaremos contigo lo antes posible!</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 ml-auto text-center mb-5 mb-lg-0">
                        <i className="fas fa-phone fa-3x mb-3 text-black"></i>
                        <div>+1 (555) 123-4567</div>
                    </div>
                    <div className="col-lg-4 mr-auto text-center">
                        <i className="fas fa-envelope fa-3x mb-3 text-black"></i>                        
                        <a className="d-block" href="mailto:hola@soyhenry.com" style={{color: 'black'}}>hola@soyhenry.com</a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact;