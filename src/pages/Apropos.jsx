import Sparktek from "./spark-tek.jpg";

function Apropos() {
  return (
    <div className="text-center  mt-2 ">
      <h1 className="text-1">À Propos De Spark-Tek</h1>
      <img
        src={Sparktek}
        style={{ height: 500 }}
        alt="spark-tek"
        className="mt-3"
      />
      <div className="text-dark fw-bold w-auto mt-4">
        <p>
          spark-tek est un magazin qui vous propose le meilleur de
          l'informatique et du High-Tech (tablettes, ordinateurs...).
        </p>
        <p>
          SPARK-TEK.tn est un site qui appartient au groupe SPARK IT© LTD
          présent en UK, en FRANCE et récemment en TUNISIE. Fort de son
          expérience internationale, le groupe SPARK IT vous offre un service de
          qualité à un prix imbattable.
        </p>
      </div>
      <h2 className="text-1">Nos Services</h2>
      <div>
        <div>
          <h5 className="text-1">Service Entreprise</h5>{" "}
          <p>
            Spark-Tek entreprise propose des offres adaptées au milieu
            professionnel. Que vous soyez une entreprise, startup, une
            collectivité, une association ou une administration, Bénéficiez d'un
            accompagnement personnalisé et de solutions adaptées à vos projets :
            biens d'équipements consommables, achats volumiques, devis...etc.
          </p>
        </div>
        <div>
          <h5 className="text-1">SAV</h5>{" "}
          <p>
            Tous nos produits sont garantis contre les vices de fabrication pour
            une durée minimum d’une année. Nous proposons également des modèles
            professionnels pouvant aller jusqu’à 5 années de garantie.
            L’assurance du « zéro litige » Une question ? Un problème ?
            Contactez-nous on s’occupe de tout !
          </p>
        </div>
        <div>
          <h5 className="text-1">Service Maintenance</h5>{" "}
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores
            iste repellendus tempore expedita nemo quidem cum, magnam corrupti
            ad ratione modi alias minus aspernatur voluptates autem vel fugit
            nihil quos!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Apropos;
