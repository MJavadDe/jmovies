import styles from "./MainSection.module.css";

function MainSection() {
  return (
    <>
      <ul className={`${styles.galleryContainer}`}>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <div className={`absolute ${styles.absolute_1}`}>salam</div>
      <div className={`absolute ${styles.absolute_2}`}>salam</div>
    </>
  );
}

export default MainSection;
