"use client";
import React, { useEffect, useRef, useState, useContext } from "react";
import Header from "../components/Header";
import axios from 'axios';
import Image from "next/image";
import Sliver from "../components/sliverr";
import { CartContext } from "../../providers/cart";
import BreadCrumbs from "../components/BreadCrumbs";
import Head from "next/head";
import styles from "../styles/checkout.module.css";
import Footer from "../components/Footer";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";
import { useRouter } from "next/navigation";
const Checkout = (props) => {
    const router = useRouter()
    const [recaptchaResponse, setRecaptchaResponse] = useState(false);
    const [identity, setIdentity] = useState({});
    const [orderId, setOrderId] = useState("");
    const [bottomToggle, setBottomToggle] = useState(false);
    const [po, setPo] = useState("1234");
    const [city, setCity] = useState();
    const [hidden, setHidden] = useState(false);
    const [hiddenBottom, setHiddenBottom] = useState(false);
    const [preShip, setPreShip] = useState();
    const [exp, setExp] = useState();
    const [billing, setBilling] = useState(false);
    const [csv, setCsv] = useState();
    const [card, setCard] = useState();
    const [localCart, setLocalCart] = useState();
    const [cardInfoLocal, setCardInfoLocal] = useState({});
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [noChange, setFalse] = useState(false);
    const [realPriceLocal, setRealPriceLocal] = useState();
    const { realPrice, setPersonInfo, setCardInfo, personInfo, cardInfo, cart, totalAmount, tonerOem } = useContext(CartContext);
    const [something, setSomething] = useState(false);
    const [price, setPrice] = useState("");
    const [total, setTotal] = useState(0);
    const [newPrice, setNewPrice] = useState("");
    const [number, setNumber] = useState("");
    const [maybe, setMaybe] = useState(false);
    const [address, setAddress] = useState("");
    const [billingInfo, setBillingInfo] = useState("");
    const [billingAddress, setBillingAddress] = useState("");
    const [billingState, setBillingState] = useState();
    const [billingCity, setBillingCity] = useState();
    const [state, setState] = useState();
    const [billingZip, setBillingZip] = useState();
    const [zip, setZip] = useState();
    const [items, setItems] = useState(false);
    const [message, setMessage] = useState("");
    const tawkMessengerRef = useRef();

    useEffect(() => {
        setTotal(JSON.parse(localStorage.getItem("total")))

        setPersonInfo({
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "phone": phone,
            "address": address,
            "city": city,
            "state": state,
            "zip": zip,
            "id": po
        })
        // setPersonInfo(identity)


    }, [firstName, lastName, email, phone, city, address, state, zip, po])
    useEffect(() => {

        setCardInfo({
            "card": card,
            "csv": csv,
            "exp": exp
        })

    }, [csv, card, exp])
    useEffect(() => {

        if (hiddenBottom === false) {
            setBillingInfo({
                "address": address,
                "city": city,
                "state": state,
                "zip": zip,
            })
        } else {
            setBillingInfo({
                "address": billingAddress,
                "city": billingCity,
                "state": billingState,
                "zip": billingZip,
            })
        }


    }, [billingAddress, billingCity, billingZip, billingState])

    async function callBack() {

    }
    // useEffect(() => {
    //     setLocalCart(cart)
    // }, [cart])


    async function chargeCard() {

        const requestOptions = {
            method: "POST",
            body: JSON.stringify({
                cardInfo,
                personInfo,
                cart

            }),
        };

        try {
            const response = await fetch('/api/pay/card', requestOptions);
            const data1 = await response.json();
            console.log(data1, "this is the response")
            if (data1?.messageeee.transactionResponse.responseCode == 1) {

                setPo(data1.messageeee.transactionResponse.transId)
                createDistribution()

            }
        } catch (err) {
            // router.push('/')
        }
    }


    useEffect(() => {
        setRealPriceLocal(JSON.parse(localStorage.getItem("realPrice")))
        setPreShip(JSON.parse(localStorage.getItem("realPrice")) - 2)

    }, [])

    useEffect(() => {
        setTotal(totalAmount - 2.99)
    }, [totalAmount])


    async function createDistribution() {

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                personInfo,
                cart
            }),
        };

        const response = await fetch("/api/pay/distribution", requestOptions);
        const data1 = await response.json();
        console.log(data1, "this is the data")
        if (data1.succesful === 200) {

            setBottomToggle(!bottomToggle)
            localStorage.removeItem("cart");
            sendEmail()
            sendEmailBoss()
        }

    }
    // const sendEmail = (e) => {
    //     e.preventDefault();
    //     console.log("Sending");

    //     fetch("https://api.smtp2go.com/v3/email/send", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             api_key: "api-A4D77AA0362911EEA716F23C91C88F4E",
    //             to: [{ email }],
    //             sender: "<info@copiersutah.com>",
    //             subject: `This is${name}'s quote form. Her number is ${number}`,
    //             text_body: `${message}`,
    //             html_body: `<h1>${message}</h1>`,
    //             template_id: "0107239",
    //             template_data: {
    //                 stuff: cart.map((item) => {
    //                     return {
    //                         name: item.name,
    //                         qty: item.quantity,
    //                         price: item.price
    //                     }
    //                 }),
    //                 total: total,
    //                 orderId: po,
    //                 addressLineState: state,
    //                 addressLineStreet: address,
    //                 addressLineCity: city,
    //                 email: email,
    //             },
    //         }),
    //     }).then((res) => {
    //         console.log(res);
    //         if (res.status === 200) {
    //             console.log("Response succeeded!");
    //             // setSubmitted(true);
    //             // setName("");
    //             // setEmail("");
    //             // setBody("");
    //         }
    //     });
    // };
    async function sendEmailBoss() {
        const requestOptions =
        {
            method: "POST",
            body: JSON.stringify({

                stuff: cart.map((item) => {
                    return {
                        name: item.name,
                        qty: item.quantity,
                        price: item.price
                    }
                }),
                total: total,
                orderId: po,
                addressLineState: state,
                addressLineStreet: address,
                addressLineCity: city,
                email: email


            }),
        }

        console.log(requestOptions.body, "this is the body")
        try {
            const response = await fetch('/api/pay/email', requestOptions);
            const data1 = await response.json();
            console.log(data1, "this is the response")
        } catch (err) {
        }
    }

    const breadCrumbs = [
        { name: "Home", url: "/" },
        { name: `Toners`, url: `/toner` },
        { name: `${tonerOem}`, url: `/tonerChoice?oem=${tonerOem}` },
        { name: `Your Cart`, url: `/cart` },
    ]

    return (
        <div className={styles.main}>
            <Sliver />
            <Header />
            <BreadCrumbs breadCrumbs={breadCrumbs} />
            <div className={styles.bottomMain}>
                {bottomToggle ? <>
                    <div className={styles.centerStuff}>
                        <div style={{ fontSize: "30px", paddingBottom: "500px", width: "70%", textAlign: "center" }}>Your order has been succesful! You will receive a confirmation email at the email provided!</div>
                    </div>
                </> : <div className={styles.container}>
                        <div className={styles.title}>Toner Order</div>
                        <div className={styles.titleSmall}>${totalAmount}</div>
                        <div className={styles.line}></div>
                        <div style={{ width: "80%" }}>
                            <div className={styles.beginning}>
                                <div style={{ display: "flex" }}>
                                    <div style={{ paddingRight: "5px", paddingBottom: "10px", paddingTop: "10px" }} >ORDER SUMMARY</div>
                                    <div style={{ paddingTop: "10px" }}>({cart.length}) Item</div>
                                </div>
                                {items ? <></> : <div style={{ paddingTop: "10px", cursor: "pointer" }} onClick={() => {
                                    setHidden(!hidden)
                                }}>+ See Items</div>}

                            </div>


                            <div>
                                {cart.map((item, index) => {

                                    return <div key={index} className={`${styles.dataResult} ${hidden ? styles.showing : styles.hidden}`}>
                                        <div style={{ display: "flex" }}>
                                            <div style={{ paddingRight: "5px" }}>({item.quantity})</div>
                                            <div style={{ fontSize: "12px" }}>{item.name}</div>
                                        </div>
                                        <div style={{ paddingBottom: "10px" }}>${item.price * item.quantity}</div>
                                    </div>
                                })}
                            </div>

                        </div>
                        <div className={styles.line}></div>
                        <div className={styles.center}>
                            <div className={styles.rowTop}>
                                <div style={{ textAlign: "start" }}>Sub Total:</div>
                                <div>${total.toFixed(2)}</div>
                            </div>
                            <div className={styles.rowTop}>
                                <div style={{ textAlign: "start" }}>Shipping:</div>
                                <div>$2.99</div>
                            </div>
                            <div className={styles.rowTop}>
                                <div style={{ textAlign: "start" }}>Order Total:</div>
                                <div>${totalAmount}</div>
                            </div>
                        </div>

                        <div className={styles.line}></div>
                        <div style={{ width: "80%", fontSize: "17px", paddingTop: "10px", paddingBottom: "10px" }} className={styles.titleSmall}>Contact</div>
                        <div style={{ paddingBottom: "20px" }} >
                            <div style={{ paddingBottom: "20px" }} className={styles.row}>
                                <input onChange={(event) => {
                                    setFirstName(event.target.value)
                                }} className={styles.input} type="text" placeholder={"First Name"} />
                                <input onChange={(event) => {
                                    setLastName(event.target.value)
                                }} className={styles.input} type="text" placeholder={"Last Name"} />
                            </div>
                            <div className={styles.row}>
                                <input onChange={() => { setPhone(event.target.value) }} className={styles.input} type="text" placeholder={"Phone number"} />
                                <input onChange={() => { setEmail(event.target.value) }} className={styles.input} type="text" placeholder={"Email address for receipt"} />
                            </div>
                        </div>
                        <div className={styles.line}></div>
                        <div>
                            <div className={styles.titleSmall} style={{ paddingBottom: "10px", fontSize: '17px', paddingTop: "10px" }}>Shipping Address</div>
                            <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                                <div style={{
                                    paddingBottom: "20px"
                                }} className={styles.column}>
                                    <div style={{ width: "113%" }} className={styles.row}>
                                        <input onChange={(event) => {
                                            setState(event.target.value)

                                        }} style={{ marginBottom: "20px" }} className={styles.input} type="text" placeholder={"State"} />

                                    </div>
                                    <div style={{ width: "113%" }} className={styles.row}>
                                        <input onChange={(event) => {
                                            setCity(event.target.value)

                                        }} className={styles.input} type="text" placeholder={"City"} />
                                        <input onChange={(event) => {
                                            setZip(event.target.value)

                                        }} className={styles.input} type="text" placeholder={"Zip Code"} />
                                    </div>
                                </div>
                                <input onChange={(event) => { setAddress(event.target.value) }} className={styles.inputB} type="text" placeholder={"Enter your address here"} />
                                {maybe ? <><input className={styles.input} type="text" placeholder={"Apt, Suite, Floor"} /></> : <><div style={{ padding: "10px" }} onClick={() => {
                                    setMaybe(!maybe)
                                }}>+Add Apt</div></>}
                                <div className={styles.center}>
                                    <div style={{ paddingBottom: "10px", width: "113%", textAlign: "center" }}>Is your billing address the same as shipping?</div>
                                    <div className={styles.rowSmall}>
                                        <div>
                                            <div >No</div>
                                            <input onClick={() => {
                                                setBilling(!billing)
                                                setHiddenBottom(!hiddenBottom)
                                            }} type="checkbox" />
                                        </div>
                                        <div>
                                            <div>Yes</div>
                                            <input type="checkbox" />
                                        </div>
                                    </div>
                                    <div style={{
                                        paddingBottom: "20px"
                                    }} className={`${styles.columnHidden} ${hiddenBottom ? styles.showing : styles.hidden}`}>
                                        <div style={{ margin: "5px", width: "126%" }} className={styles.line}></div>
                                        <div style={{ width: "113%" }}>Billing Address</div>
                                        <div style={{ width: "113%", paddingTop: "10px" }} className={styles.row}>
                                            <input onChange={(event) => {
                                                setBillingState(event.target.value)
                                            }} style={{ marginBottom: "20px" }} className={styles.input} type="text" placeholder={"State"} />

                                        </div>
                                        <div style={{ width: "113%" }} className={styles.row}>
                                            <input onChange={(event) => {
                                                setBillingCity(event.target.value)
                                            }} className={styles.input} type="text" placeholder={"City"} />
                                            <input onChange={(event) => {
                                                setBillingZip(event.target.value)
                                            }} className={styles.input} type="text" placeholder={"Zip Code"} />
                                        </div>
                                        <input onChange={() => { setBillingAddress(event.target.value) }} style={{ width: "113%", marginTop: "15px" }} className={styles.inputB} type="text" placeholder={"Enter your address here"} />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className={styles.line}></div>
                        <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                            <div style={{ paddingBottom: "20px", paddingTop: "40px" }}>Card Information</div>
                            <input onChange={(event) => {
                                setCard(event.target.value)
                            }} style={{ marginBottom: "15px" }} className={styles.inputB} type="text" placeholder={"Put card number here"} />
                            <div className={styles.row}>
                                <input onChange={(event) => {
                                    setExp(event.target.value)
                                }} className={styles.input} type="text" placeholder={"Exp Dat"} />
                                <input onChange={() => {
                                    setCsv()
                                }} className={styles.input} type="text" placeholder={"CSV"} />
                            </div>
                        </div>

                        <button onClick={() => {
                            // chargeCard()
                            // createDistribution()
                            sendEmailBoss()
                        }} style={{ marginBottom: "15px" }} className={styles.button}>Checkout!</button>



                    </div>}

            </div>
            <Footer />
        </div >
    );
};

export default Checkout;
