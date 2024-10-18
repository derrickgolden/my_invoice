import { logo } from "../../assets/images";
import { GoDownload } from "react-icons/go";
import html2pdf from "html2pdf.js";
import { QuotationProps, QuoteDetailsArg } from "./type";
import { quoteTableKeys } from "./quoteTotalCal";

const Quotation: React.FC<QuotationProps> = ({quoteDetails, totalPrice, quoteDate, compDetails, difLogo}) => {

    const handleDownloadPDF = () => {
        const opt = {
            margin:       0.5,
            filename:     `${compDetails.receiver.name} quotation - ${new Date().toLocaleDateString()}`,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2 },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        const element = document.getElementById('quoteTable');

        if (element) {
            html2pdf().from(element).set(opt).save();
        }
    };

    return (  
        <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <button onClick={handleDownloadPDF}
                        className="btn btn-outline-secondary modal-title fs-5" id="exampleModalLabel">
                            Download <GoDownload />
                        </button>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div  style={{backgroundColor: "#a8a8a8"}}>
                            <div id="quoteTable" className="bg-white receipt " >

                                <header className="d-flex justify-content-between gap-1 mb-2">
                                    <div className="d-flex flex-column">
                                        <h2 className="text-primary-emphasis">Quotation</h2>
                                        <p className="mb-0 d-flex gap-3 justify-content-between fw-medium">
                                            <span className="text-body-tertiary ">
                                                Quotation No # 
                                            </span>
                                            <span>
                                                {quoteDate.q_no}
                                            </span>
                                        </p>
                                        <p className="mb-0 d-flex gap-3 justify-content-between fw-medium">
                                            <span className="text-body-tertiary ">
                                                Quotation Date 
                                            </span>
                                            <span>
                                                {quoteDate.q_date}
                                            </span>
                                        </p>
                                        <p className="mb d-flex gap-3 justify-content-between fw-medium">
                                            <span className="text-body-tertiary ">
                                                Valid Till Date 
                                            </span>
                                            <span>
                                                {quoteDate.v_date}
                                            </span>
                                        </p>
                                    </div>
                                    <div>
                                        {/* <img src={`${server_baseurl}/${localShop?.logo_path}`} alt="logo" 
                                        style={{width: "40px", height:"30px"}}/> */}
                                        <img src={difLogo || logo} alt="logo" 
                                        style={{width: "100px", height:"100px"}}/>
                                    </div>
                                </header>

                                <div className="d-flex gap-3 " >
                                    <div className="bg-light p-3 flex-grow-1 rounded">
                                        <h5 className="mb-0 text-info">{compDetails.sender.name.toUpperCase()}</h5>
                                        <h6 className="mb-0">{compDetails.sender.name}</h6>
                                        <p className="mb-0">{compDetails.sender.country}</p>
                                        <p className="mb-0"><b>Phone:</b> {compDetails.sender.phone}</p>
                                    </div>
                                    <div className="bg-light p-3 flex-grow-1 rounded">
                                        <h5 className="mb-0 text-info">Quotation For</h5>
                                        <p className="mb-0"><b>{compDetails.receiver.name}</b></p>
                                        <p className="mb-0">{compDetails.receiver.country}</p>
                                        <p className="mb-0"><b>Phone:</b> {compDetails.receiver.phone}</p>
                                    </div>
                                </div>

                                <div className="mt-4 rounded">
                                    <table className="table table-borderless rounded ">
                                        <thead >
                                            <tr className="table-primary">
                                                <th scope="col">#</th>
                                                <th scope="col">Description</th>
                                                <th scope="col">Unit Price</th>
                                                <th scope="col">Quantity</th>
                                                <th scope="col">Sub Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {quoteDetails.map((quate, i) =>(
                                                <tr key={i} className={`${i % 2? "table-light " : " "}`}
                                                style={{pageBreakInside: "avoid", breakInside: "avoid"}}>
                                                    <th scope="row">{i + 1}.</th>
                                                    {(quoteTableKeys as Array<keyof QuoteDetailsArg>).map((k, j) =>(
                                                        <td key={i + j}>{quate[k]}</td>
                                                    ))}
                                                    <td>{quate.sub_total}</td>
                                                </tr>
                                            ))}
                                        
                                        </tbody>
                                    </table>

                                    <div className="d-flex col-6 border-top border-bottom border-secondary px-2 justify-content-between"
                                    style={{ marginLeft: 'auto', pageBreakInside: "avoid", breakInside: "avoid" }}>
                                        <h3 >TOTAL &nbsp;</h3>
                                        <h3>{totalPrice} Ksh</h3>
                                    </div>

                                    <div className="mt-3 px-5 ">
                                        <p className="fst-italic fw-medium">{compDetails.note}</p>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Quotation;
