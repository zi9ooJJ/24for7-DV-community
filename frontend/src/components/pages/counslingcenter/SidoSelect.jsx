function SidoSelect(props) {
  return (
    <div>
      <select>
        {props.sido.map((sido) => (
          <option
            value={sido.value}
            defaultValue={props.defaultValue === sido.value}
            key={sido.name}
          >
            {sido.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SidoSelect;
