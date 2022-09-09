import React from 'react'
import "./footer.css"
import { GrFacebook } from "react-icons/gr";
import FacebookIcon from '@mui/icons-material/Facebook';
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';


function FooterComponent() {
    return (
        
        <div className='footergogo'>
            <div className='footergogo1'>
                <footer className="bg-dark text-white">
                    <div className="p-4 pb-0">
                        <section className="mb-4">
                            <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"
                            >
                            {/* <i className="fab fa-facebook-f"></i> */}
                            {/* <h7>  */}
                                {/* <FacebookIcon/>  */}
                                {/* <DeleteOutlinedIcon /> */}
                                {/* </h7> */}
                            </a>
                            <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"
                            ></a>
                            <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"
                            ></a>
                            <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"
                            ></a>
                            <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"
                            ></a>
                            <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"
                            ></a>
                        </section>
                    </div>
                    <div className="text-center p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
                        © 2020 Copyright:
                        <a className="text-white" href="https://mdbootstrap.com/">MDBootstrap.com</a>
                    </div>

                </footer>

            </div>

        </div>

    )
}

export default FooterComponent;


