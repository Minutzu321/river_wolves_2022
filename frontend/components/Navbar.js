import React from 'react';
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'
const dbutoane = [
    // {
    //     continut: "Altb",
    //     target: "_blank",
    //     href: "javascript:void(0)",
    //     class: "nav-link",
    //     icon: "now-ui-icons arrows-1_share-66",
    // },
    // {
    //     continut: "Aplica pentru un rol",
    //     target: null,
    //     href: null,
    //     class: "nav-link btn btn-neutral",
    //     icon: "",
    // },
]

const facebookLink = "https://www.facebook.com/RTRWTulcea",
      instaLink = "https://www.instagram.com/riverwolves.049/",
      ltgmLink = "https://liceulmoisil.ro/",
      ltgmTitlu = "LTGM",
      ltgmRel = "Liceul Teoretic Grigore Moisil";
const Navbar = ({butoane, laMembru}) => {
    const { data: session } = useSession();

    const sesButoane = <li className="nav-item">
        {laMembru ? (
        <button onClick={() => signOut()} className="nav-link btn btn-neutral">
            <p>Delogheaza-te</p>
        </button>
      ) : (
        <Link href="/dashboard">
            <a className="nav-link btn btn-neutral">
                <p>Dashboard</p>
            </a>
        </Link>
      )}
    </li>

    if (session) {
        return(
            <nav className="navbar navbar-expand-lg bg-primary fixed-top navbar-transparent " color-on-scroll="400">
                <div className="container">
                    <div className="navbar-translate">
                        <a className="navbar-brand" target="_blank" href={ltgmLink} rel="noreferrer" title={ltgmRel} data-placement="bottom">
                        {ltgmTitlu}
                        </a>
                        <button className="navbar-toggler navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-bar top-bar"></span>
                            <span className="navbar-toggler-bar middle-bar"></span>
                            <span className="navbar-toggler-bar bottom-bar"></span>
                        </button>
                    </div>
                    <div className="collapse navbar-collapse justify-content-end" id="navigation">
                        <ul className="navbar-nav">
                            {butoane.map((buton, index) => (
                                <li className="nav-item" key={index.toString()}>
                                    <a className={buton.class} target={buton.target} href={buton.href} rel="noreferrer">
                                        <i className={buton.icon}></i>
                                        <p>{buton.continut}</p>
                                    </a>
                                </li>))}
                            {sesButoane}
                            <li className="nav-item">
                                <a className="nav-link" rel="noreferrer" title="Da-ne un like pe Facebook" data-placement="bottom" href={facebookLink} target="_blank">
                                    <i className="fab fa-facebook-square"></i>
                                    <p className="d-lg-none d-xl-none">Facebook</p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" rel="noreferrer" title="Urmareste-ne pe Instagram" data-placement="bottom" href={instaLink} target="_blank">
                                    <i className="fab fa-instagram"></i>
                                    <p className="d-lg-none d-xl-none">Instagram</p>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            )
    }else{
        return(
    <nav className="navbar navbar-expand-lg bg-primary fixed-top navbar-transparent " color-on-scroll="400">
        <div className="container">
            <div className="navbar-translate">
                <a className="navbar-brand" target="_blank" href={ltgmLink} rel="noreferrer" title={ltgmRel} data-placement="bottom">
                {ltgmTitlu}
                </a>
                <button className="navbar-toggler navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-bar top-bar"></span>
                    <span className="navbar-toggler-bar middle-bar"></span>
                    <span className="navbar-toggler-bar bottom-bar"></span>
                </button>
            </div>
            <div className="collapse navbar-collapse justify-content-end" id="navigation">
                <ul className="navbar-nav">
                    {butoane.map((buton, index) => (
                        <li className="nav-item" key={index.toString()}>
                            <a className={buton.class} target={buton.target} href={buton.href} rel="noreferrer">
                                <i className={buton.icon}></i>
                                <p>{buton.continut}</p>
                            </a>
                        </li>))}
                    <li className="nav-item">
                        <a className="nav-link" rel="noreferrer" title="Da-ne un like pe Facebook" data-placement="bottom" href={facebookLink} target="_blank">
                            <i className="fab fa-facebook-square"></i>
                            <p className="d-lg-none d-xl-none">Facebook</p>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" rel="noreferrer" title="Urmareste-ne pe Instagram" data-placement="bottom" href={instaLink} target="_blank">
                            <i className="fab fa-instagram"></i>
                            <p className="d-lg-none d-xl-none">Instagram</p>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    )
    }
}

Navbar.defaultProps = {
    butoane: dbutoane,
    laMembru: false
}

export default Navbar
