import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const navigate = useNavigate();
  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      Postion {lat} and {lng}
      <button onClick={() => setSearchParams({ lat: 300, lng: 69 })}>
        Change Postion
      </button>
    </div>
  );
}

export default Map;
