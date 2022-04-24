import React  from 'react';
import { Sponsori } from './Sponsori';
const PageHeader = ({ titlu, subtitlu, subsubtitlu }) => {
    return (
        <div className="page-header clear-filter" filter-color="orange">
            <div className="page-header-image" data-parallax="true" style={{backgroundImage: 'url("/header.jpg")'}}/>
            <div className="container">
                <div className="content-center brand">
                    <img className="rvw-logo" src="rw.png" alt=""/>
                    <h1 className="h1-seo">{titlu}</h1>
                    <h3>{subtitlu}</h3>
                    <h5>{subsubtitlu}</h5>
                    <br/><br/>
                    <h3 className="category category-absolute">
                        {/* <img src="/sponsori/minerva.png" className="locali-logo-minerva" alt="Minerva Navis"/> */}
                        <Sponsori/>
                    </h3>
                    
                    
                </div>
                
            </div>
        </div>
    )
}

PageHeader.defaultProps = {
    titlu: 'River Wolves',
    subtitlu: 'We howl. We work. We succeed. Together.',
    subsubtitlu: 'Romanian FTC Robotics team',
}


export default PageHeader
