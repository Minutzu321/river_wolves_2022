import Image from "next/image"

const Despre = () => {
    return (
        <div className="section">
          <div className="container text-center">
            <div className="row justify-content-md-center">
              <div className="col-md-12 col-lg-8">
                <h2 className="title">Despre noi</h2>
                <h5 className="description"><b>Noi suntem prima echipă de robotică din Județul Tulcea și ajutați în special de <strong rel="tooltip" title="Desfasoara in mare parte cursuri de Astronomie si Electronica la Palatul Copiilor">Societatea Științifică Orion</strong> și de <strong rel="tooltip" title="Liceul Grigore Moisil din Tulcea">Liceul Teoretic Grigore Moisil</strong> am reușit să parcurgem <strong>6</strong> sezoane din concursul <strong rel="tooltip" title="F.I.R.S.T. este un concurs international de robotica pentru toate varstele">FIRST Tech Challenge</strong></b></h5>
                <h5 className="description"><b>Țelul nostru și al competiției este de a evolua, de a învăța lucruri noi. Prin educatia <strong rel="tooltip" title="Science Technology Engineering Mathematics">STEM</strong> punem în aplicare cunoștințele noastre asupra lumii fizice, nu doar teoretice.</b></h5>
              </div>
            </div>
          </div>

            <div className="row">
                <div className="col-sm-10 mx-auto">
                    <div className="card">
                    <div className="card-header">
                        <ul className="nav nav-pills nav-pills-just-icons nav-pills-primary justify-content-center" role="tablist">
                        <li className="nav-item">
                            <p></p>
                            <a className="nav-link active" data-toggle="tab" href="#cefacem" role="tab">
                            <i className="now-ui-icons education_atom"></i>
                            </a>
                        </li>
                        </ul>
                    </div>
                    <br/>
                    <div className="card-body">
                        <div className="tab-content text-center">
                        <div className="tab-pane active" id="cefacem" role="tabpanel">
                            <h3><b>Ce facem noi?</b></h3>
                            <h5>Concursul se numește <b>FIRST Tech Challenge</b>.</h5>
                            <h5>În fiecare an/sezon se dezvăluie câte o nouă temă. Noi trebuie să construim un robot care să îndeplinească provocările temei propuse, făcându-l cât mai eficient pentru a câștiga cât mai multe puncte.</h5>
                            <h5><b>Din fericire</b>, acest concurs <b>nu</b> înseamnă numai roboți. Trebuie să interacționăm cât mai mult cu cei din comunitate, făcând activități, colaborări sau cerând sponsorizări. Relația cu oamenii este crucială când vine vorba de tehnologie, întrucât aceasta(tehnologia) are rolul de a ne ajuta.</h5>
                            <h5>Toate aceste activități sunt puse în <b>caietul tehnic</b> care arată aportul nostru în societate. Pe măsura implicării, se pot da diferite premii echipelor care au iesit in evidenta.</h5>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            <div className="col-sm-10 mx-auto">
                <div className="card">
                <div className="card-header">
                    <ul className="nav nav-pills nav-pills-just-icons nav-pills-primary justify-content-center" role="tablist">
                    <li className="nav-item">
                        <p></p>
                        <a className="nav-link active" data-toggle="tab" href="#abilitati" role="tab">
                        <i className="now-ui-icons sport_trophy"></i>
                        </a>
                    </li>
                    </ul>
                </div>
                <br/>
                <div className="card-body">
                    <div className="tab-content text-center">
                    <div className="tab-pane active" id="sez5" role="tabpanel">
                        <h3><b>Premii</b></h3>
                        <Image src="/media/RO 049 - diploma FTC IASI REGIONAL - Winner INNOVATE AWARD 1-1.jpg" width={800} height={565} alt="FTC IASI REGIONAL - Winner INNOVATE AWARD"/>
                        <h4><strong>Sezonul 5(2020-2021)</strong></h4>
                        <h5>Am câștigat <b>Locul 1</b> la <b>INNOVATE AWARD</b> în 2021.</h5>
                        <h5>Am reușit să dezvoltăm un design creativ şi ingenios iar, folosindu-ne inventivitatea, <i>l-am adus la viață</i>.</h5>
                        <a href="media/Caiet%20RO049-V3.pdf" target="_blank"><h5>Click aici ca să descărcați/vizualizați robotul și activitatea noastră pe anul 2020-2021</h5></a>

                        <hr/>

                        <Image src="/media/RO 049 - RIVER WOLVES - diploma FTC IASI REGIONAL - WINNER 20-1.jpg" width={800} height={565} alt="FTC IASI REGIONAL - Winner THINK 2"/>
                        <h4><strong>Sezonul 6(2021-2022)</strong></h4>
                        <h5>Am câștigat <b>Locul 2</b> la <b>THINK AWARD</b> în 2022.</h5>
                        <h5>Am reușit să trecem peste obstacolele întâlnite în procesul de construire al robotului prin gândire creativă iar călătoria noastră în acest proces a fost documentată foarte bine în caietul tehnic. Acest premiu ne-a dus la prima noastră <b>Națională de Robotică</b></h5>
                        <a href="media/PORTOFOLIU RIVER WOLVES RO049-17781.pdf" target="_blank"><h5>Click aici ca să descărcați/vizualizați robotul și activitatea noastră pe anul 2021-2022</h5></a>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Despre