import styles from "./AppNav.module.css";
import PageNav from "./PageNav";
function AppNav() {
  return (
    <nav className={styles.nav}>
      <PageNav />
    </nav>
  );
}

export default AppNav;
