import { useState } from "react";
import TurkeyMap from "turkey-map-react";
import { useNavigate } from "react-router-dom";

export const TurkeyMapComp = () => {
  const navigate = useNavigate();
  //   const [hoveredProvince, setHoveredProvince] = useState(null);

  //   const handleProvinceHover = (region) => {
  //     Navigate(`/?region=${region}`);
  //     // setHoveredProvince(province);
  //   };

  return (
    <div className="container">
      <TurkeyMap
        hoverable={true}
        onClick={({ plateNumber, name }) => {
          navigate(`city/${name}`);
        }}
        // onHover={({ plateNumber, name }) => console.log("Cursor is over on " + plateNumber + " - " + name)}
      />
    </div>
  );
};
