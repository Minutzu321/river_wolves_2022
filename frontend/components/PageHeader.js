import React  from 'react';
import { Sponsori } from './Sponsori';
import dynamic from 'next/dynamic'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Typography } from '@mui/material';

const Parti = dynamic(
  () => import('../components/Particule'),
  { ssr: false }
)

const PageHeader = ({ titlu, subtitlu, subsubtitlu, sageti=false }) => {
    
    

    return (
        <div className="page-header clear-filter" filter-color="orange">
            
            <div className="page-header-image" data-parallax="true"/>
            
            <div className="container">
                
                <div className="content-center brand">
                
                    <img className="rvw-logo" src="rw.png" alt=""/>
                    <h1 className="h1-seo">{titlu}</h1>
                    <h3>{subtitlu}</h3>
                    <h5>{subsubtitlu}</h5>
                    {sageti&&<Typography color="success"><ArrowDownwardIcon/></Typography>}
                    <br/><br/>
                    <h3 className="category category-absolute">
                        {/* <img src="/sponsori/minerva.png" className="locali-logo-minerva" alt="Minerva Navis"/> */}
                        <Sponsori/>
                    </h3>
                    
                    
                </div>
                
            </div>
            <Parti/>
        </div>
    )
}

PageHeader.defaultProps = {
    titlu: 'River Wolves',
    subtitlu: 'We work. We howl. We succeed. Together.',
    subsubtitlu: 'Romanian FTC Robotics team',
}


export default PageHeader
