import styles from "../styles/Footer.module.css";
import Image from "next/image";
// import TawkMessengerReact from "@tawk.to/tawk-messenger-react";
export default function Section() {
  const onLoad = () => {
    console.log("onLoad works!");
  };
  return (
    <div className={styles.section}>
      <div className={styles.secondSection}>
        <div
          style={{
            height: "100px",
            alignItems: "center",
            justifyContent: "center",
          }}
          className={styles.flex}
        >
          <div className={styles.titleWhy}>Why Choose</div>
          <div className={styles.titleWhyBlue}>Copiers Utah</div>
        </div>
        <div
          style={{ height: "200px", justifyContent: "space-between" }}
          className={styles.flexSection}
        >
          <div className={styles.space}>
            <div className={styles.row}>
              <Image
                src="/static/seen.webp"
                alt="double checkmarks"
                width={25}
                height={15}
                style={{ paddingRight: "10px" }}
              />
              <div>Premier remanufacturing facility in Utah</div>
            </div>
            <div className={styles.row}>
              <Image
                src="/static/seen.webp"
                alt="double checkmarks"
                width={25}
                style={{ paddingRight: "10px" }}
                height={15}
              />
              <div>
                Top Brands And Models To Fit Any Budget And Business Need
              </div>
            </div>
            <div className={styles.row}>
              <Image
                src="/static/seen.webp"
                alt="double checkmarks"
                width={25}
                style={{ paddingRight: "10px" }}
                height={15}
              />
              <div>Thoroughly Tested And Serviced Used Copiers </div>
            </div>
          </div>
          <div className={styles.space}>
            <div className={styles.row}>
              <Image
                src="/static/seen.webp"
                alt="double checkmarks"
                width={25}
                height={15}
                style={{ paddingRight: "10px" }}
              />
              <div>Wide Range Of New And Used Copiers For Sale In Utah</div>
            </div>
            <div className={styles.row}>
              <Image
                src="/static/seen.webp"
                alt="double checkmarks"
                width={25}
                height={15}
                style={{ paddingRight: "10px" }}
              />
              <div>New And Used Copiers Available</div>
            </div>
            <div className={styles.row}>
              <Image
                src="/static/seen.webp"
                alt="double checkmarks"
                width={25}
                height={15}
                style={{ paddingRight: "10px" }}
              />
              <div>Toner Of All Brands Sold</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
