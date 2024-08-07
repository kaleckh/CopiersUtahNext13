import React from "react";
import Link from "next/link";
import styles from "../styles/filter.module.css";
import Image from "next/image";
const BreadCrumbs = ({ breadCrumbs }) => {
  return (
    <div style={{ display: "flex", paddingLeft: "30px" }}>
      {breadCrumbs?.map((breadCrumb, index) => (
        <div key={index} className={styles.breadCrumbs}>
          <Link href={breadCrumb.url} className={styles.black}>
            <div style={{ color: "black", borderBottom: "1px black solid" }}>
              {breadCrumb.name}
            </div>
          </Link>
          {breadCrumbs?.length - 1 !== index && (
            <div className={styles.arrow}>
              <Image
                src="/static/right-arrow.webp"
                alt="right arrow "
                width={15}
                height={15}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BreadCrumbs;
