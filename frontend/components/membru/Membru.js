import { useEffect,useState } from "react"
import PageHeader from '../PageHeader'
import PageFooter from '../PageFooter'
import classnames from 'classnames';
import Neaprobat from "./Neaprobat";
import Adauga from "./Adauga";
import AdminUseri from "./AdminUseri";
import Profil from "./Profil";
import AdminIndicii from "./AdminIndicii";
import Stand from "./Stand";
import Ranks from "./Ranks";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import AdminJucatori from "./AdminJucatori";

const Membru = ({userData, refData}) => {

  const [perm, setPerm] = useState(0);

  const [tabs, setTabs] = useState([
    {
      perm: 0,
          tag: 'neaprobat',
          icon: 'ui-1_simple-remove',
          comp: <Neaprobat/>,
        },
  ])
  

  const user = userData.data;

  useEffect(() => {
    let arata = 1;
    switch(user.grad) {
      case "VOLUNTAR":
        setPerm(20);
        break;
      case "SPONSOR":
        setPerm(10);
        break;
      case "MEMBRU":
        setPerm(30);
        break;
      case "PARTENER":
        setPerm(40);
        break;
      case "MENTOR":
          setPerm(50);
        break;
      case "BOARD":
          setPerm(60);
        break;
      case "TEAM_LEADER_TEHNIC":
          setPerm(70);
        break;
      case "TEAM_LEADER_NON_TEHNIC":
          setPerm(70);
        break;
      case "TEAM_LEADER":
          setPerm(70);
        break;
      case "MINA":
          setPerm(100);
        break;
      default:
        setPerm(0);
        arata = 0;
    }
    if(arata==1){
      if(!user.nume || !user.telefon || !user.data_nasterii){
        setTabs([
          {
            perm: 10,
            tag: 'profil',
            icon: 'clothes_tie-bow',
            comp: <Profil refData={refData}/>,
          },
        ])
      }else{
      setTabs([
        {
          perm: 20,
          tag: 'adauga',
          icon: 'sport_user-run',
          comp: <Adauga userData={userData.data}/>,
        },
        {
          perm: 20,
          tag: 'rankuri',
          icon: 'design_bullet-list-67',
          comp: <Ranks userData={userData.data}/>,
        },
        {
          perm: 30,
          tag: 'stand_bilete',
          icon: 'location_pin',
          comp: <Stand userData={userData.data}/>,
        },
        {
          perm: 40,
          tag: 'admin_indicii',
          icon: 'business_chart-pie-36',
          comp: <AdminIndicii userData={userData.data}/>,
        },
        {
          perm: 60,
          tag: 'admin_useri',
          icon: 'ui-1_lock-circle-open',
          comp: <AdminUseri userData={userData.data}/>,
        },
        {
          perm: 60,
          tag: 'admin_jucatori',
          icon: 'objects_globe',
          comp: <AdminJucatori userData={userData.data}/>,
        },
      ])
    }
    }else{
      setTabs([
        {
          perm: 0,
          tag: 'neaprobat',
          icon: 'ui-1_simple-remove',
          comp: <Neaprobat/>,
        },
      ])
    }
  }, [])
  
  return (
        <div className="section section-tabs">
          <div className="container">
            <div className="row">
              <div className="ml-auto mr-auto ">
                <div className="card">
                  <div className="card-header">
                    <p></p>
                    <ul className="nav nav-pills nav-pills-just-icons nav-pills-primary justify-content-center" role="tablist">
                    {
                      tabs.filter((tab) => (tab.perm <= perm))
                        .map((tab, index) => (
                          <li className="nav-item" key={index}>
                            <a {...(index == 0 ? { className: 'nav-link active' } : { className: 'nav-link' })} data-toggle="tab" href={"#"+tab.tag} role="tab">
                                <i className={classnames("now-ui-icons", tab.icon)}></i>
                            </a>
                          </li>
                      ))
                    }
                    </ul>
                  </div>
                  <div className="card-body">
                    <div className="tab-content text-center">
                      {
                      tabs.filter((tab) => (tab.perm <= perm))
                          .map((tab, index) => (
                            <div {...(index == 0 ? { className: 'tab-pane active' } : { className: 'tab-pane' })} id={tab.tag} role="tabpanel" key={index}>
                                {tab.comp}
                            </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default Membru