function CenterSelect(props) {
  return (
    <div>
      <select>
        {props.centerName.map((centerName) => (
          <option value={centerName} key={centerName}>
            {centerName}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CenterSelect;
