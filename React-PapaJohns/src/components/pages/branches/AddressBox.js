function AddressBox(props) {
  const {branch, activeBranch, onChangeBranch} = props;

  const classes = `address-box ${activeBranch.address === branch.address ?
                                  'address-box__selected' : ''}`;

  return (
    <div className={classes} onClick={onChangeBranch}>
      <h3 className="branch-name">{branch.name}</h3>
      <span className="address">{branch.address}</span>
      <span className="work-hours">
        <i className="far fa-clock"></i>
        {branch.hours}
      </span>
    </div>
  );
}

export default AddressBox;