import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Link } from "react-router-dom";

const docDetails = [{lebal: "Quatation", }, {lebal: "Invoice", }, {lebal: "Recipt", }]

const IspDashboard: React.FC = () =>{
    const activeShop = useSelector((state: RootState) => state.activeShop); 
    
    useEffect(() =>{
        if(activeShop.shop){
            const shop_id = activeShop.shop.shop_id;
        }
    }, [activeShop])
   
    return(
        <div  className='body2 bg-white'>
            <section className="upper-section px-0 px-sm-5 bg-secondary-subtle py-3 mb-3">
                <div className="d-flex justify-content-between align-items-center px-5 px-sm-0">
                    <div>
                        <h3 className="font-family-poppins font-weight-700 font-size-24 line-height-24 text-dark">
                            Dashboard
                        </h3>
                        <p className="font-family-poppins font-weight-400 font-size-14 line-height-21 text-dark">
                            A quick data start with your client.
                        </p>
                    </div>  
                </div>
            </section>
            <section className="lower-section bg-white d-flex flex-row flex-wrap justify-content-around mb-5">
            {
                docDetails.map((doc, i) =>(
                    <div key={i}>
                        <button   type="button" 
                        className="btn btn-light btn-lg shadow">
                            <Link  id='dashboard' to= "/create-quotation"
                            className={` `}>
                                {doc.lebal}
                            </Link>
                        </button>
                    </div>
                ))
            }
        </section>
            
        </div>
    )
}

export default IspDashboard;