const JobMatchStrength = ({ testResult }) => {
  const num = (Math.round(testResult) * 100) / 10;

  const funcProgressColor = () => {
    if (Math.round(testResult) < 2) {
      return "#828282";
    }
    if (Math.round(testResult) > 2 && Math.round(testResult) <= 4) {
      return "#EA1111";
    }
    if (Math.round(testResult) > 4 && Math.round(testResult) <= 6) {
      return "#FFAD00";
    }
    if (Math.round(testResult) > 6 && Math.round(testResult) <= 8) {
      return "#9bc158";
    }
    if (Math.round(testResult) > 8 && Math.round(testResult) < 10) {
      return "#00b500";
    }
  };

  const changeColor = () => ({
    width: `${num}%`,
    background: funcProgressColor(),
    height: "7px",
  });

  return (
    <>
      {/* <div
        className="progress bg-gray-200 rounded-md"
        style={{ height: "7px" }}
      >
        <div className="progress-bar rounded-md" style={changeColor()}></div>
      </div> */}
      <p style={{ color: funcProgressColor() }} className="m-0">
        {testResult * 10}%
      </p>
    </>
  );
};

export default JobMatchStrength;
