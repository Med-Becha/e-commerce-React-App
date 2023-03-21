import { Helmet, HelmetProvider } from "react-helmet-async";

 const MetaComponent = ({ title = "Spark-Tek", description="vente materiel informatique" }) => {
    return (
       <HelmetProvider>
           <Helmet>
              <title>{title}</title> 
              <meta name="description" content={description} />
           </Helmet>
       </HelmetProvider> 
    )
 }

 export default MetaComponent
