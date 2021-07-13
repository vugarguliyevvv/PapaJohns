import { useState, useEffect } from "react";

import AddressBox from "./AddressBox";
import BranchGallery from "./BranchGallery";

function Addresses() {
  const [branches, setBranches] = useState([]);
  const [activeBranch, setActiveBranch] = useState({});

  useEffect(() => {
    fetch('http://localhost:22695/api/restaurant')
      .then(response => response.json())
      .then(data => {
        setBranches(data);
        setActiveBranch(data[0]);
      });
  }, []);

  function changeActiveBranchHandler(branch) {
    if (branch !== activeBranch) {
      setActiveBranch(branch);
    }
  }

  const addressItems = branches.map((branch) => {
      return (
        <AddressBox
          key={branch.id}
          branch={branch}
          activeBranch={activeBranch}
          onChangeBranch={changeActiveBranchHandler.bind(null, branch)}
        />
      );
    });

  return (
    <div className="addresses">
      {addressItems}
      <BranchGallery branch={activeBranch} />
    </div>
  );
}

export default Addresses;
