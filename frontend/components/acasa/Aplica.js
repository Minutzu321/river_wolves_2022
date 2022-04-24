import {useState} from 'react'


const Aplica = () => {
    const [suntRecrutari, setSuntRecrutari] = useState(false)
    return (
        <div className="section section-tabs">
          <div className="container">
            <div className="row">
              <div className="aplica">
                <p className="category">Aplica pentru un rol!</p>
                <div className="card">
                  <div className="card-header">
                    <p></p>
                    <ul className="nav nav-pills nav-pills-just-icons nav-pills-primary justify-content-center" role="tablist">
                      <li className="nav-item">
                        <a className="nav-link active" data-toggle="tab" href="#voluntar" role="tab">
                          <i className="now-ui-icons sport_user-run"></i>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#media" role="tab">
                          <i className="now-ui-icons business_bulb-63"></i>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#mecanic" role="tab">
                          <i className="now-ui-icons ui-2_settings-90"></i>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#programator" role="tab">
                          <i className="now-ui-icons tech_laptop"></i>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#designer" role="tab">
                          <i className="now-ui-icons design-2_ruler-pencil"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="card-body">
                    <div className="tab-content text-center">
                      <div className="tab-pane active" id="voluntar" role="tabpanel">
                        <h3><b>Voluntari</b></h3>
                        <h4>Voluntarii sunt cei care vor să ajute echipa, fără a se implica prea mult în organizarea ei sau cei care nu sunt siguri dacă vor sau nu să intre în echipă așa că vor să vadă mai întâi cum ne desfășurăm activitatea.</h4>
                      </div>
                      <div className="tab-pane" id="media" role="tabpanel">
                        <h3><b>Media</b></h3>
                        <h4>Cei de la media se ocupă în general cu paginile de facebook și instagram, activitățile de outreach, sponsorizări, relațiile cu publicul, caietul tehnic, flyere, etc.</h4>
                      </div>
                      <div className="tab-pane" id="mecanic" role="tabpanel">
                        <h3><b>Mecanică</b></h3>
                        <h4>Cei de la mecanică se ocupă de construcția robotului, conectarea modulelor, aranjarea cablurilor și găsirea materialelor.</h4>
                      </div>
                      <div className="tab-pane" id="programator" role="tabpanel">
                        <h3><b>Programare</b></h3>
                        <h4>Cei de la programare se ocupă cu tot ce ține de autonomia și controlul robotului dar și cu site-ul sau alte proiecte secundare cum ar fi aplicații cu inteligență artificială, computer vision, etc.</h4>
                      </div>
                      <div className="tab-pane" id="designer" role="tabpanel">
                        <h3><b>Design 3D</b></h3>
                        <h4>Cei de la design se ocupă de proiectarea pieselor în format 3D, asamblarea în programe de vizualizare 3D a robotului și proiectarea acestuia, fiind în strânsă legătură cu cei de la mecanică.</h4>
                      </div>
                      {suntRecrutari ? <AplicaDeschis/> : <AplicaInchis/>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
    )
}

const AplicaInchis = () => (
  <h4><b>Aplicatiile pentru rolurile de membru sunt dezactivate pana in luna Iulie</b></h4>
)

const AplicaDeschis = () => (
  <div>
    <h4><b>Apasă pe butonul de mai jos pentru a deveni un membru în cadrul echipei</b></h4>
    <a href="register" className="btn btn-primary btn-icon btn-round btn-lg" type="button">
      <i className="now-ui-icons files_paper"></i>
    </a>
  </div>
)

export default Aplica
