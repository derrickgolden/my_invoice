import { ChangeEvent, useEffect, useRef, useState } from "react";
import { getSessionStorage } from "../controllers/getSessionStorage";
import { logo } from "../../assets/images";
import { MdCancel } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import { QuotationProps, QuoteDetailsArg } from "./type";
import { quoteTableKeys, quoteTotalCal } from "./quoteTotalCal";
import Quotation from "./Quotation";

const QuatationCreate = () => {
    
    const logoRef = useRef<HTMLInputElement | null>(null);
    const [quoteDetails, setQuoteDetails] = useState<QuoteDetailsArg[]>([]);
    const [quoteDate, setQuoteDate] = useState({q_date: new Date().toLocaleDateString(), v_date: "",  q_no: "A00104"});
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [difLogo, setDifLogo] = useState<string | null>(null);
    const [compDetails, setCompDetails] = useState({
        sender: {name: "JAP TECHNOLOGY SYSTEM", country: "Kenya", phone: "0722463565"}, 
        receiver: {name: "", country: "Kenya", phone: ""}, note: ""
    });

    const userShop = getSessionStorage();
    const { localShop, user } = userShop;
    // console.log(user)

    useEffect(() =>{
        const date = new Date();
        date.setDate(date.getDate() + 30);
        setQuoteDate(obj => ({...obj, v_date: date.toLocaleDateString()}));

        const retriveDetails = localStorage.getItem("quoteDetails");
        if(retriveDetails){
            const prevDetails: QuotationProps = JSON.parse(retriveDetails);
            setQuoteDetails(prevDetails.quoteDetails);
            setTotalPrice(prevDetails.totalPrice);
            setQuoteDate(prevDetails.quoteDate);
            setCompDetails(prevDetails.compDetails);
            setDifLogo(prevDetails.difLogo);
        }
    }, []);

    const handleQuoteDate = async (e: ChangeEvent<HTMLInputElement>) =>{
        const key = e.target.name;
        const val = e.target.value;
        setQuoteDate(obj => ({...obj, [key]: val}));
    };
    const handleQuoteDetails = (e: ChangeEvent<HTMLInputElement>, i: number) =>{
        const key = e.target.name;
        const val = e.target.value;

        setQuoteDetails((arr) =>{
            const newarr = arr.map((obj, j) =>{
                if(i === j){
                    return {...obj, [key]: val};
                }
                return obj;
            });
            const {details, total} = quoteTotalCal(newarr);
            setTotalPrice(total);
            return details;
        })
    }
    const deleteQuote = (i: number) =>{
        setQuoteDetails((arr) =>{
            const newarr = arr.filter((_, index) => index !== i);
            return newarr;
        })
    };
    const addNewQuote = () =>{
        setQuoteDetails((arr) => [...arr, {descr: "", u_price: 0, qty: 0, sub_total: 0}]);
    }
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setSelectedFile(file);
    
        // Create a preview of the image if it is an image file
        if (file && file.type.startsWith('image/')) {
          const imagePreviewUrl = URL.createObjectURL(file);
          setDifLogo(imagePreviewUrl);
        } 
    };
    const saveData = (bol: boolean) =>{
        localStorage.setItem("quoteDetails", JSON.stringify({quoteDetails, totalPrice, quoteDate, compDetails, difLogo}));
        bol ? alert("Data saved temporary on this browser!") : null;
    };

    return (
        <div>
            <div className="d-flex justify-content-center m-auto px-0 py-2 p-md-4"
            style={{backgroundColor: "#a8a8a8", minHeight: "100vh"}}>
                
                <div className="col-11 py-5 p-md-5 my-2 bg-white p-2 receipt " >

                    <header className="d-flex justify-content-between mb-2 gap-1">
                        <div className="d-flex flex-column">
                            <h2 className="text-primary-emphasis">Quotation</h2>
                            <div className="mb-0 d-flex gap-3 justify-content-between fw-medium">
                                <span className="text-body-tertiary ">
                                    Quotation No # 
                                </span>
                                <span>
                                    <div className="input-group input-group-sm mb-2">
                                        <input type="text" onChange={handleQuoteDate} className="form-control" 
                                        value={quoteDate.q_no} aria-label="Sizing example input" name="q_no"
                                        aria-describedby="inputGroup-sizing-sm"/>
                                    </div>
                                </span>
                            </div>
                            <div className="mb-0 d-flex gap-3 justify-content-between fw-medium">
                                <span className="text-body-tertiary ">
                                    Quotation Date 
                                </span>
                                <span>
                                    <div className="input-group input-group-sm mb-2">
                                        <input type="text" onChange={handleQuoteDate} className="form-control" 
                                        value={quoteDate.q_date} aria-label="Sizing example input" name="q_date"
                                        aria-describedby="inputGroup-sizing-sm"/>
                                    </div>
                                </span>
                            </div>
                            <div className="mb d-flex gap-3 justify-content-between fw-medium">
                                <span className="text-body-tertiary ">
                                    Valid Till Date 
                                </span>
                                <span>
                                    <div className="input-group input-group-sm mb-3">
                                        <input type="text" onChange={handleQuoteDate} className="form-control" 
                                        aria-label="Sizing example input"  value={quoteDate.v_date} name="v_date"
                                        aria-describedby="inputGroup-sizing-sm"/>
                                    </div>
                                </span>
                            </div>
                        </div>
                        <div className="logo text-end">
                            {/* <img src={`${server_baseurl}/${localShop?.logo_path}`} alt="logo" 
                            style={{width: "40px", height:"30px"}}/> */}
                            <div role="button" onClick={() =>{ logoRef.current?.click() }}>
                                <img src={difLogo || logo}  alt="logo"  className="logo"
                                    style={{width: "100px", height:"100px"}}
                                />
                            </div>
                            <span role="button" className="border pb-2" onClick={() =>{ logoRef.current?.click() }}>
                                <MdEdit size={32}/>
                            </span>
                            <div className="" style={{display: "none"}}>
                                <input className="form-control form-control-sm" id="formFileSm" type="file" 
                                    onChange={handleFileChange} accept="image/*" ref={logoRef}
                                />
                            </div>
                        </div>
                    </header>

                    <div className="d-flex justify-content-between gap-3 flex-wrap">
                        <div className="bg-light p-3 col-md-6 rounded">
                            <h3 className="mb-0 text-info">{compDetails.sender.name.toUpperCase()}</h3>
                            {/* <h5 className="mb-0">JAP TECHNOLOGY SYSTEM</h5>
                            <p className="mb-0">Kenya</p>
                            <p className="mb-0"><b>Phone:</b> +254 722 463 565</p> */}
                            <div className="input-group input-group-sm mb-2 mt-2">
                                <span className="input-group-text fw-semibold" id="inputGroup-sizing-sm">Name &nbsp;&nbsp;</span>
                                <input type="text" className="form-control" name="name" value={compDetails.sender.name}
                                onChange={(e) =>{ setCompDetails(obj =>({...obj, sender:{...obj.sender,[e.target.name]: e.target.value}}))}}
                                aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"/>
                            </div>
                            <div className="input-group input-group-sm mb-2">
                                <span className="input-group-text fw-semibold" id="inputGroup-sizing-sm">Country</span>
                                <input type="text" className="form-control" name="country" value={compDetails.sender.country}
                                onChange={(e) =>{ setCompDetails(obj =>({...obj, sender:{...obj.sender,[e.target.name]: e.target.value}}))}}
                                aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"/>
                            </div>
                            <div className="input-group input-group-sm mb-2">
                                <span className="input-group-text fw-semibold" id="inputGroup-sizing-sm">Phone &nbsp;&nbsp;</span>
                                <input type="number" className="form-control" name="phone" value={compDetails.sender.phone}
                                onChange={(e) =>{ setCompDetails(obj =>({...obj, sender:{...obj.sender,[e.target.name]: e.target.value}}))}}
                                aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"/>
                            </div>
                        </div>
                        <div className="bg-light p-3 col-md-5 rounded">
                            <h5 className="mb-0 text-info">Quotation For</h5>
                            <div className="input-group input-group-sm mb-2 mt-2">
                                <span className="input-group-text fw-semibold" id="inputGroup-sizing-sm">Name &nbsp;&nbsp;</span>
                                <input type="text" className="form-control" name="name" placeholder="Jane Cender" value={compDetails.receiver.name}
                                onChange={(e) =>{ setCompDetails(obj =>({...obj, receiver:{...obj.receiver,[e.target.name]: e.target.value}}))}}
                                aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" required/>
                            </div>
                            <div className="input-group input-group-sm mb-2">
                                <span className="input-group-text fw-semibold" id="inputGroup-sizing-sm">Country</span>
                                <input type="text" className="form-control" name="country" value={compDetails.receiver.country}
                                onChange={(e) =>{ setCompDetails(obj =>({...obj, receiver:{...obj.receiver,[e.target.name]: e.target.value}}))}}
                                aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" required/>
                            </div>
                            <div className="input-group input-group-sm mb-2">
                                <span className="input-group-text fw-semibold" id="inputGroup-sizing-sm">Phone &nbsp;&nbsp;</span>
                                <input type="number" className="form-control" name="phone" placeholder="0714475702" value={compDetails.receiver.phone}
                                onChange={(e) =>{ setCompDetails(obj =>({...obj, receiver:{...obj.receiver,[e.target.name]: e.target.value}}))}}
                                aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" required/>
                            </div>
                            {/* <p className="mb-0"><b>Jane Cedar</b></p> */}
                            {/* <p className="mb-0">Kenya</p> */}
                            {/* <p className="mb-0"><b>Phone:</b> +254 722 463 565</p> */}
                        </div>
                    </div>

                    <div className="mt-4 rounded">
                        <table className="table rounded table-borderles">
                            <thead >
                                <tr className="table-primary">
                                    <th scope="col">#</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Unit Price(Ksh)</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Sub Total</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {quoteDetails.map((quote, i) =>(
                                    <tr key={i}>
                                        <th scope="row">{i + 1}.</th>
                                        {(quoteTableKeys as Array<keyof QuoteDetailsArg>).map((k, j) =>(
                                            <td key={i + j}>
                                                <input type={`${k === "descr" ? "text": "number"}`} value={quote[k]} 
                                                onChange={(e) =>handleQuoteDetails(e, i)} name={k} required
                                                className="form-control border-top-0 border-start-0 border-end-0" 
                                                 aria-label="Username" aria-describedby="basic-addon1"/>
                                            </td>
                                        ))}
                                            <td>
                                                Ksh {quote.sub_total}
                                            </td>
                                        <td>
                                            <button type="button" onClick={() => deleteQuote(i)}
                                            className="btn btn-outline-warning btn-sm">
                                                <MdCancel size={18}/>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                    <tr>
                                        <td colSpan={5} className="text-end">
                                            
                                        </td>
                                        <td  className="">
                                            <button type="button" onClick={addNewQuote}
                                            className="btn btn-outline-warning btn-sm">
                                                <IoMdAddCircle size={18}/>
                                            </button>
                                        </td>
                                    </tr>   
                            </tbody>
                        </table>

                        <div className="d-flex col-6 border-top border-bottom border-secondary px-2 justify-content-between"
                        style={{ marginLeft: 'auto' }}>
                            <h3 >TOTAL &nbsp;</h3>
                            <h3>{totalPrice} Ksh</h3>
                        </div>

                        <div className="form-floating col-8 mt-4">
                            <textarea className="form-control" placeholder="Leave a Note here" id="floatingTextarea2"
                            onChange={(e) =>{ setCompDetails(obj =>({...obj, [e.target.name]: e.target.value}))}} 
                            value={compDetails.note}
                            name="note" style={{height: "100px"}}></textarea>
                            <label htmlFor="floatingTextarea2">Note</label>
                        </div>  
                    </div>
                    <div className="text-end m-5" >
                        <button type="button" className="btn btn-primary mx-4" onClick={() => saveData(true)} >
                            Save
                        </button>
                        <button type="button" className="btn btn-primary" onClick={() => saveData(false)} 
                        data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Final Copy
                        </button>
                    </div>
                </div>
            </div>
            <Quotation 
                quoteDetails ={quoteDetails}
                totalPrice = {totalPrice}
                quoteDate = {quoteDate}
                compDetails = {compDetails}
                difLogo = {difLogo}
            />
        </div>
    );
};

export default QuatationCreate;
